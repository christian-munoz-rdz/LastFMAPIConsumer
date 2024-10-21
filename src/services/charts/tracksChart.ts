import { TrackList } from '../../domain/entities/trackList';
import apiClient from '../apiClient';

export const getTopTracks = async (limit: number, page: number) => {
  const response = await apiClient.get<TrackList>(
    `?method=chart.gettoptracks&api_key=MY_KEY&format=json&limit=${limit}&page=${page}`
  );
  return response.data;
}
