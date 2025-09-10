export interface ITransaction {
  // id: string;
  title: string;
  amount: number;
  date: string;
  entryType: 'income' | 'expense';
  category: string;
}
