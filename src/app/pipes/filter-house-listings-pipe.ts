import { Pipe, PipeTransform } from '@angular/core';
import { IhouseListing } from '../interfaces/ihouse-listing';

@Pipe({
  name: 'filterHouseListings'
})
export class FilterHouseListingsPipe implements PipeTransform {

  transform(value: IhouseListing[], filter: string): IhouseListing[] {
    if (!value || !filter) {
      return value;
    }
    return value.filter(item =>
      item.city.toLowerCase().includes(filter.toLowerCase())
    );
  }

}
