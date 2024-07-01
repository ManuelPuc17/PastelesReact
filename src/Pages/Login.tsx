import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../Services/Access';
import { LoginDTO } from '../Models/LoginDTO';
import '../Styles/Access.css'

const LoginForm: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginDTO>({ email: '', password: '' });
    const [mensaje, setMensaje] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login(loginData);
            if (result.isSuccess) {
                sessionStorage.setItem('JWToken', result.token);
                sessionStorage.setItem('UserId', result.userId);
                sessionStorage.setItem('UserName', result.userName);
                setMensaje('Login exitoso');
                navigate('/cakes');
            } else {
                setMensaje('Login fallido');
            }
        } catch (error) {
            setMensaje('Los datos ingresados no son correctos');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    return (

                    <div className='container-access'>
                        <div className='card-access'>
                        <h2>Iniciar Sesión</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group-access'>
                                    <label>Correo</label>
                                    <input 
                                        type="email"
                                        name='email'
                                        className='form-control-access'
                                        value={loginData.email}
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
                                        value={loginData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {mensaje && <div className='alert alert-danger'>{mensaje}</div>}
                                <button type='submit' className='btn-access'>Login</button>
                                <br />
                                <p>¿No tienes una cuenta? <Link to={`/register`}>Crear cuenta</Link></p>
                            </form>
                            <br />
                        </div>
                    </div>
    );
};

export default LoginForm;
