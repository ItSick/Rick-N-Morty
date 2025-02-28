import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheIndicatorComponent } from './cache-indicator.component';

describe('CacheIndicatorComponent', () => {
  let component: CacheIndicatorComponent;
  let fixture: ComponentFixture<CacheIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacheIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacheIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
