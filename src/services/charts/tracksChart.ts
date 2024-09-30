import { TrackList } from '../../domain/entities/trackList';
import apiClient from '../apiClient';

export const getTopTracks = async (limit: number) => {
  const response = await apiClient.get<TrackList>(
    `?method=chart.gettoptracks&api_key=6d6bb686ec391a90c1c9c8601634924a&format=json&limit=${limit}`
  );
  return response.data.tracks.track;
}