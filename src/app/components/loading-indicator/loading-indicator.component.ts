import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-container">
      <mat-spinner diameter="40"></mat-spinner>
      <div *ngIf="message" class="loading-message">{{message}}</div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      margin: 10px 0;
    }
    
    .loading-message {
      margin-top: 10px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }
  `]
})
export class LoadingIndicatorComponent {
  @Input() message: string = '';
}