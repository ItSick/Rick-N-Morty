import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character!: Character; // ! means that the property is guaranteed to be set
  
  constructor(private router: Router) {}
  
  viewCharacterDetails(): void {
    this.router.navigate(['/character', this.character.id]);
  }
  
  getStatusClass(): string {
    return `status-indicator ${this.character.status.toLowerCase()}`;
  }
}