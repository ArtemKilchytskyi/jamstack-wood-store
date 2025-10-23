// import React from 'react';

// function ProductCard({ product }) {
//   const {
//     'ID Товарy': id,
//     Назва: name,
//     Опис: description,
//     'Ціна(UAH)': priceUAH,
//     'URL фото': imageUrl,
//     Наявність: inStock
//   } = product;

//   const available = parseInt(inStock) > 0;

//   return (
//     <div className="product-card">
//       <img
//         src={imageUrl}
//         alt={name}
//         className="product-image"
//         onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
//       />
//       <div className="product-details">
//         <h3 className="product-name">{name}</h3>
//         <p className="product-id">Артикул: {id}</p>
//         <p className="product-description">{description}</p>

//         <div className="product-footer">
//             <span className="product-price">{priceUAH} UAH</span>
//             <button
//                 className={`order-button ${available ? 'available' : 'unavailable'}`}
//                 disabled={!available}
//                 onClick={() => alert(`Замовлення товару: ${name}`)}
//             >
//                 {available ? 'Замовити' : 'Немає в наявності'}
//             </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;
import React, { useState } from "react";
import OrderForm from "./OrderForm"; // Імпортуємо нову форму

function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Новий стан для модального вікна

  const {
    "ID Товарy": id,
    Назва: name,
    Опис: description,
    "Ціна(UAH)": priceUAH, // ❗ ВИПРАВЛЕНО
    "URL фото": imageUrl,
    Наявність: inStock,
  } = product;

  const available = parseInt(inStock) > 0;

  const handleOrderClick = () => {
    if (available) {
      setIsModalOpen(true); // Відкрити форму
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрити форму
  };

  return (
    <>
      <div className="product-card">
        {/* ... (ваш код зображення та деталей) ... */}
        <img
          src={imageUrl}
          alt={name}
          className="product-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300?text=No+Image";
          }}
        />
        <div className="product-details">
          <h3 className="product-name">{name}</h3>
          <p className="product-id">Артикул: {id}</p>
          <p className="product-description">{description}</p>

          <div className="product-footer">
            <span className="product-price">{priceUAH} UAH</span>
            <button
              className={`order-button ${
                available ? "available" : "unavailable"
              }`}
              disabled={!available}
              onClick={handleOrderClick} // Викликаємо відкриття модального вікна
            >
              {available ? "Замовити" : "Немає в наявності"}
            </button>
          </div>
        </div>
      </div>

      {/* Модальне вікно (рендериться, якщо isModalOpen === true) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <OrderForm
              productName={name} // Передаємо назву товару у форму
              onClose={handleCloseModal} // Передаємо функцію закриття
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
