import { RandomEvent } from '../interfaces/idle-dev/random-event.interface';

export const RANDOM_EVENTS: RandomEvent[] = [
  // 20 Good Events
  {
    name: 'You find online that you can download RAM',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult + 0.2),
  },
  {
    name: 'Code Review',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.1),
  },
  {
    name: 'Productivity Boost',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.2),
  },
  {
    name: 'Open Source Contribution',
    effect: (ctx) => ctx.LinesOfCode.update((lines: number) => lines + 50),
  },
  { name: 'Mentor Help', effect: (ctx) => ctx.Money.update((money: number) => money + 20) },
  {
    name: 'Free Pizza at Hackathon',
    effect: (ctx) => ctx.Money.update((money: number) => money + 10),
  },
  {
    name: 'Stack Overflow Answer Accepted',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.15),
  },
  {
    name: 'Refactor Success',
    effect: (ctx) => ctx.LinesOfCode.update((lines: number) => lines + 30),
  },
  {
    name: 'Automated Test Passed',
    effect: (ctx) => ctx.Money.update((money: number) => money + 15),
  },
  {
    name: 'Found a Useful Library',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.1),
  },
  {
    name: 'Coffee Break',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult + 0.1),
  },
  {
    name: 'Pair Programming',
    effect: (ctx) => ctx.LinesOfCode.update((lines: number) => lines + 20),
  },
  {
    name: 'Code Optimization',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.05),
  },
  { name: 'Feature Goes Viral', effect: (ctx) => ctx.Money.update((money: number) => money + 50) },
  {
    name: 'Early Morning Coding',
    effect: (ctx) => ctx.LinesOfCode.update((lines: number) => lines + 10),
  },
  { name: 'Sponsor Donation', effect: (ctx) => ctx.Money.update((money: number) => money + 100) },
  {
    name: 'IDE Plugin Boost',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.08),
  },
  { name: 'Clean Code Award', effect: (ctx) => ctx.Money.update((money: number) => money + 25) },
  { name: 'Quick Bug Fix', effect: (ctx) => ctx.LinesOfCode.update((lines: number) => lines + 15) },
  {
    name: 'Teamwork Bonus',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.12),
  },

  // 10 Bad Events
  { name: 'Bug Found', effect: (ctx) => ctx.Money.update((money: number) => money - 0.1 * money) },
  {
    name: 'Merge Conflict',
    effect: (ctx) => ctx.LinesOfCode.update((lines: number) => Math.max(0, lines - 20)),
  },
  { name: 'Production Outage', effect: (ctx) => ctx.Money.update((money: number) => money - 30) },
  {
    name: 'Coffee Spill on Keyboard',
    effect: (ctx) => ctx.Money.update((money: number) => money - 10),
  },
  {
    name: 'Stack Overflow Down',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => Math.max(1, mult * 0.9)),
  },
  {
    name: 'Endless Meeting',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => Math.max(1, mult * 0.95)),
  },
  {
    name: 'Power Outage',
    effect: (ctx) => ctx.LinesOfCode.update((lines: number) => Math.max(0, lines - 40)),
  },
  { name: 'Lost USB Drive', effect: (ctx) => ctx.Money.update((money: number) => money - 15) },
  { name: 'Failed Deployment', effect: (ctx) => ctx.Money.update((money: number) => money - 20) },
  {
    name: 'Critical Bug',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => Math.max(1, mult * 0.85)),
  },
];
