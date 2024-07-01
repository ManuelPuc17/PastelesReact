import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GetCake, DeleteCake } from '../../Services/Cakes';
import { CakeDTO } from '../../Models/CakeDTO';
import '../../Styles/Cakes/Deletecake.css'

const DeleteCakeComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [cake, setCake] = useState<CakeDTO | null>(null);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        const fetchCake = async () => {
            const token = sessionStorage.getItem('JWToken');
            if (token && id) {
                const cakeId = parseInt(id, 10);
                if (!isNaN(cakeId)) {
                    try {
                        const data = await GetCake(cakeId, token);
                        setCake(data);
                    } catch (error) {
                        setMensaje('Error al obtener el pastel');
                    }
                } else {
                    setMensaje('ID de pastel no válido');
                }
            } else {
                setMensaje('No autenticado o ID de pastel no proporcionado');
            }
        };

        fetchCake();
    }, [id]);

    const handleDelete = async () => {
        const token = sessionStorage.getItem('JWToken');
        if (token && id) {
            const cakeId = parseInt(id, 10);
            try {
                const success = await DeleteCake(cakeId, token);
                if (success) {
                    setMensaje('Pastel eliminado con éxito');
                    navigate('/Cakes');
                } else {
                    setMensaje('Error al eliminar el pastel');
                }
            } catch (error) {
                setMensaje('Error al eliminar el pastel');
            }
        } else {
            setMensaje('No autenticado');
        }
    };

    return (
        <div className='container-delete'>
            <div className='card-delete'>
                            <h2>Eliminar Pastel</h2>
                            {cake ? (
                                <div>
                                    <p>Si elimina este objeto todos los registros relacionados a este se veran afectadas ¿Estás seguro de que deseas eliminar el pastel <strong>{cake.name}</strong>?</p>
                                    {cake.imageUrl && (
                                        <div className='image-preview-delete'>
                                            <img src={`${cake.imageUrl}`} alt="Imagen del pastel" className='img-thumbnail' />
                                        </div>
                                    )}
                                    <div className='btn-ajust'>
                                    <button className='btn-deletecake' onClick={handleDelete}>Eliminar</button>
                                    <Link to={`/Cakes`} className="btn-cakego">Cancelar</Link>
                                    </div>
                                </div>
                        ) : (
                            <p>Cargando detalles del pastel...</p>
                        )}
                    {mensaje && <div className='alert'>{mensaje}</div>}
            </div>
        </div>
    );
};

export default DeleteCakeComponent;
