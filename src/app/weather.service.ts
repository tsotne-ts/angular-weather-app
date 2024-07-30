import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather } from './models/current-weather.model';
import { Forecast } from './models/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '3d952614b0bb4711b9a225743242906';
  private apiUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      `${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`
    );
  }

  getForecast(
    city: string,
    days: number,
    hour: string = 'yes'
  ): Observable<Forecast> {
    return this.http.get<Forecast>(
      `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=${days}&hour=${hour}`
    );
  }
}
