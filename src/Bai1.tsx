import React, { useState } from 'react';
import axios from 'axios';

// Kiểu dữ liệu cho thông tin thời tiết hiện tại lấy từ API wttr.in
type WeatherInfo = {
  temperatureCelsius?: string;
  description?: string;
};

export default function Bai1() {
  // Tên thành phố do người dùng nhập
  const [cityName, setCityName] = useState('Hanoi');
  // Trạng thái tải dữ liệu
  const [isLoading, setIsLoading] = useState(false);
  // Lưu lỗi (nếu có)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Dữ liệu thời tiết sau khi fetch
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);

  /**
   * Lấy dữ liệu thời tiết từ wttr.in theo tên thành phố.
   * API trả về JSON, phần hiện tại nằm trong `current_condition[0]`.
   */
  const fetchWeatherForCity = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setWeatherInfo(null);
    try {
      const requestUrl = `https://wttr.in/${encodeURIComponent(cityName)}?format=j1`;
      const response = await axios.get(requestUrl);
      const responseData = response.data;

      // Giải nén phần current_condition[0]
      const currentCondition = responseData?.current_condition?.[0];

      const weatherData: WeatherInfo = {
        temperatureCelsius: currentCondition?.temp_C,
        description: currentCondition?.weatherDesc?.[0]?.value,
      };

      setWeatherInfo(weatherData);
    } catch (error: any) {
      // Hiển thị message rõ ràng
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
