import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '3d952614b0bb4711b9a225743242906';
  private apiUrl = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`
    );
  }

  getForecast(
    city: string,
    days: number,
    hour: string = 'yes'
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=${days}&hour=${hour}`
    );
  }
}
