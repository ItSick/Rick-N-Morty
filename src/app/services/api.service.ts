import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Character } from '../models/character';
import { CharacterResponse } from '../models/character-response';
import { Episode } from '../models/episode';
import { EpisodeResponse } from '../models/episode-response';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1, name: string = '', status: string = ''): Observable<CharacterResponse> {
    let url = `${this.baseUrl}/character/?page=${page}`;
    
    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }
    
    if (status) {
      url += `&status=${encodeURIComponent(status)}`;
    }
    
    return this.http.get<CharacterResponse>(url);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getNextPage(url: string): Observable<CharacterResponse> {
    console.log(`Fetching next batch of characters from: ${url}`);
    return this.http.get<CharacterResponse>(url);
  }

  searchCharacters(name: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.baseUrl}/character/?name=${encodeURIComponent(name)}`);
  }

  getAllEpisodes(): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(`${this.baseUrl}/episode`);
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episode/${id}`);
  }
}