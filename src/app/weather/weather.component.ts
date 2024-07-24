import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  @ViewChild('hourlyContainer') hourlyContainer!: ElementRef;
  cityName: string = 'Tbilisi';
  currentWeather: any;
  forecast: any;
  errorMessage: string = '';
  sunriseTime: string = '';
  sunsetTime: string = '';
  isCelsius: boolean = true;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.searchWeather();
    this.loadTemperaturePreference();
  }

  setTemperatureUnit(celsius: boolean) {
    this.isCelsius = celsius;
    localStorage.setItem(
      'temperaturePreference',
      this.isCelsius ? 'celsius' : 'fahrenheit'
    );
  }

  loadTemperaturePreference() {
    const preference = localStorage.getItem('temperaturePreference');
    if (preference) {
      this.isCelsius = preference === 'celsius';
    }
  }

  searchWeather() {
    if (this.cityName) {
      this.errorMessage = '';
      this.getCurrentWeather();
      this.getForecast();
    } else {
      this.errorMessage = 'Please enter a city name';
    }
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeather(this.cityName).subscribe(
      (data) => {
        this.currentWeather = data;
      },
      (error) => {
        this.errorMessage =
          'Unable to fetch weather data. Please check the city name and try again.';
      }
    );
  }

  getForecast() {
    const futureDays = 10;
    this.weatherService.getForecast(this.cityName, futureDays, 'no').subscribe(
      (data) => {
        this.forecast = data;
        if (
          this.forecast.forecast &&
          this.forecast.forecast.forecastday &&
          this.forecast.forecast.forecastday.length > 0
        ) {
          const todayForecast = this.forecast.forecast.forecastday[0];
          if (todayForecast.astro) {
            this.sunriseTime = todayForecast.astro.sunrise;
            this.sunsetTime = todayForecast.astro.sunset;
          }
        }
      },
      (error) => {
        this.errorMessage =
          'Unable to fetch forecast data. Please check the city name and try again.';
      }
    );
  }

  onButtonClick(event: MouseEvent) {
    const button = event.target as HTMLElement;
    button.classList.add('bounce');
    setTimeout(() => {
      button.classList.remove('bounce');
    }, 300);
  }

  scrollHourly(direction: 'left' | 'right') {
    const container = this.hourlyContainer.nativeElement;
    const scrollAmount = container.offsetWidth / 2;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
