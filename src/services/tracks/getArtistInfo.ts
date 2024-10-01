import apiClient from '../apiClient';
import { ArtistInfo } from '../../domain/entities/artistInfo';

export const getArtistInfo = async (artist: string) => {
  const response = await apiClient.get<ArtistInfo>(
    `?method=artist.getInfo&api_key=6d6bb686ec391a90c1c9c8601634924a&format=json&artist=${artist}`
  );
  return response.data.artist;
}
