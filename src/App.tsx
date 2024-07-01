import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './Pages/Login';
import RegisterForm from './Pages/Register';
import Layout from './Pages/Layout';
import CakesList from './Pages/Cakes/CakesList';
import UpdateCakes from './Pages/Cakes/UpdateCake';
import AddCakes from './Pages/Cakes/AddCake';
import DeleteCake from './Pages/Cakes/DeleteCake';
import RatingsList from './Pages/Ratings/RatingList';
import MyRatingList from './Pages/Ratings/MyRatingList';
import RatingCake from './Pages/Ratings/AddRating';
import UpdateRatings from './Pages/Ratings/UpdateRating';
import DeleteRatings from './Pages/Ratings/DeleteRating';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={<Layout />}>
                <Route path="/" element={<Navigate to="/cakes" />} />
                <Route path="cakes" element={<CakesList />} />
                <Route path="UpdateCake/:id" element={<UpdateCakes />} />
                <Route path="AddCake" element={<AddCakes />} />
                <Route path="DeleteCake/:id" element={<DeleteCake />} />
                <Route path="RatingsList" element={<RatingsList />} />
                <Route path="MyRatingList" element={<MyRatingList />} />
                <Route path="RatingCake" element={<RatingCake />} />
                <Route path="UpdateRating/:id" element={<UpdateRatings />} />
                <Route path="DeleteRating/:id" element={<DeleteRatings />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
