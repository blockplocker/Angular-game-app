import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalWrapper } from '../components/modal-wrapper/modal-wrapper';
import { UPGRADES } from '../data/upgrades.data';
import { RANDOM_EVENTS } from '../data/random-events.data';
import { Agent } from '../interfaces/idle-dev/agent.interface';

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
  public agents = signal<Array<Agent>>([]);
  public IsSaveModalOpen = signal<boolean>(false);
  public lastRandomEvent = signal<string | null>(null);
  public lastRandomEventDescription = signal<string | null>(null);
  public isRandomEventModalOpen = signal<boolean>(false);

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

  private randomEventTimeout: any;

  ngOnInit() {
    this.loadGameState();
    // this.scheduleRandomEvent();   // Disabled for development purposes
    this.agents.update((bars) => [
      ...bars,
      {
        id : 1,
        name: 'Build Feature A',
        description: '',
        level: 1,
        moneyGeneration: 5,
        runningTime: 2500,
        running: false,
        isAutoRunning: false,
        progress: 0,
      },
      {
        id: 2,
        name: 'Build Feature B',
        description: '',
        level: 1,
        moneyGeneration: 10,
        runningTime: 5000,
        running: false,
        isAutoRunning: false,
        progress: 0,
      },
      {
        id: 3,
        name: 'Build Feature C',
        description: '',
        level: 1,
        moneyGeneration: 20,
        runningTime: 10000,
        running: false,
        isAutoRunning: false,
        progress: 0,
      },
    ]);
  }

  ngOnDestroy() {
    this.saveGameState();
    if (this.randomEventTimeout) {
      clearTimeout(this.randomEventTimeout);
    }
  }

  // Schedules the next random event at a random interval (30-60 seconds)
  private scheduleRandomEvent(): void {
    const min = 30000; // 30 seconds
    const max = 60000; // 60 seconds
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    this.randomEventTimeout = setTimeout(() => {
      this.triggerRandomEvent();
      this.scheduleRandomEvent();
    }, delay);
  }

  public triggerRandomEvent(): void {
    const events = this.randomEvents();
    if (!events.length) return;
    const idx = Math.floor(Math.random() * events.length);
    const event = events[idx];
    event.effect();
    this.lastRandomEvent.set(event.name);
    this.lastRandomEventDescription.set(event.description);
    this.isRandomEventModalOpen.set(true);
  }

  public closeRandomEventModal(): void {
    this.isRandomEventModalOpen.set(false);
    this.lastRandomEvent.set(null);
    this.lastRandomEventDescription.set(null);
  }

  public getAgentName(level: number): string {
    if (level >= 20) return 'Principal Engineer';
    if (level >= 15) return 'Lead Developer';
    if (level >= 10) return 'Senior Developer';
    if (level >= 7) return 'Mid Developer';
    if (level >= 3) return 'Junior Developer';
    return 'Intern';
  }

  public levelUpAgent(index: number): void {
    const agent = this.agents()[index];
    const cost = this.getLevelUpCost(agent.level, index);
    if (this.Money() >= cost) {
      this.Money.update((m) => m - cost);
      this.agents.update((list) => {
        const newList = [...list];
        const newLevel = newList[index].level + 1;
        newList[index] = {
          ...newList[index],
          level: newLevel,
          // name: this.getAgentName(newLevel),  
        };
        return newList;
      });
    }
  }

  public getHireCost(): number {
    return 100 * Math.pow(1.8, this.autoCoders().length);
  }

  public getLevelUpCost(level: number, index: number): number {
    return 75 * Math.pow(1.5, level - 1) * (1 + index * 1.1);
  }

  public getAgentMoneyGain(agent: Agent): number {
    return Math.floor(Math.pow(1.2, agent.level - 1) * agent.moneyGeneration * this.MoneyMultiplier());
  }

  // public get totalAutoCps(): number {
  //   const coders = this.autoCoders();
  //   if (!Array.isArray(coders)) return 0;
  //   return coders.reduce((sum, c, i) => sum + this.getCoderCps(c.level, i), 0);
  // }

  // private autoCoderInterval: any;

  // private startAutoCoders(): void {
  //   if (this.autoCoderInterval) return;
  //   this.autoCoderInterval = setInterval(() => {
  //     const cps = this.totalAutoCps * this.MoneyMultiplier();
  //     if (cps > 0) {
  //       this.Money.update((m) => Number((m + cps / 2).toFixed(1)));
  //       this.LinesOfCode.update((l) => Math.floor(l + cps / 2));
  //     }
  //   }, 500);
  // }

  // private stopAutoCoders(): void {
  //   if (this.autoCoderInterval) {
  //     clearInterval(this.autoCoderInterval);
  //     this.autoCoderInterval = null;
  //   }
  // }

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

  public startProgress(id: number, durationMs = 3000): void {
    this.agents.update((bars) =>
      bars.map((bar) => (bar.id === id ? { ...bar, running: true, progress: 0 } : bar))
    );
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const runningTime = this.getBarById(id)?.runningTime || durationMs;
      const pct = Math.min(100, (elapsed / runningTime) * 100);
      this.agents.update((bars) =>
        bars.map((bar) =>
          bar.id === id
            ? { ...bar, progress: Number(pct.toFixed(0)), running: elapsed < runningTime }
            : bar
        )
      );
      if (elapsed < runningTime) {
        requestAnimationFrame(tick);
      } else {
        const bar = this.getBarById(id);
        if (bar){
          this.Money.update((money) => money + this.getAgentMoneyGain(bar));
        }
        this.agents.update((bars) =>
          bars.map((bar) =>
            bar.id === id ? { ...bar, progress: 0, running: false } : bar
          )
        );
      }
    };
    requestAnimationFrame(tick);
  }

  public Code(): void {
    this.Money.update((money) => Number((money + 1 * this.MoneyMultiplier()).toFixed(1)));
    this.LinesOfCode.update((lines) => Math.floor(lines + 1));
  }

  public getBarById(id: number) {
    return this.agents().find((bar) => bar.id === id);
  }

  // public canStartBar(id: number) {
  //   const bar = this.getBarById(id);
  //   return !!bar && !bar.running;
  // }

  public reset(): void {
    this.Money.set(0);
    this.LinesOfCode.set(0);
    this.MoneyMultiplier.set(1);
    this.DevLevel.set(1);
    this.ownedUpgrades.set([]);
    this.autoCoders.set([]);
    // localStorage.removeItem(this.localStorageKey); // Optionally clear saved state
  }
}
