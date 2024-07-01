import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UpdateCake, GetCake } from '../../Services/Cakes';
import { CakeDTO } from '../../Models/CakeDTO';
import '../../Styles/Cakes/UpdateCake.css';

const UpdateCakes: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [cake, setCake] = useState<CakeDTO>({
        id: 0,
        name: '',
        origin: '',
        price: 0,
        imageUrl: ''
    });
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCake(prevState => ({ ...prevState, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = sessionStorage.getItem('JWToken');
        if (token && id) {
            try {
                const cakeId = parseInt(id, 10);
                const success = await UpdateCake(cakeId, cake, token);
                if (success) {
                    setMensaje('Edición exitosa');
                    navigate('/Cakes');
                } else {
                    setMensaje('Error en la edición');
                }
            } catch (error) {
                setMensaje('Error en la edición');
            }
        } else {
            setMensaje('No autenticado');
        }
    };

    return (
        <div className='container-update-cake'>  
            <div className='card-update-cake'>
                            <h2>Editar Pastel</h2>
                     <form onSubmit={handleSubmit}>
                        <div className='form-group-update-cake'>
                                {cake.imageUrl && (
                                        <div className='image-preview-update-cake'>
                                            <img src={`${cake.imageUrl}`} alt="Imagen del pastel" className='img-thumbnail' />
                                        </div>
                                    )}
                            <label>Nombre</label>
                            <input 
                            type="text"
                            name='name'
                            className='form-control-update-cake'
                            value={cake.name}
                            onChange={handleChange}
                            readOnly
                            required 
                        />
                        </div>
                        <div className='form-group-update-cake'>
                            <label>Origen</label>
                            <input 
                            type="text"
                            name='origin'
                            className='form-control-update-cake'
                            value={cake.origin}
                            onChange={handleChange}
                            required 
                        />
                        </div>
                        <div className='form-group-update-cake'>
                            <label>Precio</label>
                            <input 
                            type="number"
                            name='price'
                            className='form-control-update-cake'
                            value={cake.price}
                            onChange={handleChange}
                            required 
                        />
                        </div>
                        <div className='form-group-update-cake'>
                            <label>Nueva Imagen</label>
                            <input
                            type="text"
                            name='imageUrl'
                            className='form-control-update-cake'
                            onChange={handleChange}
                        />
                        </div>
                        {mensaje && <div className='alert'>{mensaje}</div>}
                        <div className='btn-ajust'>
                        <button type='submit' className='btn-update-cake'>Guardar</button>
                        <Link to={`/Cakes`} className="btn-cake-out">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCakes;
