import { Component, Input } from '@angular/core';
import { IhouseListing } from '../../interfaces/ihouse-listing';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-house-listing',
  imports: [RouterLink],
  templateUrl: './house-listing.html',
  styleUrl: './house-listing.scss'
})
export class HouseListing {
  @Input() HouseListing!: IhouseListing;
}
