export interface Upgrade {
  id: number;
  name: string;
  cost: number;
  effect: (ctx: any) => void;
}
