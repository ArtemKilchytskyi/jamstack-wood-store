import React, { useState } from 'react';

// Важливо: У HTML-коді нижче використовується статична форма, 
// яку Netlify зможе розпізнати. React керуватиме станом полів.

function OrderForm({ productName, onClose }) {
  const [formData, setFormData] = useState({ 
    'form-name': 'order-submission', // Поле, необхідне для Netlify
    product: productName,
    name: '',
    phone: '',
    details: '',
    // Поле Honeypot
    'bot-field': '' 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Кодування даних для надсилання у форматі, зрозумілому Netlify
    const encode = (data) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    }

    // 2. Надсилання POST-запиту
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(formData)
    })
    .then(() => {
        setSubmitted(true);
        // За бажанням, можна закрити форму через кілька секунд
        // setTimeout(onClose, 3000); 
    })
    .catch(error => alert(`Помилка надсилання форми: ${error.message}`));
  };

  if (submitted) {
    return (
      <div className="form-success-message">
        <h3>🎉 Замовлення прийнято!</h3>
        <p>Дякуємо! Майстер зв'яжеться з Вами протягом 24 годин для уточнення деталей та оплати.</p>
        <button onClick={onClose} className="close-button">Закрити</button>
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
      <input type="hidden" name="product" value={productName} />
      
      {/* 🛡️ HONEYPOT: Поле, яке боти заповнять, але користувачі ніколи не побачать */}
      <p className="hidden">
        <label>Не заповнюйте це поле: <input name="bot-field" onChange={handleChange} /></label>
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
          <button type="submit" className="submit-button">Надіслати Замовлення</button>
          <button type="button" onClick={onClose} className="cancel-button">Скасувати</button>
      </div>
    </form>
  );
}

export default OrderForm;