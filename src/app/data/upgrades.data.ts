import { Upgrade } from '../interfaces/idle-dev/upgrade.interface';

export const UPGRADES: Upgrade[] = [
  // Early game upgrades
  {
    id: 1,
    name: 'Better IDE',
    cost: 6,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 2),
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    cost: 12,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.5),
  },
  {
    id: 3,
    name: 'AI Subscription',
    cost: 30,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 2),
  },
  {
    id: 4,
    name: 'Faster Computer',
    cost: 50,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.2),
  },
  {
    id: 5,
    name: 'Coffee Machine',
    cost: 100,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.3),
  },
  {
    id: 6,
    name: 'Standing Desk',
    cost: 250,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.15),
  },
  {
    id: 7,
    name: 'Dual Monitors',
    cost: 500,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.18),
  },
  {
    id: 8,
    name: 'Ergonomic Chair',
    cost: 1200,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.22),
  },
  {
    id: 9,
    name: 'Cloud IDE',
    cost: 3000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.25),
  },
  {
    id: 10,
    name: 'Productivity App',
    cost: 8000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.3),
  },
  {
    id: 11,
    name: 'AI Code Review',
    cost: 20000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.4),
  },
  {
    id: 12,
    name: 'Quantum Keyboard',
    cost: 100000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.5),
  },

  // New upgrades for more progression
  {
    id: 13,
    name: 'Cloud Storage',
    cost: 250000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.3),
  },
  {
    id: 14,
    name: 'Remote Work Setup',
    cost: 500000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.35),
  },
  {
    id: 15,
    name: 'DevOps Automation',
    cost: 1200000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.4),
  },
  {
    id: 16,
    name: 'VR Workspace',
    cost: 3000000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.5),
  },
  {
    id: 17,
    name: 'Personal Assistant Bot',
    cost: 8000000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.6),
  },
  {
    id: 18,
    name: 'Automated Testing Suite',
    cost: 20000000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.7),
  },
  {
    id: 19,
    name: 'Quantum Cloud Compute',
    cost: 100000000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 2),
  },
  {
    id: 20,
    name: 'AI Project Manager',
    cost: 500000000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 2.5),
  },
];
