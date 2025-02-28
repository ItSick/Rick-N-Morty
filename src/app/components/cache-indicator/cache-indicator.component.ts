import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cache-indicator',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatSnackBarModule],
  template: `
    <div class="cache-indicator" *ngIf="showIndicator" [ngClass]="{'cache-hit': isHit}">
      <mat-icon 
        [matTooltip]="isHit ? 'Loaded from cache' : 'Loaded from API'"
        matTooltipPosition="left">
        {{ isHit ? 'cached' : 'cloud_download' }}
      </mat-icon>
    </div>
  `,
  styles: [`
    .cache-indicator {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: rgba(33, 150, 243, 0.8);
      color: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.cache-hit {
        background-color: rgba(76, 175, 80, 0.8);
      }
      
      &:hover {
        transform: scale(1.1);
      }
    }
  `]
})
export class CacheIndicatorComponent implements OnInit {
  showIndicator = false;
  isHit = false;
  private hideTimeout: any;
  
  constructor(
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {}
  
  showCacheHit(): void {
    this.showCacheIndicator(true);
  }
  
  showCacheMiss(): void {
    this.showCacheIndicator(false);
  }
  
  private showCacheIndicator(isHit: boolean): void {
    // Clear any existing timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    
    // Show the indicator
    this.isHit = isHit;
    this.showIndicator = true;
    
    // Show snackbar message
    this.snackBar.open(
      isHit ? 'Data loaded from cache' : 'Data loaded from API', 
      'Dismiss', 
      { duration: 2000 }
    );
    
    // Hide the indicator after a delay
    this.hideTimeout = setTimeout(() => {
      this.showIndicator = false;
    }, 3000);
  }
}