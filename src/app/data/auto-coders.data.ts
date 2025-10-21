import { AutoCoder } from '../interfaces/idle-dev/auto-coder.interface';

export const AUTO_CODERS: AutoCoder[] = [
  { id: 1, name: 'Intern', baseCost: 25, baseCps: 0.2 },
  { id: 2, name: 'Junior Dev', baseCost: 100, baseCps: 1 },
  { id: 3, name: 'Senior Dev', baseCost: 500, baseCps: 5 },
  { id: 4, name: 'AI Assistant', baseCost: 2000, baseCps: 20 },
  { id: 5, name: 'Freelancer', baseCost: 5000, baseCps: 50 },
  { id: 6, name: 'Remote Team', baseCost: 20000, baseCps: 200 },
  { id: 7, name: 'Open Source Contributors', baseCost: 75000, baseCps: 800 },
  { id: 8, name: 'Startup Accelerator', baseCost: 250000, baseCps: 3000 },
  { id: 9, name: 'Cloud DevOps', baseCost: 1000000, baseCps: 12000 },
  { id: 10, name: 'Quantum AI Coder', baseCost: 10000000, baseCps: 100000 },
];
