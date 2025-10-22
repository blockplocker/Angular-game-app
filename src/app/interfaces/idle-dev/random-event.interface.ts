export interface RandomEvent {
  name: string;
  description: string;
  effect: (ctx: any) => void;
}
