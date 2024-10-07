import restClient from "../resClient";
import { Song } from '../../../domain/models/song';

// Obtener reviews de usuario => GET /reviews/:uid
export const getReviews = async (userId: number) => {
    try {
        const response = await restClient.post('reviews/', {
            userId
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Crear review => POST /reviews/create
export const createReview = async (userId: number, song: Song, comment: string, rating: string) => {
    try {
        const response = await restClient.post('/reviews/create', {
            userId,
            song,
            comment,
            rating
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Eliminar review => DELETE /reviews/delete
export const deleteReview = async (userId: number, song: Song) => {
    try {
        const response = await restClient.delete('/reviews/delete', {
            data: {
                userId,
                song
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


