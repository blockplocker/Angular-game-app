import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-list-transactions',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './list-transactions.html',
  styleUrl: './list-transactions.scss'
})
export class ListTransactions {
  transactions = input.required<any[]>();

  deleteTransactionChange = output<number>();

  DeleteTransaction(index: number) {
    this.deleteTransactionChange.emit(index);
  }

}
