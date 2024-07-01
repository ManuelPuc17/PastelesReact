import React, { useEffect, useState } from 'react';
import { GetRatingList } from '../../Services/Ratings';
import { RatingDTO } from '../../Models/RatingDTO';
import '../../Styles/Ratings/RatingList.css';



const RatingsList: React.FC = () => {
    const [ratings, setRatings] = useState<RatingDTO[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const token = sessionStorage.getItem('JWToken');
        if (!token) {
            setError('No autenticado');
            return;
        }
        const fetchRatings = async () => {
            try {
                const data = await GetRatingList(token);
                setRatings(data);
                console.log(data);
            } catch (error) {
                setError('Error al obtener las valoraciones');
            }
        };
        fetchRatings();
    },[]);

    return(

        <div className='container-rt'>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className='title-rt'>
                <h2>Valoraciones</h2>
            </div>
            <div className='card-listRating'>
                    <table className='rating-table'>
                        <thead>
                            <tr>
                                <th>Pastel</th>
                                <th>Usuario</th>
                                <th>Sabor</th>
                                <th>Presentación</th>
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
                                    <td>{rating.userName}</td>
                                    <td>{rating.flavor}</td>
                                    <td>{rating.presentation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    )
};

export default RatingsList;