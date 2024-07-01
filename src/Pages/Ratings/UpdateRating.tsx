import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RatingDTO } from "../../Models/RatingDTO";
import { GetRatingById, UpdateRating } from "../../Services/Ratings";
import '../../Styles/Ratings/UpdateRating.css'

const UpdateRatings: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [rating, setRating] = useState<RatingDTO>({
        id: 0,
        userName: '',
        cakeName: '',
        flavor: 0,
        presentation: 0
    });
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        const fetchRating = async () => {
            const token = sessionStorage.getItem('JWToken');
            if (token && id) {
                const ratingId = parseInt(id, 10);
                if (!isNaN(ratingId)) {
                    try {
                        const data = await GetRatingById(ratingId, token);
                            setRating(data);
                    } catch (error) {
                        setMensaje('Error al obtener la valoración');
                    }
                } else {
                    setMensaje('ID de valoración no válido');
                }
            } else {
                setMensaje('No autenticado o ID de valoración no proporcionado');
            }
        };
        fetchRating();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRating(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = sessionStorage.getItem('JWToken');
        if (token && id) {
            const ratingId = parseInt(id, 10);
            if (!isNaN(ratingId)) {
                try {
                    const success = await UpdateRating(ratingId, rating, token);
                    if (success) {
                        setMensaje('Valoración actualizada');
                        navigate('/MyRatingList');
                    } else {
                        setMensaje('Error al actualizar la valoración');
                    }
                } catch (error) {
                    setMensaje('Error al actualizar la valoración');
                }
            } else {
                setMensaje('ID de valoración no válido');
            }
        } else {
            setMensaje('No autenticado o ID de valoración no proporcionado');
        }
    };

    return (
        <div className="container-upRating">
            <div className="card-upRating">
                <h2>Actualizar Valoración</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-upRating">
                        {rating.cakeImageUrl && (
                            <div className='image-preview-upRating'>
                                <img src={`${rating.cakeImageUrl}`} alt="Imagen del pastel" className='img-thumbnail' />
                                <p>{rating.cakeName}</p>
                            </div>
                        )}
                    </div>
                    <div className="form-group-upRating">
                        <label>Usuario</label>
                        <input 
                            type="text"
                            name="userName"
                            className="form-control-upRating"
                            value={rating.userName}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group-upRating">
                        <label>Sabor</label>
                        <input 
                            type="number"
                            name="flavor"
                            className="form-control-upRating"
                            value={rating.flavor}
                            onChange={handleChange}
                            min="0"
                            max="5"
                            step="1"
                            required
                        />
                    </div>
                    <div className="form-group-upRating">
                        <label>Presentación</label>
                        <input 
                            type="number"
                            name="presentation"
                            className="form-control-upRating"
                            value={rating.presentation}
                            onChange={handleChange}
                            min="0"
                            max="5"
                            step="1"
                            required
                        />
                    </div>
                    {mensaje && <div className='alert'>{mensaje}</div>}
                    <div className='btn-ajust'>
                        <button type='submit' className='btn-upRating'>Guardar</button>
                        <Link to={`/MyRatingList`} className="btn-cake">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default UpdateRatings;
