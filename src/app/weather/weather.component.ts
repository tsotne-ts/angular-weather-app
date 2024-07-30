import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData, initialWeatherData } from '../models/weather-data.model';
import { CurrentWeather } from '../models/current-weather.model';
import { Forecast } from '../models/forecast.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  @ViewChild('hourlyContainer') hourlyContainer!: ElementRef;
  weatherData: WeatherData = { ...initialWeatherData };
  currentWeather: CurrentWeather | undefined;
  forecast: Forecast | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.searchWeather();
    this.loadTemperaturePreference();
  }

  setTemperatureUnit(celsius: boolean) {
    this.weatherData.isCelsius = celsius;
    localStorage.setItem(
      'temperaturePreference',
      this.weatherData.isCelsius ? 'celsius' : 'fahrenheit'
    );
  }

  loadTemperaturePreference() {
    const preference = localStorage.getItem('temperaturePreference');
    if (preference) {
      this.weatherData.isCelsius = preference === 'celsius';
    }
  }

  searchWeather() {
    if (this.weatherData.cityName) {
      this.weatherData.errorMessage = '';
      this.getCurrentWeather();
      this.getForecast();
    } else {
      this.weatherData.errorMessage = 'Please enter a city name';
    }
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeather(this.weatherData.cityName).subscribe(
      (data) => {
        this.currentWeather = data;
        this.weatherData.windSpeed = data.current.wind_kph;
      },
      (error) => {
        this.weatherData.errorMessage =
          'Please check the city name and try again.';
      }
    );
  }

  getForecast() {
    const futureDays = 10;
    this.weatherService
      .getForecast(this.weatherData.cityName, futureDays, 'no')
      .subscribe(
        (data) => {
          this.forecast = data;
          if (
            this.forecast.forecast &&
            this.forecast.forecast.forecastday &&
            this.forecast.forecast.forecastday.length > 0
          ) {
            const todayForecast = this.forecast.forecast.forecastday[0];
            if (todayForecast.astro) {
              this.weatherData.sunriseTime = todayForecast.astro.sunrise;
              this.weatherData.sunsetTime = todayForecast.astro.sunset;
              this.weatherData.chanceOfRain =
                todayForecast.day.daily_chance_of_rain;
              this.weatherData.humidity = todayForecast.day.avghumidity;
              this.weatherData.pressure = todayForecast.hour[0].pressure_mb;
            }
            if (todayForecast.astro) {
              this.weatherData.sunriseTime = todayForecast.astro.sunrise;
              this.weatherData.sunsetTime = todayForecast.astro.sunset;
            }

            const currentTime = new Date();
            const cityTimezone = this.forecast.location.tz_id;
            const cityTime = this.convertToTimezone(currentTime, cityTimezone);
            const cityHour = cityTime.getHours();
            const cityMinute = cityTime.getMinutes();
            const totalCityMinutes = cityHour * 60 + cityMinute;

            let closestIndex = 0;
            let minimumDifference = Infinity;

            for (let i = 0; i < todayForecast.hour.length; i++) {
              const hour = todayForecast.hour[i];
              const [hourString, minuteString] = hour.time
                .split(' ')[1]
                .split(':');
              const totalMinutes =
                parseInt(hourString, 10) * 60 + parseInt(minuteString, 10);

              const difference = Math.abs(totalMinutes - totalCityMinutes);
              if (difference < minimumDifference) {
                minimumDifference = difference;
                closestIndex = i;
              }
            }

            setTimeout(() => {
              this.scrollToIndex(closestIndex);
            }, 0);
          }
        },
        (error) => {
          this.weatherData.errorMessage =
            'Please check the city name and try again.';
        }
      );
  }

  convertToTimezone(date: Date, timezone: string): Date {
    return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
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

  scrollToIndex(index: number) {
    const container = this.hourlyContainer.nativeElement;
    const hourlyData = container.querySelectorAll(
      '.weather-app__forecast-hourly-data'
    );

    if (index >= 0 && index < hourlyData.length) {
      const selectedData = hourlyData[index] as HTMLElement;
      selectedData.classList.add('active');

      const containerWidth = container.offsetWidth;
      const selectedDataWidth = selectedData.offsetWidth;
      const selectedDataOffset = selectedData.offsetLeft;

      const scrollPosition =
        selectedDataOffset - containerWidth / 2 + selectedDataWidth / 2;

      container.style.opacity = '0';

      container.scrollLeft = scrollPosition;

      container.offsetHeight;

      container.classList.add('fade-in');

      setTimeout(() => {
        container.style.opacity = '1';
      }, 500);
    }
  }
}
