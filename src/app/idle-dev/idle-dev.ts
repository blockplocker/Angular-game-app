import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalWrapper } from '../components/modal-wrapper/modal-wrapper';
import { UPGRADES } from '../data/upgrades.data';
import { RANDOM_EVENTS } from '../data/random-events.data';

@Component({
  selector: 'app-idle-dev',
  imports: [CommonModule, ModalWrapper],
  templateUrl: './idle-dev.html',
  styleUrl: './idle-dev.scss',
})
export class IdleDev {
  public Money = signal<number>(0);
  public MoneyMultiplier = signal<number>(1);
  public LinesOfCode = signal<number>(0);
  public DevLevel = signal<number>(1);
  public autoCoders = signal<Array<{ level: number; name?: string }>>([]);
  public ownedUpgrades = signal<Array<number>>([]);
  public progress = signal<number>(0);
  public progressRunning = signal<boolean>(false);
  public IsSaveModalOpen = signal<boolean>(false);

  private readonly localStorageKey = 'idle-dev-game-state';

  public upgrades = signal(
    UPGRADES.map((upg) => ({
      ...upg,
      effect: () => upg.effect(this),
    }))
  );

  public randomEvents = signal(
    RANDOM_EVENTS.map((ev) => ({
      ...ev,
      effect: () => ev.effect(this),
    }))
  );

  private autoCoderInterval: any;

  ngOnInit() {
    this.loadGameState();
    this.startAutoCoders();
  }

  ngOnDestroy() {
    this.saveGameState();
    this.stopAutoCoders();
  }

  public getEmployeeName(level: number): string {
    if (level >= 20) return 'Principal Engineer';
    if (level >= 15) return 'Lead Developer';
    if (level >= 10) return 'Senior Developer';
    if (level >= 7) return 'Mid Developer';
    if (level >= 3) return 'Junior Developer';
    return 'Intern';
  }

  public hireEmployee(): void {
    const cost = this.getHireCost();
    if (this.Money() >= cost) {
      this.Money.update((m) => m - cost);
      this.autoCoders.update((list) => [...list, { level: 1, name: this.getEmployeeName(1) }]);
    }
  }

  public levelUpEmployee(index: number): void {
    const coder = this.autoCoders()[index];
    const cost = this.getLevelUpCost(coder.level, index);
    if (this.Money() >= cost) {
      this.Money.update((m) => m - cost);
      this.autoCoders.update((list) => {
        const newList = [...list];
        const newLevel = newList[index].level + 1;
        newList[index] = {
          ...newList[index],
          level: newLevel,
          name: this.getEmployeeName(newLevel),
        };
        return newList;
      });
    }
  }

  public getHireCost(): number {
    return 100 * Math.pow(1.5, this.autoCoders().length);
  }

  public getLevelUpCost(level: number, index: number): number {
    return 50 * Math.pow(2, level - 1) * (1 + index);
  }

  public getCoderCps(level: number, index: number): number {
    return Math.pow(1.4, level - 1) * (1.5 + index);
  }

  public get totalAutoCps(): number {
    const coders = this.autoCoders();
    if (!Array.isArray(coders)) return 0;
    return coders.reduce((sum, c, i) => sum + this.getCoderCps(c.level, i), 0);
  }

  private startAutoCoders(): void {
    if (this.autoCoderInterval) return;
    this.autoCoderInterval = setInterval(() => {
      const cps = this.totalAutoCps * this.MoneyMultiplier();
      if (cps > 0) {
        this.Money.update((m) => Number((m + cps / 2).toFixed(1)));
        this.LinesOfCode.update((l) => Math.floor(l + cps / 2));
      }
    }, 500);
  }

  private stopAutoCoders(): void {
    if (this.autoCoderInterval) {
      clearInterval(this.autoCoderInterval);
      this.autoCoderInterval = null;
    }
  }

  public saveGameState(): void {
    const gameState = {
      Money: this.Money(),
      MoneyMultiplier: this.MoneyMultiplier(),
      LinesOfCode: this.LinesOfCode(),
      DevLevel: this.DevLevel(),
      ownedUpgrades: this.ownedUpgrades(),
      autoCoders: this.autoCoders(),
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(gameState));
    this.IsSaveModalOpen.set(true);
  }

  public loadGameState(): void {
    const savedState = localStorage.getItem(this.localStorageKey);
    if (savedState) {
      const gameState = JSON.parse(savedState);
      this.Money.set(gameState.Money);
      this.MoneyMultiplier.set(gameState.MoneyMultiplier);
      this.LinesOfCode.set(gameState.LinesOfCode);
      this.DevLevel.set(gameState.DevLevel);
      this.ownedUpgrades.set(gameState.ownedUpgrades);
      this.autoCoders.set(Array.isArray(gameState.autoCoders) ? gameState.autoCoders : []);
    }
  }

  public closeModal(): void {
    this.IsSaveModalOpen.set(false);
  }

  public get availableUpgrades() {
    return this.upgrades()
      .filter((u) => !this.ownedUpgrades().includes(u.id))
      .slice(0, 3);
  }

  public buyUpgrade(upgrade: any): void {
    if (this.Money() >= upgrade.cost) {
      this.Money.update((money) => money - upgrade.cost);
      this.ownedUpgrades.update((owned) => [...owned, upgrade.id]);
      upgrade.effect();
    }
  }

  public Code(): void {
    this.Money.update((money) => Number((money + 1 * this.MoneyMultiplier()).toFixed(1)));
    this.LinesOfCode.update((lines) => Math.floor(lines + 1));
  }

  public startProgress(durationMs = 3000): void {
    if (this.progressRunning()) return; // already running
    this.progressRunning.set(true);
    this.progress.set(0);

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      this.progress.set(Number(pct.toFixed(0)));

      if (elapsed < durationMs && this.progressRunning()) {
        requestAnimationFrame(tick);
      } else {
        this.progress.set(0);
        this.progressRunning.set(false);
        this.Code();
      }
    };

    requestAnimationFrame(tick);
  }

  public reset(): void {
    this.Money.set(0);
    this.LinesOfCode.set(0);
    this.MoneyMultiplier.set(1);
    this.DevLevel.set(1);
    this.ownedUpgrades.set([]);
    this.autoCoders.set([]);
    // localStorage.removeItem(this.localStorageKey);
  }
}
