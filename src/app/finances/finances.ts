import { Component } from '@angular/core';
import { FinanceForms } from '../components/finance-forms/finance-forms';
import { ITransaction } from '../interfaces/itransaction';
import { CurrencyPipe } from '@angular/common';
import { ListTransactions } from '../components/list-transactions/list-transactions';
import { BalanceChart } from '../components/balance-chart/balance-chart';

@Component({
  selector: 'app-finances',
  imports: [FinanceForms, ListTransactions, CurrencyPipe, BalanceChart],
  templateUrl: './finances.html',
  styleUrl: './finances.scss',
})
export class Finances {
  get categories(): string[] {
    // Get unique categories from entries
    const cats = this.entries.map((e) => e.category);
    return Array.from(new Set(cats));
  }
  entries: ITransaction[] = [];
  balance: number = 0;
  money: number = 0;

  getCategoryExpense(category: string): number {
    return this.entries
      .filter((e: ITransaction) => e.category === category)
      .reduce((sum, e: ITransaction) => {
        return e.entryType === 'income' ? sum + e.amount : sum - e.amount;
      }, 0);
  }

  constructor() {
    this.loadEntries();
    this.updateBalance();
  }

  onFormSubmit(entry: ITransaction) {
    this.entries.push(entry);
    this.saveEntries();
    this.updateBalance();
  }
  updateBalance() {
    this.balance = this.entries.reduce((acc, entry: ITransaction) => {
      return entry.entryType === 'income' ? acc + entry.amount : acc - entry.amount;
    }, 0);
  }
  
  saveEntries() {
    localStorage.setItem('financeEntries', JSON.stringify(this.entries));
  }
  
  loadEntries() {
    const saved = localStorage.getItem('financeEntries');
    this.entries = saved ? (JSON.parse(saved) as ITransaction[]) : [];
    // this.entries = this.Fakedata;
  }

  deleteEntry(index: number) {
    this.entries.splice(index, 1);
    this.saveEntries();
  }


  // For testing purposes, populate with fake data
  Fakedata: ITransaction[] = [
    // September 2025
  { title: 'Monthly Salary', amount: 3000, date: '2025-09-01', entryType: 'income', category: 'Salary' },
  { title: 'Freelance Project', amount: 800, date: '2025-09-05', entryType: 'income', category: 'Freelance' },
  { title: 'Groceries', amount: 150, date: '2025-09-03', entryType: 'expense', category: 'Food' },
  { title: 'Restaurant', amount: 60, date: '2025-09-07', entryType: 'expense', category: 'Food' },
  { title: 'Rent', amount: 1200, date: '2025-09-01', entryType: 'expense', category: 'Housing' },
  { title: 'Gym Membership', amount: 50, date: '2025-09-02', entryType: 'expense', category: 'Health' },
  
  // August 2025
  { title: 'Monthly Salary', amount: 3000, date: '2025-08-01', entryType: 'income', category: 'Salary' },
  { title: 'Stock Dividend', amount: 200, date: '2025-08-15', entryType: 'income', category: 'Investments' },
  { title: 'Groceries', amount: 180, date: '2025-08-04', entryType: 'expense', category: 'Food' },
  { title: 'Electricity Bill', amount: 90, date: '2025-08-10', entryType: 'expense', category: 'Utilities' },
  { title: 'Rent', amount: 1200, date: '2025-08-01', entryType: 'expense', category: 'Housing' },
  { title: 'Movie Night', amount: 40, date: '2025-08-18', entryType: 'expense', category: 'Entertainment' },
  
  // July 2025
  { title: 'Monthly Salary', amount: 3000, date: '2025-07-01', entryType: 'income', category: 'Salary' },
  { title: 'Freelance Design', amount: 600, date: '2025-07-20', entryType: 'income', category: 'Freelance' },
  { title: 'Groceries', amount: 170, date: '2025-07-05', entryType: 'expense', category: 'Food' },
  { title: 'Internet Bill', amount: 60, date: '2025-07-08', entryType: 'expense', category: 'Utilities' },
  { title: 'Rent', amount: 1200, date: '2025-07-01', entryType: 'expense', category: 'Housing' },
  { title: 'Concert Ticket', amount: 120, date: '2025-07-22', entryType: 'expense', category: 'Entertainment' }
];

}
