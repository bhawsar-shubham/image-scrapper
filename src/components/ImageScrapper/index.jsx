import React, { useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel styling

const App = () => {
  const [url, setUrl] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const scrapeImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
      const htmlString = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const imgTags = doc.querySelectorAll('img');
      const imgUrls = Array.from(imgTags).map((img) => img.src);
      setImages(imgUrls);
    } catch (err) {
      setError('Failed to scrape images. Please try again.');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    scrapeImages();
  };

  return (
    <div className="container">
      <h1>Hello, It's Image Scraper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the webpage URL"
          value={url}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Scrape Images</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {images.length > 0 && (
        <div className="carousel-container">
          <h2>Scraped Images</h2>
          <Carousel dynamicHeight={true} infiniteLoop={true} showThumbs={false} showStatus={false} showIndicators={false}>
            {images.map((img, index) => (
              <div key={index} className="image-carousel-item">
                <img src={img} alt={`Scraped ${index}`}  style={{ width: "100%", height: "400px", objectFit: "cover" }}/>
                <a href={img} download={`image-${index}`}>
                  Download Image
                </a>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default App;
