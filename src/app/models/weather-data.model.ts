export interface WeatherData {
  cityName: string;
  currentWeather: any;
  forecast: any;
  errorMessage: string;
  sunriseTime: string;
  sunsetTime: string;
  isCelsius: boolean;
  chanceOfRain: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
}

export const initialWeatherData: WeatherData = {
  cityName: 'Tbilisi',
  currentWeather: null,
  forecast: null,
  errorMessage: '',
  sunriseTime: '',
  sunsetTime: '',
  isCelsius: true,
  chanceOfRain: 0,
  humidity: 0,
  pressure: 0,
  windSpeed: 0,
};
