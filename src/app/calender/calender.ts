import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg,EventDropArg, EventInput, CalendarApi,} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalenderService } from '../services/calender-service';
import { DatePipe } from '@angular/common';
import { Ievent } from '../interfaces/ievent';
import { ModalWrapper } from '../components/modal-wrapper/modal-wrapper';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calender',
  imports: [FullCalendarModule, ModalWrapper, FormsModule],
  providers: [DatePipe],
  templateUrl: './calender.html',
  styleUrls: ['./calender.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calender {
  private datePipe = inject(DatePipe);
  private calenderService = inject(CalenderService);
  useLocalStorage = false;
  private eventsSubscription: any = null;

  private loadEvents(): void {
    if (!this.useLocalStorage) {
      this.getEventsWithAPI();
    } else {
      this.getEventsWithLocalStorage();
    }
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    firstDay: 1,
    weekNumbers: true,
    weekNumberCalculation: 'ISO',
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventUpdate.bind(this),
    eventResize: this.handleEventUpdate.bind(this),
    events: [], // will be populated from API
  };

  // Modal & local state
  createModalOpen = signal(false);
  updateModalOpen = signal(false);
  localStorageErrorModalOpen = signal(false);
  errorModalOpen = signal(false);

  inputTitle = signal('');
  title = signal('');
  eventDate = signal('');
  eventId = signal('');
  selectInfo = signal<DateSelectArg | null>(null);
  clickInfo = signal<EventClickArg | null>(null);

  // Handlers for calendar interactions
  handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi: CalendarApi | undefined = selectInfo.view.calendar;
    if (calendarApi) {
      calendarApi.unselect();
    }
    this.title.set('Create Event');
    this.createModalOpen.set(true);
    this.selectInfo.set(selectInfo);
  }
  handleEventClick(clickInfo: EventClickArg): void {
    if (!clickInfo || !clickInfo.event) {
      this.showErrorModal('Invalid event click info.');
      return;
    }
    this.title.set(`Update Event: ${clickInfo.event.title}`);
    this.eventDate.set(
      `${this.datePipe.transform(clickInfo.event.start, 'M/d/yy, HH:mm')} -  ${this.datePipe.transform(
        clickInfo.event.end,
        'M/d/yy, HH:mm'
      )}`
    );
    this.eventId.set(String(clickInfo.event.id));
    this.updateModalOpen.set(true);
    this.clickInfo.set(clickInfo);
  }
  handleEventUpdate(info: EventDropArg | any): void {
    if (!info || !(info as any).event) {
      this.showErrorModal('Invalid event update info.');
      return;
    }

    const toLocalISOString = (date: Date | null): string => {
      if (!date) return '';
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return local.toISOString().slice(0, 19); // 'YYYY-MM-DDTHH:mm:ss'
    };

    const evt = (info as any).event;
    const updatedEvent = {
      id: evt.id,
      title: evt.title,
      start: toLocalISOString(evt.start),
      end: toLocalISOString(evt.end),
      allDay: evt.allDay,
    };

    if (!this.useLocalStorage) {
      this.updateEventWithApi(info as any, updatedEvent);
    } else {
      this.updateEventWithLocalstorage(updatedEvent);
    }
  }

  // Modal action handlers
  onCreate(value: string): void {
  const select = this.selectInfo();
    if (select) {
      const calendarApi = select.view.calendar;
      const title = value.trim();
      if (!title || title.length > 20) {
        this.showErrorModal('Event title is required and must be 20 characters or less.');
        return;
      }

      const Event: Ievent = {
        id: 0, // Placeholder, actual ID will be set by backend or local storage function
        title,
        start: select.startStr,
        end: select.endStr,
        allDay: select.allDay,
      };

      if (!this.useLocalStorage) {
        this.createEventWithApi(Event, calendarApi);
      } else {
        this.createEventWithLocalstorage(Event, calendarApi);
      }
    }
    this.closeModal();
  }

  onDelete(): void {
    const click = this.clickInfo();
    if (click && click.event) {
      if (!this.useLocalStorage) {
        this.deleteEventWithApi(this.eventId());
      } else {
        this.deleteEventWithLocalstorage(this.eventId());
      }
    }
    this.closeModal();
  }

  onUpdate(value: string): void {
    const click = this.clickInfo();
    if (click && click.event) {
      if (!value || value.trim() === '' || value.length > 20) {
        this.showErrorModal('Event title is required and must be 20 characters or less.');
        return;
      }
      click.event.setProp('title', value.trim());
      this.handleEventUpdate(click as any);
      this.closeModal();
    }
  }

  // crud operations
  getEventsWithAPI() {
    this.eventsSubscription = this.calenderService.getEvents().subscribe({
      next: (events: any[]) => {
        this.calendarOptions.events = events.map((e) => ({
          id: String(e.id),
          title: e.title,
          start: e.start,
          end: e.end,
          allDay: e.allDay ?? (e as any).allday,
        })) as EventInput[];
      },
      error: () => {
        if (!this.useLocalStorage) {
          this.showLocalStorageErrorModal();
          return;
        }
        this.showErrorModal('Failed to fetch events. Please try again later.');
      },
    });
  }

  getEventsWithLocalStorage() {
    const events = this.calenderService.getEventsFromLocalStorage();
    this.calendarOptions.events = events.map((e: any) => ({
      id: String(e.id),
      title: e.title,
      start: e.start,
      end: e.end,
      allDay: e.allDay ?? e.allday,
    })) as EventInput[];
  }

  createEventWithApi(event: Ievent, calendarApi?: CalendarApi): void {
    this.calenderService
      .createEvent({
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
      })
      .subscribe({
        next: (Response: any) => {
          if (calendarApi) {
            calendarApi.addEvent({
              id: String(Response?.id),
              title: event.title,
              start: event.start,
              end: event.end,
              allDay: event.allDay,
            });
          }
        },
        error: () => {
          this.showErrorModal('Failed to create event. Please try again.');
        },
      });
  }

  createEventWithLocalstorage(event: any, calendarApi?: CalendarApi): void {
    event.id = crypto.randomUUID();
    const createdEvent = this.calenderService.createEventLocal(event);
    if (calendarApi) {
      calendarApi.addEvent({
        id: createdEvent.id,
        title: createdEvent.title,
        start: createdEvent.start,
        end: createdEvent.end,
        allDay: createdEvent.allDay,
      });
    }
  }

  updateEventWithApi(info: any, updatedEvent: any): void {
    this.calenderService.updateEvent(Number(updatedEvent.id), updatedEvent).subscribe({
      error: () => {
        this.showErrorModal('Failed to update event. Please try again.');
        if (info && typeof (info as any).revert === 'function') (info as any).revert();
      },
    });
  }

  updateEventWithLocalstorage(updatedEvent: any): void {
    this.calenderService.updateEventLocal(updatedEvent.id, updatedEvent);
  }

  deleteEventWithApi(eventId: string): void {
    this.calenderService.deleteEvent(Number(eventId)).subscribe({
      next: () => {
        const click = this.clickInfo();
        if (click && click.event) {
          click.event.remove();
        }
        this.clickInfo.set(null);
      },
      error: () => {
        this.showErrorModal('Failed to delete event. Please try again.');
      },
    });
  }

  deleteEventWithLocalstorage(eventId: string): void {
    this.calenderService.deleteEventLocal(eventId);
    const click = this.clickInfo();
    if (click && click.event) {
      click.event.remove();
    }
    this.clickInfo.set(null);
  }

  // Modal control methods
  showErrorModal(message: string): void {
    this.title.set(message);
    this.errorModalOpen.set(true);
  }

  showLocalStorageErrorModal(): void {
    this.title.set('API Error - try using Local Storage');
    this.localStorageErrorModalOpen.set(true);
  }

  closeModal(): void {
    this.selectInfo.set(null);
    this.eventId.set('');
    this.eventDate.set('');
    this.inputTitle.set('');
    this.createModalOpen.set(false);
    this.updateModalOpen.set(false);
    this.errorModalOpen.set(false);
    this.localStorageErrorModalOpen.set(false);
  }

  storage = 'Backend Server';
  toggleLocalStorage() {
    this.useLocalStorage = !this.useLocalStorage;
    this.storage = this.useLocalStorage ? 'Local Storage' : 'Backend Server';
    this.calendarOptions.events = [];
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    this.loadEvents();
    this.closeModal();
  }
}