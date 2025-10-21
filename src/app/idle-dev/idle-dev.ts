import { Component, signal } from '@angular/core';
import { ModalWrapper } from '../components/modal-wrapper/modal-wrapper';

@Component({
  selector: 'app-idle-dev',
  imports: [ModalWrapper],
  templateUrl: './idle-dev.html',
  styleUrl: './idle-dev.scss',
})
export class IdleDev {
  // Programming Journey
  //   Start as a beginner coder.
  // Learn languages, build projects, and gain followers.
  // Upgrade IDEs, frameworks, and productivity tools.
  localStorageKey = 'idle-dev-game-state';

  Money = signal<number>(0);
  MoneyMultiplier = signal<number>(1);
  LinesOfCode = signal<number>(0);
  DevLevel = signal<number>(1);

  progress = signal<number>(0);
  progressRunning = signal<boolean>(false);

  ngOnInit() {
    this.loadGameState();
  }
  ngOnDestroy() {
    this.saveGameState();
  }

  saveGameState() {
    const gameState = {
      Money: this.Money(),
      MoneyMultiplier: this.MoneyMultiplier(),
      LinesOfCode: this.LinesOfCode(),
      DevLevel: this.DevLevel(),
      ownedUpgrades: this.ownedUpgrades()
    };

    localStorage.setItem(this.localStorageKey, JSON.stringify(gameState));

    this.IsSaveModalOpen.set(true);
  }
  loadGameState() {
    const savedState = localStorage.getItem(this.localStorageKey);
    if (savedState) {
      const gameState = JSON.parse(savedState);
      this.Money.set(gameState.Money);
      this.MoneyMultiplier.set(gameState.MoneyMultiplier);
      this.LinesOfCode.set(gameState.LinesOfCode);
      this.DevLevel.set(gameState.DevLevel);
      this.ownedUpgrades.set(gameState.ownedUpgrades);
    }
  }

  IsSaveModalOpen = signal<boolean>(false);
  closeModal() {
    this.IsSaveModalOpen.set(false);
  }

  ownedUpgrades = signal<Array<number>>([]);

  get availableUpgrades() {
    return this.upgrades().filter(
      u => !this.ownedUpgrades().includes(u.id)
    );
  }

  upgrades = signal([
    {id: 1, name: 'Better IDE', cost: 10 , effect: () => this.MoneyMultiplier.update((mult) => mult * 2) },
    {id: 2, name: 'Faster Computer', cost: 50, effect: () => this.MoneyMultiplier.update((mult) => mult * 1.2) },
    {id: 3, name: 'Coffee Machine', cost: 100, effect: () => this.MoneyMultiplier.update((mult) => mult * 1.3) },
  ]);

  randomEvents = signal([
    { name: 'You find online that you can download RAM', effect: () => this.MoneyMultiplier.update((mult) => mult + 0.2) },
    { name: 'Code Review', effect: () => this.MoneyMultiplier.update((mult) => mult * 1.1) },
    { name: 'Bug Found', effect: () => this.Money.update((money) => money - 0.1 * money) },
    { name: 'Productivity Boost', effect: () => this.MoneyMultiplier.update((mult) => mult * 1.2) },
  ]);

  Code() {
    console.log("Coding...");
    
    this.Money.update((money) => money + 1 * this.MoneyMultiplier());
    this.LinesOfCode.update((lines) => lines + 1);
  }
  buyUpgrade(upgrade: any) {
    if (this.Money() >= upgrade.cost) {
      this.Money.update((money) => money - upgrade.cost);
      this.ownedUpgrades.update((owned) => [...owned, upgrade.id]);
      upgrade.effect();
    }
  }

  startProgress(durationMs = 3000) {
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

  reset() {
    this.Money.set(0);
    this.LinesOfCode.set(0);
    this.MoneyMultiplier.set(1);
    this.DevLevel.set(1);
    this.ownedUpgrades.set([]);
    // localStorage.removeItem(this.localStorageKey);
  }
}
