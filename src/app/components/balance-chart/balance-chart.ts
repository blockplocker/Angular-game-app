import { Component, input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ITransaction } from '../../interfaces/itransaction';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

@Component({
  selector: 'app-balance-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './balance-chart.html',
  styleUrl: './balance-chart.scss',
})
export class BalanceChart implements OnInit, OnChanges {
  transactions = input.required<ITransaction[]>();

  dailyBalance: { date: string; balance: number }[] = [];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Balance',
        borderColor: '#42A5F5',
        fill: false,
      },
    ],
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
  };

  ngOnInit() {
    this.computeBalance();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions']) {
      this.computeBalance();
    }
  }

  computeBalance() {
    let balance = 0;
    const txs = this.transactions?.();
    if (!txs || txs.length === 0) {
      this.dailyBalance = [];
      this.lineChartData.labels = [];
      this.lineChartData.datasets[0].data = [];
      return;
    }
    const sorted = txs.sort((a: ITransaction, b: ITransaction) => a.date.localeCompare(b.date));
    this.dailyBalance = sorted.map((tx: ITransaction) => {
      balance += tx.entryType === 'income' ? tx.amount : -tx.amount;
      return { date: tx.date, balance };
    });

    this.lineChartData.labels = this.dailyBalance.map((d) => d.date);
    this.lineChartData.datasets[0].data = this.dailyBalance.map((d) => d.balance);
  }
}
