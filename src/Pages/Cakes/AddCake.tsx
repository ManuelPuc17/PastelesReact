import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AddCake } from '../../Services/Cakes';
import { CakeDTO } from '../../Models/CakeDTO';
import '../../Styles/Cakes/AddCake.css'

const AddCakes: React.FC = () => {
    const [pastel, setPastel] = useState<CakeDTO>({ name: '', origin: '', price: 0, imageUrl: '' });
    const [mensaje, setMensaje] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPastel(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = sessionStorage.getItem('JWToken');
        if (token) {
            try {
                const success = await AddCake(pastel, token);
                if (success) {
                    setMensaje('Pastel agregado con éxito');
                    navigate('/Cakes'); 
                } else {
                    setMensaje('Error al agregar el pastel');
                }
            } catch (error) {
                setMensaje('Error al agregar el pastel');
            }
        } else {
            setMensaje('No Autorizado');
        }
    };

    return (
        <div className='container-addcakes'>
            <div className='card-addcake'>           
                            <h2>Agregar Pastel</h2>
                            <form onSubmit={handleSubmit}>
                    <div className='form-group-addcake'>
                        {pastel.imageUrl && (
                            <div className='image-preview-addcake'>
                                <img src={`${pastel.imageUrl}`} alt="Imagen del pastel" className='img-thumbnail' />
                            </div>
                        )}
                        <label>Nombre</label>
                        <input 
                        type="text"
                        name='name'
                        className='form-control-addcake'
                        value={pastel.name}
                        onChange={handleChange}
                        required 
                    />
                    </div>
                    <div className='form-group-addcake'>
                        <label>Origen</label>
                        <input 
                        type="text"
                        name='origin'
                        className='form-control-addcake'
                        value={pastel.origin}
                        onChange={handleChange}
                        required 
                    />
                    </div>
                    <div className='form-group-addcake'>
                        <label>Precio</label>
                        <input 
                        type="number"
                        name='price'
                        className='form-control-addcake'
                        value={pastel.price}
                        onChange={handleChange}
                        required 
                    />
                    </div>
                    <div className='form-group-addcake'>
                        <label>Imagen</label>
                        <input
                        type="text"
                        name='imageUrl'
                        className='form-control-addcake'
                        onChange={handleChange}
                    />
                    </div>
                    {mensaje && <div className='alert'>{mensaje}</div>}
                    <div className='btn-ajust'>
                    <button type='submit' className='btn-addcake'>Agregar</button>
                    <Link to={`/Cakes`} className="btn-cake">Regresar</Link>
                    </div>
                </form>       
            </div>
        </div>
    );
};

export default AddCakes;
