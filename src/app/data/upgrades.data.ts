import { Upgrade } from '../interfaces/idle-dev/upgrade.interface';

export const UPGRADES: Upgrade[] = [
  {
    id: 1,
    name: 'Better IDE',
    cost: 6 ,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 2),
  },
  {
    id: 2,
    name: 'Better IDE',
    cost: 10,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 2),
  },
  {
    id: 3,
    name: 'AI subscription',
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
  // Money Multiplier Upgrades
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
  
];
