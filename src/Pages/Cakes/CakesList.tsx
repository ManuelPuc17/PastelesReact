import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetCakesList } from '../../Services/Cakes';
import { CakeDTO } from '../../Models/CakeDTO';
import '../../Styles/Cakes/CakesList.css'

const CakesList: React.FC = () => {
    const [cakes, setCakes] = useState<CakeDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('JWToken');
        if (!token) {
            setError('No autenticado');
            return;
        }

        const fetchCakes = async () => {
            try {
                const cakesData = await GetCakesList(token);
                setCakes(cakesData);
                const storedUserName = sessionStorage.getItem('UserName');
                setUserName(storedUserName);
            } catch (err) {
                setError('Error al obtener la lista de pasteles');
            }
        };

        fetchCakes();
    }, []);

    return (
        <div className='containers-list-cake'>
            {error && <div className="alert">{error}</div>}
            <div className='title-list-cake'>
                {userName ? <h2>Bienvenido, {userName}!</h2> : <h1>Lista de Pasteles</h1>}
            </div>
            <Link to="/AddCake" className="btn-add-cake">Agregar Pastel</Link>
            <div className='card-listcake'>
                <table className='list-cakes-table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Origen</th>
                            <th>Precio</th>
                            <th>Sabor</th>
                            <th>Presentación</th>
                            <th>Promedio</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cakes.map((cake) => (
                            <tr key={cake.id}>
                                <td>{cake.imageUrl && (
                                        <div className='image-preview-list-cake'>
                                            <img src={`${cake.imageUrl}`} alt="Imagen del pastel" className='img-thumbnail' />
                                        </div>
                                    )}
                                    {cake.name}
                                </td>
                                <td>{cake.origin}</td>
                                <td>{cake.price}</td>
                                <td>{cake.averageFlavor}</td>
                                <td>{cake.averagePresentation}</td>
                                <td>{cake.finalaverage}</td>
                                <td>
                                    <Link to={`/UpdateCake/${cake.id}`} className="btn-edit-cake">Editar</Link>
                                    <Link to={`/DeleteCake/${cake.id}`} className="btn-delete-cake">Eliminar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CakesList;
