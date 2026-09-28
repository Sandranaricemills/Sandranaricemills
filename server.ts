import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI with telemetry User-Agent header as required by guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export interface ForecastDay {
  day: string;
  date: string;
  condition: string;
  weatherCode: number;
  highC: number;
  lowC: number;
  rainChance: number;
}

export interface HourlyForecastItem {
  time: string;
  hour24: number;
  tempC: number;
  condition: string;
  weatherCode: number;
  rainChance: number;
  humidity?: number;
  windSpeedKmH?: number;
}

export interface LiveWeatherData {
  location: string;
  subLocation: string;
  district: string;
  region: string;
  displayLocationEn: string;
  displayLocationUr: string;
  businessNameEn: string;
  businessNameUr: string;
  coordinates: { lat: number; lng: number };
  temperatureC: number;
  temperatureF: number;
  condition: string;
  conditionDescription: string;
  weatherCode: number;
  feelsLikeC: number;
  humidity: number;
  windSpeedKmH: number;
  windDirection: string;
  visibilityKm: number;
  pressureHpa: number;
  precipitationChance: number;
  precipitationMm: number;
  uvIndex: number;
  uvIndexText: string;
  todayHighC: number;
  todayLowC: number;
  sunrise: string;
  sunset: string;
  forecast: ForecastDay[]; // 5-day / 7-day forecast
  hourlyForecast: HourlyForecastItem[]; // Real-time hourly reports
  lastUpdated: string;
  lastUpdatedTimestamp: number;
  provider: 'AccuWeather' | 'Open-Meteo (Real Meteorological Station)';
  providerAttributionUrl: string;
  accuWeatherLink?: string;
  millingAdvisory: {
    sunDryingSuitability: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
    paddyMoistureImpact: string;
    actionableAdvice: string;
  };
}

// Convert degrees to compass direction
function degToCompass(num: number): string {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return arr[val % 16] || 'N';
}

// Map WMO weather code to condition title and description
function mapWmoCode(code: number): { condition: string; description: string } {
  switch (code) {
    case 0:
      return { condition: 'Clear Sky', description: 'Sunny and clear atmospheric conditions across Jhang' };
    case 1:
      return { condition: 'Mainly Clear', description: 'Mostly sunny with light high-altitude clouds' };
    case 2:
      return { condition: 'Partly Cloudy', description: 'Intermittent sunshine with passing cumulus clouds' };
    case 3:
      return { condition: 'Overcast', description: 'Dense overcast cloud cover with diffused solar radiation' };
    case 45:
    case 48:
      return { condition: 'Fog & Mist', description: 'Reduced horizontal visibility with dense riverine fog' };
    case 51:
      return { condition: 'Light Drizzle', description: 'Scattered light misty drizzle in the region' };
    case 53:
    case 55:
      return { condition: 'Moderate Drizzle', description: 'Persistent drizzle with increased ambient humidity' };
    case 61:
      return { condition: 'Slight Rain', description: 'Light rainfall showers across Jhang district' };
    case 63:
      return { condition: 'Moderate Rain', description: 'Steady rainfall with wet ground conditions' };
    case 65:
      return { condition: 'Heavy Rain', description: 'Intense heavy rain downpour' };
    case 80:
      return { condition: 'Light Rain Showers', description: 'Scattered brief rain showers' };
    case 81:
      return { condition: 'Moderate Rain Showers', description: 'Moderate rain showers with humid breezes' };
    case 82:
      return { condition: 'Violent Rain Showers', description: 'Heavy sudden convective rain showers' };
    case 95:
      return { condition: 'Thunderstorm', description: 'Convective thunderstorm with gusty squalls' };
    case 96:
    case 99:
      return { condition: 'Thunderstorm with Hail', description: 'Severe thunderstorm with strong gusts' };
    default:
      return { condition: 'Fair Weather', description: 'Typical seasonal atmospheric conditions in Jhang' };
  }
}

// Format ISO date/time string to localized 12-hour AM/PM
function formatIsoTime(isoString: string): string {
  try {
    if (isoString.includes('T')) {
      const parts = isoString.split('T')[1];
      const [hStr, mStr] = parts.split(':');
      let h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10);
      if (!isNaN(h) && !isNaN(m)) {
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        if (h === 0) h = 12;
        const padM = m < 10 ? `0${m}` : `${m}`;
        const padH = h < 10 ? `0${h}` : `${h}`;
        return `${padH}:${padM} ${ampm}`;
      }
    }
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Karachi',
    });
  } catch {
    return isoString;
  }
}

