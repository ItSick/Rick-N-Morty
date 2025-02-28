import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<Theme>(this.getInitialTheme());

  public theme = this.themeSignal.asReadonly();

  constructor() {
    this.applyTheme(this.themeSignal());
    
    effect(() => {
      const currentTheme = this.themeSignal();
      this.applyTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);
      console.log(`Theme changed to ${currentTheme}`);
    });
  }

  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

 
  toggleTheme(): void {
    console.log('Toggle theme called, current theme:', this.themeSignal());
    const newTheme: Theme = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.themeSignal.set(newTheme);
  }


  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    
    console.log(`Applied theme: ${theme}, body classes:`, document.body.classList.toString());
  }
}