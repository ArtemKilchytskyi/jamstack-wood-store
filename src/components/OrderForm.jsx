import React, { useState } from "react";

// ❗ ВИПРАВЛЕНО: Додані productId та productImageUrl у props
function OrderForm({ productName, productId, productImageUrl, onClose }) {
  const [formData, setFormData] = useState({
    "form-name": "order-submission",
    product_name: productName,
    product_id: productId,
    product_image_url: productImageUrl,
    name: "",
    phone: "",
    details: "",
    "bot-field": "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const encode = (data) => {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(formData),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => alert(`Помилка надсилання форми: ${error.message}`));
  };

  if (submitted) {
    return (
      <div className="form-success-message">
        <h3>🎉 Замовлення прийнято!</h3>
        <p>
          Дякуємо! Майстер зв'яжеться з Вами протягом 24 годин для уточнення
          деталей та оплати.
        </p>
        <button onClick={onClose} className="close-button">
          Закрити
        </button>
      </div>
    );
  }

  return (
    <form
      name="order-submission"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <h3>Оформлення замовлення: "{productName}"</h3>

      {/* Приховані поля, критичні для Netlify */}
      <input type="hidden" name="form-name" value="order-submission" />
      <input type="hidden" name="product_name" value={productName} />

      {/* ❗ Gриховані поля з детальною інформацією */}
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="product_image_url" value={productImageUrl} />

      {/* 🛡️ HONEYPOT: ... */}
      <p className="hidden">
        <label>
          Не заповнюйте це поле:{" "}
          <input name="bot-field" onChange={handleChange} />
        </label>
      </p>

      <div className="form-group">
        <label htmlFor="customer-name">Ваше Ім'я:</label>
        <input
          type="text"
          name="name"
          id="customer-name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customer-phone">Телефон / Telegram / Viber:</label>
        <input
          type="text"
          name="phone"
          id="customer-phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customer-details">Побажання / Кастомізація:</label>
        <textarea
          name="details"
          id="customer-details"
          value={formData.details}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          Надіслати Замовлення
        </button>
        <button type="button" onClick={onClose} className="cancel-button">
          Скасувати
        </button>
      </div>
    </form>
  );
}

export default OrderForm;