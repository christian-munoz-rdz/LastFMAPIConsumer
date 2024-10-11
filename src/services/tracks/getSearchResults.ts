import apiClient from '../apiClient';
import { Track } from '../../domain/entities/track';

interface TrackSearchResponse {
    results: {
      'opensearch:Query': any;
      'opensearch:totalResults': string;
      'opensearch:startIndex': string;
      'opensearch:itemsPerPage': string;
      trackmatches: {
        track: Track[];
      };
    };
}
  
export const getSearchResults = async (
    trackName: string,
    page: number,
    limit: number
  ) => {
    const response = await apiClient.get<TrackSearchResponse>(
      `?method=track.search&track=${encodeURIComponent(
        trackName
      )}&page=${page}&limit=${limit}&api_key=6d6bb686ec391a90c1c9c8601634924a&format=json`
    );
    return response.data.results;
};