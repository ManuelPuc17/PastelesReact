import {RatingDTO} from '../Models/RatingDTO';


const Url = "https://localhost:7232/api"


//Filtrar calificaciones 
export const GetRatingList = async (token: string): Promise<RatingDTO[]> => {
    const response = await fetch(`${Url}/Rating/RatingList`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error('Error al obtener la lista de calificaciones');
    }
    
    const data = await response.json();
    return data.value;
};


//filtrar calificacion por id
export const GetRatingById = async (id: number, token: string): Promise<RatingDTO> => {
    const response = await fetch(`${Url}/Rating/GetaRating?rating_id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};


//Filtrar calificaciones por usuario
export const GetRatingByUser = async (id: number, token: string): Promise<RatingDTO[]> => {
    const response = await fetch(`${Url}/Rating/GetMyrating?user_id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.value;
};

//Crear calificacion
export const CreateRating = async (model: RatingDTO, token: string): Promise<boolean> => {
    const response = await fetch(`${Url}/Rating/AddRating`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model),
    });

    if (!response.ok) {
        throw new Error('Error al crear la calificación');
    }

    const result: { isSuccess: boolean } = await response.json();
    return result.isSuccess;
};

//Actualizar calificacion
export const UpdateRating = async (id: number, model: RatingDTO, token: string): Promise<boolean> =>{
    const response = await fetch(`${Url}/Rating/UpdateRating?rating_id=${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model),
    });
    const result = await response.json();
    return result.isSuccess;
};

//eliminar calificación
export const DeleteRating = async (id: number, token: string): Promise<boolean> => {
    const response = await fetch(`${Url}/Rating/DeleteRating?rating_id=${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: { isSuccess: boolean } = await response.json();
    return result.isSuccess;
};