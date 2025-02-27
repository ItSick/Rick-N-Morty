import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  @Output() scrolled = new EventEmitter<void>();

  private observer: IntersectionObserver | undefined;
  private scrollThreshold = 200; // pixels from the bottom of the page to trigger load
  private scrollCooldown = false;
  private cooldownTime = 1000; // ms to wait between scroll events

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      this.setupScrollListener();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      rootMargin: '0px 0px 200px 0px' // Trigger when element is 200px from viewport bottom
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.scrollCooldown) {
          console.log('Scroll threshold reached via IntersectionObserver');
          this.triggerScrollEvent();
        }
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  private setupScrollListener() {
    // Fallback for browsers without IntersectionObserver
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  private onWindowScroll() {
    if (this.scrollCooldown) return;

    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Load more when user is near bottom of page
    if (documentHeight - (scrollTop + windowHeight) <= this.scrollThreshold) {
      console.log('Scroll threshold reached via scroll event');
      this.triggerScrollEvent();
    }
  }

  private triggerScrollEvent() {
    this.scrolled.emit();
    this.scrollCooldown = true;
    
    // Prevent rapid firing of scroll events
    setTimeout(() => {
      this.scrollCooldown = false;
    }, this.cooldownTime);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    } else {
      window.removeEventListener('scroll', this.onWindowScroll);
    }
  }
}