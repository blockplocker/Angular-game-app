import { RandomEvent } from '../interfaces/idle-dev/random-event.interface';

export const RANDOM_EVENTS: RandomEvent[] = [
  // 20 Good Events
  {
    name: 'You find online that you can download RAM',
    description:
      'You discover a way to download RAM! Your productivity increases. (Money Multiplier x1.2)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.2),
  },
  {
    name: 'Code Review',
    description: 'A code review helps you spot improvements. (Money Multiplier x1.1)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.1),
  },
  {
    name: 'Productivity Boost',
    description: 'You feel super productive! (Money Multiplier x1.2)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.2),
  },
  {
    name: 'Mentor Help',
    description: 'A mentor gives you valuable advice. (Money Multiplier x1.2)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.2),
  },
  {
    name: 'Free Pizza at Hackathon',
    description: 'You get free pizza at a hackathon. (Money +10%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 1.1),
  },
  {
    name: 'Stack Overflow Answer Accepted',
    description: 'Your answer is accepted on Stack Overflow! (Money Multiplier x1.15)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.15),
  },
  {
    name: 'Automated Test Passed',
    description: 'Your automated tests pass! (Money +20%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 1.2),
  },
  {
    name: 'Mentor Help',
    description: 'A mentor gives you valuable advice. (Money +10%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 0.1),
  },
  {
    name: 'Found a Useful Library',
    description: 'You find a useful library that speeds up your work. (Money Multiplier x1.1)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.1),
  },
  {
    name: 'Free Pizza at Hackathon',
    description: 'You get free pizza at a hackathon. (Money +5%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 0.05),
  },
  {
    name: 'Coffee Break',
    description: 'A coffee break gives you a small boost. (Money Multiplier +0.1)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult + 0.1),
  },
  {
    name: 'Automated Test Passed',
    description: 'Your automated tests pass! (Money +7%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 0.07),
  },
  {
    name: 'Feature Goes Viral',
    description: 'Your feature goes viral! (Money +20%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 0.2),
  },
  {
    name: 'Code Optimization',
    description: 'You optimize your code. (Money Multiplier x1.05)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.05),
  },
  {
    name: 'Sponsor Donation',
    description: 'A sponsor donates to your project. (Money +30%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 0.3),
  },
  {
    name: 'Feature Goes Viral',
    description: 'Your feature goes viral! (Money +50%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 1.5),
  },
  {
    name: 'Clean Code Award',
    description: 'You win a clean code award. (Money +8%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 0.08),
  },
  {
    name: 'Sponsor Donation',
    description: 'A sponsor donates to your project. (Money +20%)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 1.20),
  },
  {
    name: 'Production Outage',
    description: 'Production goes down! (Money -15%)',
    effect: (ctx) => ctx.Money.update((money: number) => money - money * 0.15),
  },
  {
    name: 'IDE Plugin Boost',
    description: 'An IDE plugin gives you a boost. (Money Multiplier x1.08)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.08),
  },
  {
    name: 'Coffee Spill on Keyboard',
    description: 'You spill coffee on your keyboard. (Money -5%)',
    effect: (ctx) => ctx.Money.update((money: number) => money - money * 0.05),
  },
  {
    name: 'Clean Code Award',
    description: 'You win a clean code award. (Money +25)',
    effect: (ctx) => ctx.Money.update((money: number) => money + money * 1.25),
  },
  {
    name: 'Lost USB Drive',
    description: 'You lose your USB drive. (Money -7%)',
    effect: (ctx) => ctx.Money.update((money: number) => money - money * 0.07),
  },

  {
    name: 'Failed Deployment',
    description: 'A deployment fails. (Money -10%)',
    effect: (ctx) => ctx.Money.update((money: number) => money - money * 0.1),
  },
  {
    name: 'Teamwork Bonus',
    description: 'Teamwork pays off! (Money Multiplier x1.12)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.12),
  },

  // 10 Bad Events
  {
    name: 'Bug Found',
    description: 'A bug is found in your code. (Money -10%)',
    effect: (ctx) => ctx.Money.update((money: number) => money - 0.1 * money),
  },
  {
    name: 'Production Outage',
    description: 'Production goes down! (Money -30)',
    effect: (ctx) => ctx.Money.update((money: number) => money - 30),
  },
  {
    name: 'Coffee Spill on Keyboard',
    description: 'You spill coffee on your keyboard. (Money -10)',
    effect: (ctx) => ctx.Money.update((money: number) => money - 10),
  },
  {
    name: 'Stack Overflow Down',
    description: 'Stack Overflow is down! (Money Multiplier x0.9, min 1)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => Math.max(1, mult * 0.9)),
  },
  {
    name: 'Endless Meeting',
    description: 'You get stuck in an endless meeting. (Money Multiplier x0.95, min 1)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => Math.max(1, mult * 0.95)),
  },
  {
    name: 'Lost USB Drive',
    description: 'You lose your USB drive. (Money -15)',
    effect: (ctx) => ctx.Money.update((money: number) => money - 15),
  },
  {
    name: 'Failed Deployment',
    description: 'A deployment fails. (Money -20)',
    effect: (ctx) => ctx.Money.update((money: number) => money - 20),
  },
  {
    name: 'Critical Bug',
    description: 'A critical bug is discovered! (Money Multiplier x0.85, min 1)',
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => Math.max(1, mult * 0.85)),
  },
];
