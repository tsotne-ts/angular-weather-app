export interface Forecast {
  location: {
    tz_id: string;
  };
  forecast: {
    forecastday: {
      date: string;
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moon_illumination: number;
        moon_phase: string;
      };
      day: {
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
        avghumidity: number;
      };
      hour: {
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          icon: string;
        };
        pressure_mb: number;
      }[];
    }[];
  };
}
