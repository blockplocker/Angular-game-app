import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { Client, API_BASE_URL_Discussly } from './Domain/discussly/client';
import { CalenderClient, API_BASE_URL_Calender } from './Domain/calender/calenderClient';
import { environment } from '../environments/environment';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Discussly } from './discussly/discussly';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // { provide: API_BASE_URL_Discussly, useValue: 'https://localhost:44314' },
    // { provide: API_BASE_URL_Calender, useValue: 'https://localhost:44304' },
    { provide: API_BASE_URL_Discussly, useValue: environment.DiscusslyApiUrl },
    { provide: API_BASE_URL_Calender, useValue: environment.CalendarApiUrl },

    Client,
    CalenderClient,
  ],
};
