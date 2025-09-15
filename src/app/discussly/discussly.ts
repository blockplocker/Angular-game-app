import { Component } from '@angular/core';
import { DiscusslyService } from '../services/discussly-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-discussly',
  imports: [AsyncPipe],
  templateUrl: './discussly.html',
  styleUrl: './discussly.scss'
})
export class Discussly {
  categories: any;

  constructor(private discusslyService: DiscusslyService) {
    // this.categories = this.discusslyService.getCategories();
  }
}
