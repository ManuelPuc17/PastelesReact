import { CakeDTO } from '../Models/CakeDTO';


const Url = "https://localhost:7232/api"

//Mostrar lista
export const GetCakesList = async (token: string): Promise<CakeDTO[]> => {
    const response = await fetch(`${Url}/Cake/CakeList`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener la lista de pasteles');
    }

    const data = await response.json();
    return data.value;
};

//Pastel Por id
export const GetCake = async (id: number, token: string): Promise<CakeDTO> => {
    const response = await fetch(`${Url}/Cake/Getacake?cake_id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const result = await response.json();
    return result;
};

//Pasteles no calificados
export const GetCakeNotRating = async (userId: number, token: string): Promise<CakeDTO[]> => {
    const response = await fetch(`${Url}/Cake/CakeNotRating?user_id=${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener la lista de pasteles no calificados');
    }

    const data = await response.json();
    return data;
};

//Agregar pastel 
export const AddCake = async (pastel: CakeDTO, token: string): Promise<boolean> =>{
    const response = await fetch(`${Url}/Cake/AddCake`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pastel)
    });
    const result = await response.json();
    return result.isSuccess;
};

//Actualizar pastel
export const UpdateCake = async (id: number, pastel: CakeDTO, token: string): Promise<boolean> => {
    const response = await fetch(`${Url}/Cake/UpdateCake?cake_id=${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pastel)
    });
    const result = await response.json();
    return result.isSuccess;
};

//borra pastel
export const DeleteCake = async (id: number, token: string): Promise<boolean> => {
    const response = await fetch(`${Url}/Cake/DeleteCake?cake_id=${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const result = await response.json();
    return result.isSuccess;
};