function calculateMillingAdvisory(humidity: number, rainChance: number, tempC: number, condition: string) {
  const isRaining = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle') || condition.toLowerCase().includes('thunder');

  if (isRaining || rainChance > 40) {
    return {
      sunDryingSuitability: 'Poor' as const,
      paddyMoistureImpact: 'Active precipitation risk prevents open-yard dhaan drying; moisture absorption hazard.',
      actionableAdvice: 'Immediately gather and cover all paddy heaps with heavy waterproof tarpaulins. Keep drainage channels open.',
    };
  }

  if (humidity < 50 && rainChance <= 15 && tempC >= 22) {
    return {
      sunDryingSuitability: 'Excellent' as const,
      paddyMoistureImpact: 'Low ambient relative humidity promotes rapid moisture reduction from 22% field level down to 14% milling benchmark.',
      actionableAdvice: 'Optimal window for open-yard sun drying of 1121 Kainat and Super Basmati. Spread dhaan evenly and cover before 7:00 PM evening dew.',
    };
  }

  if (humidity <= 70 && rainChance <= 25) {
    return {
      sunDryingSuitability: 'Good' as const,
      paddyMoistureImpact: 'Moderate moisture evaporation rate suitable for progressive drying throughout daylight hours.',
      actionableAdvice: 'Proceed with outdoor drying; turn paddy heaps every 2 hours to maintain uniform moisture equilibrium.',
    };
  }

  return {
    sunDryingSuitability: 'Moderate' as const,
    paddyMoistureImpact: 'Elevated relative humidity slows down natural solar evaporation rate.',
    actionableAdvice: 'Monitor digital grain moisture gauges closely; prepare warehouse floor space if humidity increases.',
  };
}

let cachedWeatherData: LiveWeatherData | null = null;
let lastWeatherFetchTime = 0;
const WEATHER_CACHE_MS = 2 * 60 * 1000; // 2 minutes server-side cache

// Coordinates specifically for Chund Bharwana, Jhang, Punjab, Pakistan
const CHUND_BHARWANA_COORDS = { lat: 31.4287, lng: 72.1932 };

