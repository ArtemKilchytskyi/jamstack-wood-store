import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const API_URL = 'https://sheetdb.io/api/v1/7ukjqn6npts1l';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка мережі або API SheetDB');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        console.error("Помилка завантаження даних:", err);
      });
  }, []); 

  if (loading) {
    return <h2>Завантаження асортименту...</h2>;
  }

  if (error) {
    return <h2>Помилка завантаження: {error}. Перевірте URL таблиці.</h2>;
  }

  return (
    <div className="product-list-container">
      <h2>Наш Асортимент (Оновлено з SheetDB)</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product['ID Товарy']} product={product} />
          ))
        ) : (
          <p>Наразі товарів в асортименті немає.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;