import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { LoadingIndicatorComponent } from '../../components/loading-indicator/loading-indicator.component';

import { ApiService } from '../../services/api.service';
import { Character } from '../../models/character';
import { CharacterResponse } from '../../models/character-response';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    InfiniteScrollDirective,
    CharacterCardComponent,
    LoadingIndicatorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  isLoading = false;
  currentPage = 1;
  hasNextPage = true;
  viewMode = 'grid';
  nextPageUrl: string | null = null;
  
  nameFilter = new FormControl('');
  statusFilter = new FormControl('');
  
  statusOptions = [
    { value: '', viewValue: 'All' },
    { value: 'alive', viewValue: 'Alive' },
    { value: 'dead', viewValue: 'Dead' },
    { value: 'unknown', viewValue: 'Unknown' }
  ];
  
  displayedColumns: string[] = ['id', 'image', 'name', 'status', 'species', 'type', 'gender', 'actions'];
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCharacters();
    
    this.nameFilter.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.resetAndReload();
    });
    
    this.statusFilter.valueChanges.subscribe(() => {
      this.resetAndReload();
    });
  }
  
  loadCharacters(): void {
    if (this.isLoading || !this.hasNextPage) return;
    
    this.isLoading = true;
    const name = this.nameFilter.value || '';
    const status = this.statusFilter.value || '';
    
    if (this.nextPageUrl) {
      console.log(`Loading next page from URL: ${this.nextPageUrl}`);
      this.apiService.getNextPage(this.nextPageUrl).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    } else {
      console.log(`Loading page ${this.currentPage} with filters - name: "${name}", status: "${status}"`);
      this.apiService.getCharacters(this.currentPage, name, status).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
  }
  
  handleResponse(response: CharacterResponse): void {
    this.characters = [...this.characters, ...response.results];
    this.filteredCharacters = this.characters;
    
    this.nextPageUrl = response.info.next;
    this.hasNextPage = !!this.nextPageUrl;
    this.currentPage++;
    this.isLoading = false;
    
    console.log(`Loaded batch of ${response.results.length} characters`);
    console.log(`Total characters now: ${this.characters.length}`);
    console.log(`Next page URL: ${this.nextPageUrl || 'None - reached end'}`);
  }
  
  handleError(error: any): void {
    console.error('Error fetching characters:', error);
    this.isLoading = false;
    
    if (error.status === 404) {
      this.characters = [];
      this.filteredCharacters = [];
      this.hasNextPage = false;
    }
  }
  
  onScroll(): void {
    console.log('Scroll event detected! Loading more characters...');
    this.loadCharacters();
  }
  
  resetAndReload(): void {
    this.characters = [];
    this.filteredCharacters = [];
    this.currentPage = 1;
    this.nextPageUrl = null;
    this.hasNextPage = true;
    this.loadCharacters();
  }
  
  toggleView(view: string): void {
    this.viewMode = view;
  }
  
  getColumnWidth(column: string): string {
    switch (column) {
      case 'id': return '5%';
      case 'image': return '10%';
      case 'name': return '20%';
      case 'status': return '10%';
      case 'species': return '15%';
      case 'type': return '20%';
      case 'gender': return '10%';
      case 'actions': return '10%';
      default: return 'auto';
    }
  }
  
  @HostListener('window:resize')
  calculateColumns(): number {
    const width = window.innerWidth;
    if (width < 600) return 1;
    if (width < 960) return 2;
    if (width < 1280) return 3;
    return 4;
  }
}