import restClient from "../resClient";

// Crear un usuario

export const signup = async (email: string, password: string) => {
    try {
        const response = await restClient.post('/users/signup', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Login de usuario
export const loginApi = async (email: string, password: string) => {
    try {
        const response = await restClient.post('/users/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Obtener datos de usuario
export const getUserData = async (userId: number | null) => {
    try {
        const response = await restClient.post('/users/user-data', {
            userId
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Editar descripción
export const editDescription = async (userId: number, description: string) => {
    try {
        const response = await restClient.patch('/users/description', {
            userId,
            description
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Agregar canción a favoritos
export const addSongToFav = async (userId: number, song: string) => {
    try {
        const response = await restClient.patch('/users/fav-song', {
            userId,
            song
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};