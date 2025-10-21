import { Component, signal } from '@angular/core';
import { ModalWrapper } from '../components/modal-wrapper/modal-wrapper';
import { UPGRADES } from '../data/upgrades.data';
import { AUTO_CODERS } from '../data/auto-coders.data';
import { RANDOM_EVENTS } from '../data/random-events.data';

@Component({
  selector: 'app-idle-dev',
  imports: [ModalWrapper],
  templateUrl: './idle-dev.html',
  styleUrl: './idle-dev.scss',
})
export class IdleDev {
 getAutoCoderCost(coder: any) {
    return Math.floor(coder.baseCost * Math.pow(1.15, this.autoCoders()[coder.id] || 0));
  }
  autoCodersList = AUTO_CODERS;
  autoCoders = signal<{ [id: number]: number }>({}); // id -> count

  get autoCodersOwned() {
    return this.autoCodersList.map(c => ({
      ...c,
      count: this.autoCoders()[c.id] || 0,
      cost: Math.floor(c.baseCost * Math.pow(1.15, this.autoCoders()[c.id] || 0)),
      cps: c.baseCps * (this.autoCoders()[c.id] || 0)
    }));
  }

  // Show all owned auto coders and the next one available
  get visibleAutoCoders() {
    const owned = this.autoCoders();
    let bestOwnedId = 0;
    for (let i = this.autoCodersList.length - 1; i >= 0; i--) {
      if (owned[this.autoCodersList[i].id] && owned[this.autoCodersList[i].id] > 0) {
        bestOwnedId = this.autoCodersList[i].id;
        break;
      }
    }
    // All owned auto coders
    const ownedCoders = this.autoCodersList.filter(c => owned[c.id] && owned[c.id] > 0);
    // The next one above the best owned
    const nextId = bestOwnedId + 1;
    const nextCoder = this.autoCodersList.find(c => c.id === nextId);
    // Combine owned and next (if not already owned)
    return nextCoder ? [...ownedCoders, nextCoder] : ownedCoders;
  }

  buyAutoCoder(coder: any) {
    const owned = this.autoCoders()[coder.id] || 0;
    const cost = Math.floor(coder.baseCost * Math.pow(1.15, owned));
    if (this.Money() >= cost) {
      this.Money.update(m => m - cost);
      this.autoCoders.update(ac => ({ ...ac, [coder.id]: owned + 1 }));
    }
  }

  get totalAutoCps() {
    return this.autoCodersOwned.reduce((sum, c) => sum + c.cps, 0);
  }

  autoCoderInterval: any;

  startAutoCoders() {
    if (this.autoCoderInterval) return;
    this.autoCoderInterval = setInterval(() => {
      const cps = this.totalAutoCps * this.MoneyMultiplier();
      if (cps > 0) {
        this.Money.update(m => Number((m + cps / 2).toFixed(1)));
        this.LinesOfCode.update(l => Math.floor(l + cps / 2));
      }
    }, 500);
  }

  stopAutoCoders() {
    if (this.autoCoderInterval) {
      clearInterval(this.autoCoderInterval);
      this.autoCoderInterval = null;
    }
  }

  localStorageKey = 'idle-dev-game-state';

  Money = signal<number>(0);
  MoneyMultiplier = signal<number>(1);
  LinesOfCode = signal<number>(0);
  DevLevel = signal<number>(1);

  progress = signal<number>(0);
  progressRunning = signal<boolean>(false);

  ngOnInit() {
    this.loadGameState();
    this.startAutoCoders();
  }
  ngOnDestroy() {
    this.saveGameState();
    this.stopAutoCoders();
  }

  saveGameState() {
    const gameState = {
      Money: this.Money(),
      MoneyMultiplier: this.MoneyMultiplier(),
      LinesOfCode: this.LinesOfCode(),
      DevLevel: this.DevLevel(),
      ownedUpgrades: this.ownedUpgrades(),
      autoCoders: this.autoCoders()
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
      if (gameState.autoCoders) this.autoCoders.set(gameState.autoCoders);
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
    ).slice(0, 3);
  }

  upgrades = signal(UPGRADES.map(upg => ({
    ...upg,
    effect: () => upg.effect(this)
  })));

  randomEvents = signal(RANDOM_EVENTS.map(ev => ({
    ...ev,
    effect: () => ev.effect(this)
  })));

  Code() {
    console.log("Coding...");
    this.Money.update((money) => Number((money + 1 * this.MoneyMultiplier()).toFixed(1)));
    this.LinesOfCode.update((lines) => Math.floor(lines + 1));
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
    this.autoCoders.set({});
    // localStorage.removeItem(this.localStorageKey);
  }
}
