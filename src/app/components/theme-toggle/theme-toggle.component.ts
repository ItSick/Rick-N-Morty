import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './theme-toggle.component.html',
  styles: [`
    .theme-toggle-button {
      color: white;
      margin-left: 8px;
      transition: transform 0.3s ease;
    }
    
    .theme-toggle-button:hover {
      transform: rotate(30deg);
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: 'light' | 'dark' = 'light';
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.currentTheme = this.themeService.theme();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const bodyClasses = document.body.className;
          this.currentTheme = bodyClasses.includes('dark-theme') ? 'dark' : 'light';
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
  }
  
  toggleTheme() {
    console.log('Toggle button clicked, current theme:', this.currentTheme);
    this.themeService.toggleTheme();
    
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
}