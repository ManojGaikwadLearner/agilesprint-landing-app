import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
// import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('LandingComponent (Vitest)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [
        // provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });

  it('should instantiate the component in zoneless mode', () => {
    const fixture = TestBed.createComponent(LandingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should update signal state when event replay handler is invoked', () => {
    const fixture = TestBed.createComponent(LandingComponent);
    const component = fixture.componentInstance;
    
    expect(component.replayLog()).toBeNull();
    component.handlePreHydrationClick();
    expect(component.replayLog()).toContain('[Event Replay Logged]');
  });
});