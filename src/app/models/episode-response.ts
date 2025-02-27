import { Episode } from "./episode";

export interface EpisodeResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Episode[];
  }