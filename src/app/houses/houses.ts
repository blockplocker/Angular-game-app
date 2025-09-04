import { Component, inject } from '@angular/core';
import { HouseListing } from '../components/house-listing/house-listing';
import { IhouseListing } from '../interfaces/ihouse-listing';
import { HouseService } from '../services/house-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-houses',
  imports: [HouseListing, RouterLink],
  templateUrl: './houses.html',
  styleUrl: './houses.scss'
})
export class Houses {

  housingLocationList: IhouseListing[] = [];
  housingService: HouseService = inject(HouseService);
  filteredLocationList: IhouseListing[] = [];
  constructor() {
    this.housingLocationList = this.housingService.getAllHouseListings();
    this.filteredLocationList = this.housingLocationList;
  }
  filterResults(text: string) {
    this.filteredLocationList = this.housingLocationList.filter(location =>
      location.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
