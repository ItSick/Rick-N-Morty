import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Rick&Morty Characters' 
  },
  { 
    path: 'character/:id', 
    component: CharacterDetailsComponent,
    title: 'Rick&Morty Character Details'
  },
  {
    path: 'episodes',
    component: EpisodesComponent,
    title: 'Rick&MortyEpisodes'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];