import React, { useState } from 'react';
import axios from 'axios';

type WeatherInfo = {
  temperatureCelsius?: string;
  description?: string;
};

export default function Bai1() {
  const [cityName, setCityName] = useState('Hanoi');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);

  
  const fetchWeatherForCity = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setWeatherInfo(null);
    try {
      const requestUrl = `https://wttr.in/${encodeURIComponent(cityName)}?format=j1`;
      const response = await axios.get(requestUrl);
      const responseData = response.data;

      const currentCondition = responseData?.current_condition?.[0];

      const weatherData: WeatherInfo = {
        temperatureCelsius: currentCondition?.temp_C,
        description: currentCondition?.weatherDesc?.[0]?.value,
      };

      setWeatherInfo(weatherData);
    } catch (error: any) {
      setErrorMessage(error?.message || 'Lỗi khi lấy dữ liệu thời tiết');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Bài 1 — Ứng dụng thời tiết</h2>

      <div style={{ marginBottom: 8 }}>
        <label>
          Tên thành phố:{' '}
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Nhập tên thành phố"
          />
        </label>
        <button onClick={fetchWeatherForCity} style={{ marginLeft: 8 }}>
          Lấy thời tiết
        </button>
      </div>

      {isLoading && <div>Đang tải dữ liệu...</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {weatherInfo && (
        <div>
          <div>Nhiệt độ (°C): {weatherInfo.temperatureCelsius}</div>
          <div>Tình trạng: {weatherInfo.description}</div>
        </div>
      )}
    </div>
  );
}
