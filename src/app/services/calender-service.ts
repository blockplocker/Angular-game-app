import { Injectable } from '@angular/core';
import { CalenderClient } from '../Domain/calender/calenderClient';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  constructor(private calenderclient: CalenderClient) {}


  getEvents() {
    return this.calenderclient.eventsAll();
  }
  getEvent(id: number) {
  return this.calenderclient.eventsGET(id);
  }
  createEvent(event: any) {
    return this.calenderclient.eventsPOST(event);
  }
  updateEvent(id: number, event: any) {
    return this.calenderclient.eventsPUT(id, event);
  }
  deleteEvent(id: number) {
    return this.calenderclient.eventsDELETE(id);
  }

}
