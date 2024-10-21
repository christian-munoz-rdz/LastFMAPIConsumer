import { TrackInfo } from '../../domain/entities/trackInfo';
import apiClient from '../apiClient';


export const getTrackInfo = async (track: string, artist: string) => {
  const response = await apiClient.get<TrackInfo>(
    `?method=track.getInfo&api_key=MY_KEY&format=json&track=${track}&artist=${artist}`
  );
  return response.data.track;
}
