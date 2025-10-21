import { Upgrade } from '../interfaces/idle-dev/upgrade.interface';

export const UPGRADES: Upgrade[] = [
  {
    id: 1,
    name: 'Better IDE',
    cost: 10,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 2),
  },
  {
    id: 2,
    name: 'Faster Computer',
    cost: 50,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.2),
  },
  {
    id: 3,
    name: 'Coffee Machine',
    cost: 100,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.3),
  },
  // Money Multiplier Upgrades
  {
    id: 4,
    name: 'Standing Desk',
    cost: 250,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.15),
  },
  {
    id: 5,
    name: 'Dual Monitors',
    cost: 500,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.18),
  },
  {
    id: 6,
    name: 'Ergonomic Chair',
    cost: 1200,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.22),
  },
  {
    id: 7,
    name: 'Cloud IDE',
    cost: 3000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.25),
  },
  {
    id: 8,
    name: 'Productivity App',
    cost: 8000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.3),
  },
  {
    id: 9,
    name: 'AI Code Review',
    cost: 20000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.4),
  },
  {
    id: 10,
    name: 'Quantum Keyboard',
    cost: 100000,
    effect: (ctx) => ctx.MoneyMultiplier.update((mult: number) => mult * 1.5),
  },
  // Auto Coder Upgrades
  {
    id: 11,
    name: 'Intern Training',
    cost: 150,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 1: (acs[1] || 0) + 1 })),
  },
  {
    id: 12,
    name: 'Junior Dev Bootcamp',
    cost: 600,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 2: (acs[2] || 0) + 1 })),
  },
  {
    id: 13,
    name: 'Senior Dev Conference',
    cost: 2500,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 3: (acs[3] || 0) + 1 })),
  },
  {
    id: 14,
    name: 'AI Assistant Upgrade',
    cost: 9000,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 4: (acs[4] || 0) + 1 })),
  },
  {
    id: 15,
    name: 'Freelancer Network',
    cost: 25000,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 5: (acs[5] || 0) + 1 })),
  },
  {
    id: 16,
    name: 'Remote Team Expansion',
    cost: 80000,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 6: (acs[6] || 0) + 1 })),
  },
  {
    id: 17,
    name: 'Open Source Grant',
    cost: 200000,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 7: (acs[7] || 0) + 1 })),
  },
  {
    id: 18,
    name: 'Accelerator Funding',
    cost: 600000,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 8: (acs[8] || 0) + 1 })),
  },
  {
    id: 19,
    name: 'DevOps Automation',
    cost: 2500000,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 9: (acs[9] || 0) + 1 })),
  },
  {
    id: 20,
    name: 'Quantum AI Upgrade',
    cost: 20000000,
    effect: (ctx) => ctx.autoCoders.update((acs: any) => ({ ...acs, 10: (acs[10] || 0) + 1 })),
  },
];
