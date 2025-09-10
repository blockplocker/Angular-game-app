import { Component } from '@angular/core';
import { FinanceForms } from '../components/finance-forms/finance-forms';
import { CurrencyPipe} from '@angular/common';
import { ListTransactions } from '../components/list-transactions/list-transactions';


@Component({
  selector: 'app-finances',
  imports: [FinanceForms, ListTransactions, CurrencyPipe],
  templateUrl: './finances.html',
  styleUrl: './finances.scss',
})
export class Finances {
  categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];
  entries: any[] = [];
  balance: number = 0;
  money: number = 0;

  getCategoryExpense(category: string): number {
    return this.entries
      .filter((e) => e.entryType === 'expense' && e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  constructor() {
    this.loadEntries();
    this.updateBalance();
  }

  onFormSubmit(entry: any) {
    this.entries.push(entry);
    this.saveEntries();
    this.updateBalance();
  }
  updateBalance() {
    this.balance = this.entries.reduce((acc, entry) => {
      return entry.entryType === 'income' ? acc + entry.amount : acc - entry.amount;
    }, 0);
  }

  saveEntries() {
    localStorage.setItem('financeEntries', JSON.stringify(this.entries));
  }

  loadEntries() {
    const saved = localStorage.getItem('financeEntries');
    this.entries = saved ? JSON.parse(saved) : [];
  }

  deleteEntry(index: number) {
    this.entries.splice(index, 1);
    this.saveEntries();
  }
}