function getUvText(uv: number): string {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

// AccuWeather Location Key cache for Chund Bharwana
let cachedAccuWeatherLocationKey: string | null = null;

// Fetch from AccuWeather Core Weather API if key is provided
async function tryFetchAccuWeather(apiKey: string): Promise<LiveWeatherData | null> {
  try {
    // 1. Resolve Location Key specifically for Chund Bharwana, Jhang
    if (!cachedAccuWeatherLocationKey) {
      let locUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=Chund+Bharwana&language=en-us`;
      let locRes = await fetch(locUrl);
      let locData = locRes.ok ? await locRes.json() : null;
      if (Array.isArray(locData) && locData.length > 0) {
        cachedAccuWeatherLocationKey = locData[0].Key;
      } else {
        // Geoposition search for exact coordinates of Chund Bharwana
        locUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${CHUND_BHARWANA_COORDS.lat},${CHUND_BHARWANA_COORDS.lng}&language=en-us`;
        locRes = await fetch(locUrl);
        locData = locRes.ok ? await locRes.json() : null;
        if (locData && locData.Key) {
          cachedAccuWeatherLocationKey = locData.Key;
        }
      }
    }

    if (!cachedAccuWeatherLocationKey) return null;

    // 2. Fetch Current Conditions
    const currentUrl = `http://dataservice.accuweather.com/currentconditions/v1/${cachedAccuWeatherLocationKey}?apikey=${apiKey}&details=true`;
    const curRes = await fetch(currentUrl);
    if (!curRes.ok) return null;
    const curData = await curRes.json();
    if (!Array.isArray(curData) || curData.length === 0) return null;
    const current = curData[0];

    // 3. Fetch 5-Day Forecast
    const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cachedAccuWeatherLocationKey}?apikey=${apiKey}&details=true&metric=true`;
    const foreRes = await fetch(forecastUrl);
    if (!foreRes.ok) return null;
    const foreData = await foreRes.json();

    const tempC = Math.round(current.Temperature?.Metric?.Value ?? 24);
    const feelsLikeC = Math.round(current.RealFeelTemperature?.Metric?.Value ?? tempC);
    const humidity = current.RelativeHumidity ?? 60;
    const windSpeed = Math.round(current.Wind?.Speed?.Metric?.Value ?? 10);
    const windDir = current.Wind?.Direction?.Localized || 'NW';
    const visibility = Number(current.Visibility?.Metric?.Value ?? 8);
    const pressure = Math.round(current.Pressure?.Metric?.Value ?? 1012);
    const condition = current.WeatherText || 'Clear Sky';
    const rainChance = current.HasPrecipitation ? 60 : 5;
    const uvIndex = Number(current.UVIndex ?? 2);
    const uvIndexText = current.UVIndexText || getUvText(uvIndex);

    const dailyForecasts = foreData.DailyForecasts || [];
    const today = dailyForecasts[0] || {};
    const todayHigh = Math.round(today.Temperature?.Maximum?.Value ?? (tempC + 3));
    const todayLow = Math.round(today.Temperature?.Minimum?.Value ?? (tempC - 4));
    const sunrise = today.Sun?.Rise ? formatIsoTime(today.Sun.Rise) : '06:02 AM';
    const sunset = today.Sun?.Set ? formatIsoTime(today.Sun.Set) : '06:00 PM';

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const forecast: ForecastDay[] = dailyForecasts.slice(1, 6).map((item: any, idx: number) => {
      const d = new Date(item.Date);
      const dayName = daysOfWeek[d.getDay()] || `Day ${idx + 1}`;
      return {
        day: dayName,
        date: item.Date.split('T')[0],
        condition: item.Day?.IconPhrase || 'Partly Cloudy',
        weatherCode: item.Day?.Icon || 1,
        highC: Math.round(item.Temperature?.Maximum?.Value ?? 30),
        lowC: Math.round(item.Temperature?.Minimum?.Value ?? 18),
        rainChance: item.Day?.PrecipitationProbability ?? 0,
      };
    });

    // 4. Fetch 12-Hour Hourly Forecast from AccuWeather
    let hourlyForecast: HourlyForecastItem[] = [];
    try {
      const hourlyUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cachedAccuWeatherLocationKey}?apikey=${apiKey}&details=true&metric=true`;
      const hourlyRes = await fetch(hourlyUrl);
      if (hourlyRes.ok) {
        const hourlyData = await hourlyRes.json();
        if (Array.isArray(hourlyData)) {
          hourlyForecast = hourlyData.slice(0, 12).map((item: any, idx: number) => {
            const timeFormatted = formatIsoTime(item.DateTime);
            const d = new Date(item.DateTime);
            return {
              time: idx === 0 ? 'Now' : timeFormatted,
              hour24: d.getHours(),
              tempC: Math.round(item.Temperature?.Value ?? 24),
              condition: item.IconPhrase || 'Clear',
              weatherCode: item.WeatherIcon || 1,
              rainChance: Math.round(item.PrecipitationProbability ?? (item.HasPrecipitation ? 60 : 5)),
              humidity: item.RelativeHumidity ?? 55,
              windSpeedKmH: Math.round(item.Wind?.Speed?.Value ?? 10),
            };
          });
        }
      }
    } catch (hErr) {
      console.warn('AccuWeather hourly fetch error:', hErr);
    }

    const nowPkt = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Karachi',
    }) + ' PKT';

    return {
      location: 'Chund Bharwana',
      subLocation: 'Puber Wala',
      district: 'Jhang',
      region: 'Punjab, Pakistan',
      displayLocationEn: 'Puber Wala, Chund Bharwana, Jhang',
      displayLocationUr: 'پبر والا، چند بھروانہ، جھنگ',
      businessNameEn: 'SANDRANA RICE MILLS – Puber Wala',
      businessNameUr: 'سندرانہ رائس ملز – پبر والا',
      coordinates: CHUND_BHARWANA_COORDS,
      temperatureC: tempC,
      temperatureF: Math.round((tempC * 9) / 5 + 32),
      condition,
      conditionDescription: `${condition} observed at Chund Bharwana via AccuWeather Core Weather API`,
      weatherCode: current.WeatherIcon || 1,
      feelsLikeC,
      humidity,
      windSpeedKmH: windSpeed,
      windDirection: windDir,
      visibilityKm: visibility,
      pressureHpa: pressure,
      precipitationChance: rainChance,
      precipitationMm: current.HasPrecipitation ? 1.5 : 0.0,
      uvIndex,
      uvIndexText,
      todayHighC: todayHigh,
      todayLowC: todayLow,
      sunrise,
      sunset,
      forecast,
      hourlyForecast,
      lastUpdated: nowPkt,
      lastUpdatedTimestamp: Date.now(),
      provider: 'AccuWeather',
      providerAttributionUrl: current.Link || 'https://www.accuweather.com/en/pk/chund-bharwana/weather-forecast/259837',
      accuWeatherLink: current.Link || 'https://www.accuweather.com/en/pk/chund-bharwana/weather-forecast/259837',
      millingAdvisory: calculateMillingAdvisory(humidity, rainChance, tempC, condition),
    };
  } catch (err) {
    console.warn('AccuWeather API notice:', err);
    return null;
  }
}

