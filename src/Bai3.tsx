import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Kiểu dữ liệu cho một bài báo từ Spaceflight News API
type NewsArticle = {
  id: number;
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
  publishedAt?: string;
};

export default function Bai3() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://api.spaceflightnewsapi.net/v4/articles?limit=10')
      .then((response) => {
        // Một số endpoint trả về { results: [...] } hoặc trả về mảng trực tiếp
        const data = response.data;
        const list = data.results || data;
        setNewsArticles(list);
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ padding: 12 }}>
      <h2>Bài 3 — Xem tin tức</h2>
      {isLoading && <div>Đang tải...</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div style={{ display: 'grid', gap: 12 }}>
        {newsArticles.map((article) => (
          <div key={article.id} style={{ border: '1px solid #ddd', padding: 8 }}>
            {article.imageUrl && (
              // Một số bài có trường imageUrl
              <img src={article.imageUrl} alt={article.title} style={{ maxWidth: '100%' }} />
            )}
            <h4>{article.title}</h4>
            <div>{article.summary}</div>
            <div style={{ marginTop: 8 }}>
              <a href={article.url} target="_blank" rel="noreferrer">Xem nguồn</a>
            </div>
            <div style={{ color: '#666', marginTop: 6 }}>{article.publishedAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
