import { Song } from "../../../domain/models/song";
import restClient from "../resClient";

// Obtener playlists de usuario => GET /playlists/:uid

export const getPlaylists = async (userId: number) => {
    try {
        const response = await restClient.post('/playlists/', {
            userId
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Crear playlist => POST /playlists/create

export const createPlaylist = async (userId: number, playlistName: string, playlistDescription: string, songs: Song) => {
    try {
        const response = await restClient.post('/playlists/create', {
            userId,
            playlistName,
            playlistDescription,
            songs
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Eliminar playlist => DELETE /playlists/delete
export const deletePlaylist = async (userId: number, playlistName: string) => {
    try {
        const response = await restClient.delete('/playlists/delete', {
            data: {
                userId,
                playlistName
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Agregar canción a playlist => PATCH /playlists/add-song
export const addSongToPlaylist = async (userId: number, playlistName: string, song: Song) => {
    try {
        const response = await restClient.patch('/playlists/add-song', {
            userId,
            playlistName,
            song
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Eliminar canción de playlist => PATCH /playlists/remove-song
export const removeSongFromPlaylist = async (userId: number, playlistName: string, song: Song) => {
    try {
        const response = await restClient.patch('/playlists/remove-song', {
            userId,
            playlistName,
            song
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};