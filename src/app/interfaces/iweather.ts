export interface Iweather {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    rain?: {
        '1h'?: number;
        '3h'?: number;
    };
    snow?: {
        '1h'?: number;
        '3h'?: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type?: number;
        id?: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

// {
//     "coord": {
//         "lon": 17.0333,
//         "lat": 59.05
//     },
//     "weather": [
//         {
//             "id": 502,
//             "main": "Rain",
//             "description": "heavy intensity rain",
//             "icon": "10d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 290.26,
//         "feels_like": 290.4,
//         "temp_min": 290.12,
//         "temp_max": 290.26,
//         "pressure": 1005,
//         "humidity": 91,
//         "sea_level": 1005,
//         "grnd_level": 1000
//     },
//     "visibility": 5258,
//     "wind": {
//         "speed": 6.54,
//         "deg": 123,
//         "gust": 17.93
//     },
//     "rain": {
//         "1h": 7.09
//     },
//     "clouds": {
//         "all": 100
//     },
//     "dt": 1757590652,
//     "sys": {
//         "type": 2,
//         "id": 2031420,
//         "country": "SE",
//         "sunrise": 1757563913,
//         "sunset": 1757611527
//     },
//     "timezone": 7200,
//     "id": 2711798,
//     "name": "Gnesta",
//     "cod": 200
// }