import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await register(formData.email, formData.password, formData.name);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear la cuenta');
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
        <h2>Regístrate gratis para escuchar</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">¿Cuál es tu correo electrónico?</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Introduce tu correo electrónico."
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">¿Cómo quieres que te llamemos?</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Introduce un nombre de perfil."
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Crea una contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea una contraseña."
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirma tu contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Vuelve a introducir tu contraseña."
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>o</span>
        </div>
        
        <div className="social-login">
          <button className="social-button facebook" disabled={loading}>
            <i className="fab fa-facebook"></i>
            Registrarse con Facebook
          </button>
          <button className="social-button apple" disabled={loading}>
            <i className="fab fa-apple"></i>
            Registrarse con Apple
          </button>
          <button className="social-button google" disabled={loading}>
            <i className="fab fa-google"></i>
            Registrarse con Google
          </button>
        </div>
        
        <div className="auth-footer">
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión en Spotify Cristiano</Link></p>
        </div>
      </div>

      <div className="auth-signature">
        <p>Creado con ❤️ por Abner - Música para el alma</p>
      </div>
    </div>
  );
};

export default Register;
