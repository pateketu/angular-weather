export class Settings {
    
    public static buildWeatherServiceUrl(query: string) {
        const url = 'https://api.openweathermap.org/data/2.5/forecast';
        const params = {
            q: query,
            cnt: '8',
            units: 'metric',
            APPID: '010721642521f31b0fbc8c3831d45951'
        };
        const apiParams = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

        return `${url}?${apiParams}`;
    }

 }
