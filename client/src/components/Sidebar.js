import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <i className="fab fa-spotify"></i>
        <span>Spotify Cristiano</span>
      </div>
      
      <nav className="sidebar-nav">
        <Link 
          to="/dashboard" 
          className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <i className="fas fa-home"></i>
          <span>Inicio</span>
        </Link>
        <a href="#" className="nav-item">
          <i className="fas fa-search"></i>
          <span>Buscar</span>
        </a>
        <Link 
          to="/library" 
          className={`nav-item ${location.pathname === '/library' ? 'active' : ''}`}
        >
          <i className="fas fa-book"></i>
          <span>Tu Biblioteca</span>
        </a>
      </nav>
      
      <div className="sidebar-playlists">
        <div className="playlist-header">
          <button className="create-playlist">
            <i className="fas fa-plus"></i>
            <span>Crear playlist</span>
          </button>
        </div>
        
        <div className="playlist-list">
          <a href="#" className="playlist-item">
            <span>Música para Orar</span>
          </a>
          <a href="#" className="playlist-item">
            <span>Alabanza Matutina</span>
          </a>
          <a href="#" className="playlist-item">
            <span>Favoritas Cristianas</span>
          </a>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <p>Creado por Abner</p>
      </div>
    </aside>
  );
};

export default Sidebar;
