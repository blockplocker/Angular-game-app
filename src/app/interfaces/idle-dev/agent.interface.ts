export interface Agent {
  id: number; 
  name: string;
  description: string;
  level: number; 
  moneyGeneration: number; 
  runningTime: number;
  running: boolean; 
  isAutoRunning: boolean; 
  progress: number;
}
