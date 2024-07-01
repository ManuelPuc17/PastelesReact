import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GetRatingById, DeleteRating } from '../../Services/Ratings';
import { RatingDTO } from '../../Models/RatingDTO';
import '../../Styles/Ratings/DeleteRating.css'

const DeleteRatings: React.FC = () =>{
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [rating, setRating] = useState<RatingDTO | null>(null);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() =>{
        const fetchRating = async () =>{
            const token = sessionStorage.getItem('JWToken');
            if(token && id){
                const cakeId = parseInt(id, 10);
                if (!isNaN(cakeId)){
                    try {
                        const data = await GetRatingById(cakeId, token);
                        setRating(data);
                    } catch (error) {
                        setMensaje('Error al obtener la valoración');
                    }
                }else{
                    setMensaje('ID de valoración no válido');
                }
            }else{
                setMensaje('No autenticado o ID de valoración no proporcionado');
            }
        };
        fetchRating();
    },[id]);

    const handleDelete = async () =>{
        const token = sessionStorage.getItem('JWToken');
        if(token && id){
            const cakeId = parseInt(id, 10);
            if (!isNaN(cakeId)){
                try {
                    const success = await DeleteRating(cakeId, token);
                    if(success){
                        setMensaje('Valoración eliminada');
                        navigate('/MyRatingList');
                    }else{
                        setMensaje('Error al eliminar la valoración');
                    }
                } catch (error) {
                    setMensaje('Error al eliminar la valoración');
                }
            }else{
                setMensaje('ID de valoración no válido');
            }
        }else{
            setMensaje('No autenticado o ID de valoración no proporcionado');
        }
    };

    return(

        <div className='container-delete-rating'>
            <div className='card-delete-rating'>
                <h2>Eliminar valoración</h2>
                {rating ?(
                    <div>
                        <p>Si elimina la valoracion podra volver a calificar el pastel ¿Estás seguro de que deseas eliminar la valoración de <strong>{rating.cakeName}</strong>?</p>
                        {rating.cakeImageUrl && (
                                        <div className='image-preview-delete-rating'>
                                            <img src={`${rating.cakeImageUrl}`} alt="Imagen del pastel" className='img-thumbnail' />
                                        </div>
                                    )}
                        <div className='btn-ajust'>
                        <button className='btn-delete-rating' onClick={handleDelete}>Eliminar</button>
                        <Link className='btn-cake-out' to='/MyRatingList'>Cancelar</Link>
                        </div>
                    </div>
                ) :(
                    <p>Cargando detalles de la valoración...</p>
                )}
                {mensaje && <div className='alert'>{mensaje}</div>}

            </div>

        </div>
    );

};

export default DeleteRatings;