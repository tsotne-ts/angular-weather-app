# Angular Weather App

This is a simple weather application built with Angular that allows users to search for weather information by entering a city name. The app provides current weather conditions, a 4-day forecast, and hourly temperature predictions for the selected city.

## Features

- Search for weather information by city name
- Display current weather conditions, including temperature, location, and weather description
- Show sunrise and sunset times for the selected city
- Display additional weather details such as wind speed, chance of rain, humidity, and pressure
- Provide a 4-day weather forecast
- Show hourly temperature predictions for the current day
- Toggle between Celsius and Fahrenheit temperature units
- Responsive design for optimal viewing on different screen sizes

## Technologies Used

- Angular
- HTML
- CSS
- TypeScript

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   git clone https://github.com/tsotne-ts/angular-weather-app.git
   
2. Navigate to the project directory:
   cd angular-weather-app

3. Install the dependencies:
   npm install

4. Start the development server:
   ng serve

5. Open your browser and visit `http://localhost:4200` to see the app running.

## Usage

1. Enter a city name in the search input field.
2. Click the "Search" button or press Enter to fetch weather information for the specified city.
3. The current weather conditions, including temperature, location, and weather description, will be displayed.
4. Additional weather details such as wind speed, chance of rain, humidity, and pressure will also be shown.
5. The sunrise and sunset times for the selected city will be displayed.
6. A 4-day weather forecast will be provided, showing the average temperature for each day.
7. Hourly temperature predictions for the current day will be displayed in a scrollable container.
8. Click on the temperature unit buttons (°C or °F) to toggle between Celsius and Fahrenheit.

## API

This weather app uses the WeatherAPI.com API to fetch weather data. You'll need to sign up for a free API key at [WeatherAPI.com](https://www.weatherapi.com/) and replace the placeholder API key in the `WeatherService` with your own key.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [WeatherAPI.com](https://www.weatherapi.com/) for providing the weather data API.
- [Angular](https://angular.io/) for the web application framework.
- [Google Fonts](https://fonts.google.com/) for the font styles used in the app.
