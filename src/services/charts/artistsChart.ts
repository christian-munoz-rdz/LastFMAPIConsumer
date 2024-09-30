import { ArtistList } from '../../domain/entities/artistList';
import apiClient from '../apiClient';

export const getTopArtists = async (limit: number) => {
  const response = await apiClient.get<ArtistList>(
    `?method=chart.gettopartists&api_key=6d6bb686ec391a90c1c9c8601634924a&format=json&limit=${limit}`
  );
  return response.data.artists.artist;
}