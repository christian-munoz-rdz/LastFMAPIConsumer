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
      )}&page=${page}&limit=${limit}&api_key=MY_KEY&format=json`
    );
    return response.data.results;
};
