import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserDTO } from '../Models/UserDTO';
import { Register } from '../Services/Access';
import '../Styles/Access.css'


const RegisterForm: React.FC = () => {
    const [user, setUser] = useState<UserDTO>({ name: '', email: '', password: '' });
    const [mensaje, setMensaje] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const success = await Register(user);
            if (success) {
                setMensaje('Registro exitoso');
                navigate('/login');  
            } else {
                setMensaje('Error en el registro');
            }
        } catch (error) {
            setMensaje('Error en el registro');
        }
    };

    return (

                    <div className='container-access' >
                        <div className='card-access'>
                        <h2 >Registrarse</h2>
                            <form onSubmit={handleSubmit}>
                            <div className='form-group-access'>
                                    <label>Nombre</label>
                                    <input 
                                        type="text"
                                        name='name'
                                        className='form-control-access'
                                        value={user.name}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className='form-group-access'>
                                    <label>Correo</label>
                                    <input 
                                        type="email"
                                        name='email'
                                        className='form-control-access'
                                        value={user.email}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <br />
                                <div className='form-group-access'>
                                    <label>Contraseña</label>
                                    <input 
                                        type="password"
                                        name='password'
                                        className='form-control-access'
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {mensaje && <div className='alert alert-danger'>{mensaje}</div>}
                                <button type='submit' className='btn-access'>Guardar</button>
                                <br />
                               <p>¿Ya tienes una cuenta? <Link to={`/login`}>Login</Link></p> 
                            </form>
                            <br />
                        </div>
                    </div>
    );
};

export default RegisterForm;
