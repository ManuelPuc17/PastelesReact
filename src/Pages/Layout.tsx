import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../Styles/Layout.css'
import logo from '../assets/Cake-logo.jpg'

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <aside className="sidebar">
            <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <nav>
                    <ul>
                        <li><Link to="/Cakes">Pasteles</Link></li>
                        <li><Link to="/RatingsList">Calificaciones</Link></li>
                        <li><Link to="/MyRatingList">Mis Calificaciones</Link></li>
                        <li><Link to="/RatingCake">Calificar</Link></li>           
                    </ul>
                </nav>
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
