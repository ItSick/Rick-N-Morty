import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { LoadingIndicatorComponent } from '../../components/loading-indicator/loading-indicator.component';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface EpisodesResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    LoadingIndicatorComponent
  ],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent implements OnInit {
  episodes: Episode[] = [];
  isLoadingEpisodes = false;
  episodesError: string | null = null;
  
  searchQuery = new FormControl('');
  characters: Character[] = [];
  isLoadingCharacters = false;
  charactersError: string | null = null;
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.loadEpisodes();
    
    this.searchQuery.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value && value.trim().length > 0) {
        this.searchCharacters(value);
      } else {
        this.characters = [];
      }
    });
  }
  
  loadEpisodes(): void {
    this.isLoadingEpisodes = true;
    this.episodesError = null;
    
    this.apiService.getAllEpisodes().subscribe({
      next: (response: EpisodesResponse) => {
        this.episodes = this.shuffleArray([...response.results]);
        this.isLoadingEpisodes = false;
      },
      error: (error) => {
        console.error('Error fetching episodes:', error);
        this.episodesError = 'Failed to load episodes. Please try again later.';
        this.isLoadingEpisodes = false;
      }
    });
  }
  
  searchCharacters(query: string): void {
    this.isLoadingCharacters = true;
    this.charactersError = null;
    
    this.apiService.searchCharacters(query).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.isLoadingCharacters = false;
      },
      error: (error) => {
        console.error('Error searching characters:', error);
        if (error.status === 404) {
          this.characters = [];
          this.charactersError = 'No characters found matching your search.';
        } else {
          this.charactersError = 'Failed to search characters. Please try again later.';
        }
        this.isLoadingCharacters = false;
      }
    });
  }
  
  shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  getEpisodeCode(episode: string): string {
    return episode.replace('S', 'Season ').replace('E', ', Episode ');
  }
  
  clearSearch(): void {
    this.searchQuery.setValue('');
    this.characters = [];
  }
}