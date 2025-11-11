import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      
      <div className="auth-header">
        <div className="logo">
          <i className="fab fa-spotify"></i>
          <span>Spotify Cristiano</span>
        </div>
      </div>
      
      <div className="auth-card">
        <h2>Iniciar sesión en Spotify Cristiano</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Dirección de email o nombre de usuario</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>o</span>
        </div>
        
        <div className="social-login">
          <button className="social-button facebook" disabled={loading}>
            <i className="fab fa-facebook"></i>
            Continuar con Facebook
          </button>
          <button className="social-button apple" disabled={loading}>
            <i className="fab fa-apple"></i>
            Continuar con Apple
          </button>
          <button className="social-button google" disabled={loading}>
            <i className="fab fa-google"></i>
            Continuar con Google
          </button>
        </div>
        
        <div className="auth-footer">
          <p>¿No tienes cuenta? <Link to="/register">Regístrate en Spotify Cristiano</Link></p>
        </div>
      </div>

      <div className="auth-signature">
        <p>Creado con ❤️ por Abner - Música para el alma</p>
      </div>
    </div>
  );
};

export default Login;
