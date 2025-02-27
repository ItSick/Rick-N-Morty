import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ApiService } from '../../services/api.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit {
  character: Character | null = null;
  isLoading = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCharacter(+id);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  
  loadCharacter(id: number): void {
    this.isLoading = true;
    console.log(`Loading character with ID: ${id}`);
    
    this.apiService.getCharacterById(id).subscribe({
      next: (character) => {
        console.log('Character data loaded:', character);
        this.character = character;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching character:', error);
        this.error = 'Failed to load character details';
        this.isLoading = false;
      }
    });
  }
  
  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
  
  goBack(): void {
    this.location.back();
  }
  
  getEpisodeNumber(episodeUrl: string): string {
    const parts = episodeUrl.split('/');
    return parts[parts.length - 1];
  }
}