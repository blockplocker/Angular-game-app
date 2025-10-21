export interface RandomEvent {
  name: string;
  effect: (ctx: any) => void;
}