// Fetch from Real-time Meteorological API (Open-Meteo WMO-Compliant live observations)
async function fetchRealMeteorologicalData(): Promise<LiveWeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${CHUND_BHARWANA_COORDS.lat}&longitude=${CHUND_BHARWANA_COORDS.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,visibility,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=Asia%2FKarachi&forecast_days=7`;

  const res = await fetch(url, { headers: { 'User-Agent': 'SandranaRiceMills-ChundBharwanaWeatherProxy/1.0' } });
  if (!res.ok) {
    throw new Error(`Real Meteorological API returned HTTP ${res.status}`);
  }

  const data = await res.json();
  const current = data.current || {};
  const daily = data.daily || {};
  const hourly = data.hourly || {};

  const tempC = Math.round(current.temperature_2m ?? 24);
  const feelsLikeC = Math.round(current.apparent_temperature ?? tempC);
  const humidity = Math.round(current.relative_humidity_2m ?? 50);
  const windSpeed = Math.round(current.wind_speed_10m ?? 10);
  const windDir = degToCompass(current.wind_direction_10m ?? 0);
  const pressure = Math.round(current.surface_pressure ?? 1012);
  const precipitationMm = Number(current.precipitation ?? current.rain ?? 0);
  const weatherCode = Number(current.weather_code ?? 0);
  const { condition, description } = mapWmoCode(weatherCode);

  // UV Index
  const rawUv = Number(current.uv_index ?? daily.uv_index_max?.[0] ?? 2.0);
  const uvIndex = Math.round(rawUv * 10) / 10;
  const uvIndexText = getUvText(uvIndex);

  // Hourly visibility (m to km)
  let visibilityKm = 10;
  if (Array.isArray(hourly.visibility) && hourly.visibility.length > 0) {
    const currentHourIndex = new Date().getHours();
    const visMeters = hourly.visibility[currentHourIndex] || hourly.visibility[0] || 10000;
    visibilityKm = Math.round((visMeters / 1000) * 10) / 10;
  }

  // Daily statistics for Today (index 0)
  const todayHigh = Math.round(daily.temperature_2m_max?.[0] ?? (tempC + 3));
  const todayLow = Math.round(daily.temperature_2m_min?.[0] ?? (tempC - 4));
  const rainChance = Math.round(daily.precipitation_probability_max?.[0] ?? (precipitationMm > 0 ? 70 : 5));
  const sunrise = daily.sunrise?.[0] ? formatIsoTime(daily.sunrise[0]) : '06:02 AM';
  const sunset = daily.sunset?.[0] ? formatIsoTime(daily.sunset[0]) : '06:00 PM';

  // 5-Day Forecast (indices 1 to 5)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const forecast: ForecastDay[] = [];

  for (let i = 1; i <= 5; i++) {
    if (daily.time?.[i]) {
      const d = new Date(daily.time[i]);
      const dayName = i === 1 ? 'Tomorrow' : daysOfWeek[d.getDay()] || `Day +${i}`;
      const code = Number(daily.weather_code?.[i] ?? 0);
      const codeInfo = mapWmoCode(code);
      forecast.push({
        day: dayName,
        date: daily.time[i],
        condition: codeInfo.condition,
        weatherCode: code,
        highC: Math.round(daily.temperature_2m_max?.[i] ?? (todayHigh - 1)),
        lowC: Math.round(daily.temperature_2m_min?.[i] ?? (todayLow - 1)),
        rainChance: Math.round(daily.precipitation_probability_max?.[i] ?? 5),
      });
    }
  }

  // 12-Hour Hourly Weather Reports
  const hourlyForecast: HourlyForecastItem[] = [];
  if (Array.isArray(hourly.time)) {
    const nowKarachi = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      hour: 'numeric',
      hour12: false,
    }).format(new Date());
    const currentHourInt = parseInt(nowKarachi, 10) || 0;
    const nowIsoDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Karachi' }).format(new Date());
    const targetPrefix = `${nowIsoDate}T${currentHourInt < 10 ? '0' : ''}${currentHourInt}:00`;
    let startIdx = hourly.time.findIndex((t: string) => t.startsWith(targetPrefix) || t >= targetPrefix);
    if (startIdx === -1) startIdx = 0;

    for (let i = startIdx; i < Math.min(startIdx + 12, hourly.time.length); i++) {
      const timeStr = formatIsoTime(hourly.time[i]);
      const wCode = Number(hourly.weather_code?.[i] ?? 0);
      const codeInfo = mapWmoCode(wCode);
      const hDate = new Date(hourly.time[i]);
      hourlyForecast.push({
        time: i === startIdx ? 'Now' : timeStr,
        hour24: hDate.getHours(),
        tempC: Math.round(hourly.temperature_2m?.[i] ?? 24),
        condition: codeInfo.condition,
        weatherCode: wCode,
        rainChance: Math.round(hourly.precipitation_probability?.[i] ?? 0),
        humidity: Math.round(hourly.relative_humidity_2m?.[i] ?? 50),
        windSpeedKmH: Math.round(hourly.wind_speed_10m?.[i] ?? 10),
      });
    }
  }

  const nowPkt = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Karachi',
  }) + ' PKT';

  return {
    location: 'Chund Bharwana',
    subLocation: 'Puber Wala',
    district: 'Jhang',
    region: 'Punjab, Pakistan',
    displayLocationEn: 'Puber Wala, Chund Bharwana, Jhang',
    displayLocationUr: 'پبر والا، چند بھروانہ، جھنگ',
    businessNameEn: 'SANDRANA RICE MILLS – Puber Wala',
    businessNameUr: 'سندرانہ رائس ملز – پبر والا',
    coordinates: CHUND_BHARWANA_COORDS,
    temperatureC: tempC,
    temperatureF: Math.round((tempC * 9) / 5 + 32),
    condition,
    conditionDescription: `${condition} observed in Chund Bharwana, Jhang`,
    weatherCode,
    feelsLikeC,
    humidity,
    windSpeedKmH: windSpeed,
    windDirection: windDir,
    visibilityKm,
    pressureHpa: pressure,
    precipitationChance: rainChance,
    precipitationMm,
    uvIndex,
    uvIndexText,
    todayHighC: todayHigh,
    todayLowC: todayLow,
    sunrise,
    sunset,
    forecast,
    hourlyForecast,
    lastUpdated: nowPkt,
    lastUpdatedTimestamp: Date.now(),
    provider: 'Open-Meteo (Real Meteorological Station)',
    providerAttributionUrl: 'https://open-meteo.com',
    millingAdvisory: calculateMillingAdvisory(humidity, rainChance, tempC, condition),
  };
}

// Weather API endpoint for Jhang, Punjab, Pakistan
app.get('/api/weather', async (req, res) => {
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();

  // Return cached live data if fresh
  if (!forceRefresh && cachedWeatherData && (now - lastWeatherFetchTime < WEATHER_CACHE_MS)) {
    return res.json({
      success: true,
      data: cachedWeatherData,
      cached: true,
      source: cachedWeatherData.provider,
    });
  }

  try {
    let freshData: LiveWeatherData | null = null;

    // 1. If ACCUWEATHER_API_KEY is configured in server env, query AccuWeather Core Weather API
    const accuKey = process.env.ACCUWEATHER_API_KEY;
    if (accuKey && accuKey.trim().length > 0) {
      freshData = await tryFetchAccuWeather(accuKey.trim());
    }

    // 2. If AccuWeather is not configured or failed, query real meteorological station API
    if (!freshData) {
      freshData = await fetchRealMeteorologicalData();
    }

    cachedWeatherData = freshData;
    lastWeatherFetchTime = now;

    return res.json({
      success: true,
      data: freshData,
      cached: false,
      source: freshData.provider,
    });
  } catch (error: any) {
    console.error('Weather API error:', error?.message || error);

    // If API fails but we have prior successful data, return it with a clear notice
    if (cachedWeatherData) {
      return res.json({
        success: true,
        data: cachedWeatherData,
        cached: true,
        isStale: true,
        notice: 'Live API temporarily unreachable. Displaying latest recorded observation.',
      });
    }

    // No data ever fetched and live API failed
    return res.status(503).json({
      success: false,
      error: 'Unable to retrieve live weather data from meteorological stations. Please verify your connection or try again shortly.',
    });
  }
});

// Serve images directory and provide root-level image fallback without duplicating files
const isProd = process.env.NODE_ENV === 'production';
const imagesDir = path.resolve(__dirname, isProd ? 'dist/images' : 'public/images');
app.use('/images', express.static(imagesDir));

app.get('/:filename', (req, res, next) => {
  const candidate = path.join(imagesDir, req.params.filename);
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return res.sendFile(candidate);
  }
  next();
});

// Mounting Vite in development or static in production
if (!isProd) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
