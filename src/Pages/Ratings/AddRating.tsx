import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RatingDTO } from '../../Models/RatingDTO';
import { CakeDTO } from '../../Models/CakeDTO';
import { CreateRating } from '../../Services/Ratings';
import { GetCakeNotRating } from '../../Services/Cakes';
import '../../Styles/Ratings/AddRating.css'

const RatingCakes: React.FC = () => {
    const navigate = useNavigate();
    const [Ratings, setRatings] = useState<RatingDTO>({
        id: 0,
        UserId: 0,
        CakeId: 0,
        flavor: 0,
        presentation: 0,
    });
    const [mensaje, setMensaje] = useState<string>('');
    const [Listcake, setListcake] = useState<CakeDTO[]>([]);

    useEffect(() => {
        const token = sessionStorage.getItem('JWToken');
        const idUsuario = sessionStorage.getItem('UserId');
        if (token && idUsuario) {
            const idUsuarioNumber = parseInt(idUsuario, 10);
            setRatings(prevState => ({
                ...prevState,
                UserId: idUsuarioNumber,
            }));

            const fetchCakes = async () => {
                try {
                    const cakes = await GetCakeNotRating(idUsuarioNumber, token);
                    setListcake(cakes);
                } catch (error) {
                    setMensaje('Error al obtener la lista de pasteles');
                }
            };

            fetchCakes();
        } else {
            setMensaje('No autenticado');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRatings(prevState => ({
            ...prevState,
            [name]: name === 'CakeId' || name === 'flavor' || name === 'presentation' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('JWToken');
            if (token) {
                const success = await CreateRating(Ratings, token);
                if (success) {
                    setMensaje('Calificación exitosa');
                    navigate('/MyRatingList');
                } else {
                    setMensaje('Error en la calificación');
                }
            } else {
                setMensaje('No autenticado');
            }
        } catch (error) {
            setMensaje('Error en la calificación');
        }
    };

            return (
                    <div className='container-add-rating'>
                        <div className='card-add-rating'>
                            <h2>Calificar Pastel</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group-add-rating'>
                                    <label>Pastel</label>
                                    <select
                                        name='CakeId'
                                        className='form-control-add-rating'
                                        value={Ratings.CakeId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione un pastel</option>
                                        {Listcake.map(cake => (
                                            <option key={cake.id} value={cake.id}>{cake.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {Ratings.CakeId !== 0 && (
                                    <div className='image-preview-add-rating'>
                                        <img
                                            src={Listcake.find(cake => cake.id === Ratings.CakeId)?.imageUrl}
                                            alt="Imagen del pastel"
                                            className='img-thumbnail'
                                        />
                                    </div>
                                )}
                                <div className='form-group-add-rating'>
                                    <label>Sabor</label>
                                    <input
                                        type="number"
                                        name='flavor'
                                        className='form-control-add-rating'
                                        value={Ratings.flavor}
                                        onChange={handleChange}
                                        min="0"
                                        max="5"
                                        step="1"
                                        required
                                    />
                                </div>
                                <div className='form-group-add-rating'>
                                    <label>Presentación</label>
                                    <input
                                        type="number"
                                        name='presentation'
                                        className='form-control-add-rating'
                                        value={Ratings.presentation}
                                        onChange={handleChange}
                                        min="0"
                                        max="5"
                                        step="1"
                                        required
                                    />
                                </div>
                                {mensaje && <div className='alert'>{mensaje}</div>}
                                <div className='btn-ajust '>
                                <button type='submit' className='btn-add-rating'>Guardar</button>
                                <Link to={`/MyRatingList`} className="btn-cake-out">Regresar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
    );
};

export default RatingCakes;
