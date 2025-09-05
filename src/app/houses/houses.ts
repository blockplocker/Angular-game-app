import { Component, inject, signal, Signal } from '@angular/core';
import { HouseListing } from '../components/house-listing/house-listing';
import { IhouseListing } from '../interfaces/ihouse-listing';
import { HouseService } from '../services/house-service';
import { FormsModule } from '@angular/forms';
import { FilterHouseListingsPipe } from '../pipes/filter-house-listings-pipe';

@Component({
  selector: 'app-houses',
  imports: [HouseListing, FormsModule, FilterHouseListingsPipe],
  templateUrl: './houses.html',
  styleUrl: './houses.scss'
})
export class Houses {
  filter = signal('');

  houseListingList: IhouseListing[] = [];
  housingService: HouseService = inject(HouseService);
  constructor() {
    this.houseListingList = this.housingService.getAllHouseListings();
  }
}
