export interface CurrentWeather {
  location: {
    name: string;
    country: string;
    tz_id: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
  };
}
