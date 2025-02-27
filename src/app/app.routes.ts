import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Rick and Morty Explorer - Characters' 
  },
  { 
    path: 'character/:id', 
    component: CharacterDetailsComponent,
    title: 'Character Details'
  },
  {
    path: 'episodes',
    component: EpisodesComponent,
    title: 'Rick and Morty Episodes'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];