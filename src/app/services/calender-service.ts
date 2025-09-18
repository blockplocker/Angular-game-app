import { Injectable } from '@angular/core';
import { CalenderClient } from '../Domain/calender/calenderClient';

@Injectable({
  providedIn: 'root',
})
export class CalenderService {
  private localStorageKey = 'calenderEvents';

  constructor(private calenderclient: CalenderClient) {}

  getEventsFromLocalStorage() {
    const events = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return events;
  }

  saveEventsToLocalStorage(events: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(events));
  }

  createEventLocal(event: any) {
    const events = this.getEventsFromLocalStorage();
    events.push(event);
    this.saveEventsToLocalStorage(events);
    return event;
  }

  updateEventLocal(id: string, updatedEvent: any) {
    let events = this.getEventsFromLocalStorage();
    events = events.map((e: any) => (String(e.id) === String(id) ? { ...e, ...updatedEvent } : e));
    this.saveEventsToLocalStorage(events);
    return updatedEvent;
  }

  deleteEventLocal(id: string) {
    let events = this.getEventsFromLocalStorage();
    events = events.filter((e: any) => String(e.id) !== String(id));
    this.saveEventsToLocalStorage(events);
    return id;
  }

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
