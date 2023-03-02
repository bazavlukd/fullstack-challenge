export interface WeatherData {
  current: {
    // current weather data
  },
  hourly: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    // additional hourly data properties here
  }[];
}
