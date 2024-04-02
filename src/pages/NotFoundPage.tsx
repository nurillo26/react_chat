import React from 'react';
import { Link } from 'react-router-dom';

const notFoundWrapStyles: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#1f1d1d',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const backButton = {
  padding: 10,
  border: '1px solid #fff',
  borderRadius: 10,
  backgroundColor: 'transparent',
  color: '#fff',
  cursor: 'pointer',
};

const NotFoundPage = () => {
  return (
    <div style={notFoundWrapStyles}>
      <h3>Страница не найдена 😦</h3>
      <p style={{ marginBottom: 20 }}>Надо вернуться назад</p>
      <Link to="/app">
        <button style={backButton}>На главную</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
