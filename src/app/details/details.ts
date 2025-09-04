import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { IhouseListing } from '../interfaces/ihouse-listing';
import { HouseService } from '../services/house-service';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details {

  route: ActivatedRoute = inject(ActivatedRoute);
  houseService = inject(HouseService);
  houseListing: IhouseListing | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const houseListingId = parseInt(this.route.snapshot.params['id'], 10);
    this.houseListing = this.houseService.getHouseListingById(houseListingId);
  }

  submitApplication() {
    this.houseService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
