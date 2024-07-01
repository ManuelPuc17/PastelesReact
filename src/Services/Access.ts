import { UserDTO } from '../Models/UserDTO';
import { LoginDTO } from '../Models/LoginDTO';
import { LoginResult } from '../Models/LoginResult';

const Url = "https://localhost:7232/api"

//Registrarse
export const Register = async (user: UserDTO): Promise<boolean> => {
    const response = await fetch(`${Url}/Access/Register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },  
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: { isSuccess: boolean } = await response.json();
    return result.isSuccess;
};

//Login
export const login = async (model: LoginDTO): Promise<LoginResult> => {
    const response = await fetch(`${Url}/Access/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const loginResponse: LoginResult = await response.json();
    return loginResponse;
};