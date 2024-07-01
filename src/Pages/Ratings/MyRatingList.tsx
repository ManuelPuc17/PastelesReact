import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetRatingByUser } from '../../Services/Ratings';
import { RatingDTO } from '../../Models/RatingDTO';
import '../../Styles/Ratings/Myratings.css'



const RatingsList: React.FC = () => {
    const [ratings, setRatings] = useState<RatingDTO[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const token = sessionStorage.getItem('JWToken');
        const iduser = sessionStorage.getItem('UserId') || '';
        const user = parseInt(iduser, 10);
        if (!token) {
            setError('No autenticado');
            return;
        }
        const fetchRatings = async () => {
            try {
                const data = await GetRatingByUser(user, token);
                setRatings(data);
            } catch (error) {
                setError('Error al obtener las valoraciones');
            }
        };
        fetchRatings();
    },[]);

    return(

        <div className='container-myrt'>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className='title-myrt'>
                <h2>Mis Valoraciones</h2>
            </div>
            <div className='card-myrt'>
                    <table className='table-myrt'>
                        <thead>
                            <tr>
                                <th>Pastel</th>
                                <th>Sabor</th>
                                <th>Presentación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ratings.map((rating) => (
                                <tr key={rating.id}>
                                    <td>{rating.cakeImageUrl && (
                                        <div className='image-preview-listR'>
                                            <img src={`${rating.cakeImageUrl}`} alt="Imagen del pastel" className='img-thumbnail' />
                                        </div>
                                    )}{rating.cakeName}</td>
                                    <td>{rating.flavor}</td>
                                    <td>{rating.presentation}</td>
                                    <td>
                                    <Link to={`/UpdateRating/${rating.id}`} className="btn-edit-rating">Editar</Link>
                                    <Link to={`/DeleteRating/${rating.id}`} className="btn-delete-rating">Eliminar</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    )
};

export default RatingsList;