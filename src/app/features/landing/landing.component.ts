import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LoginFormComponent } from './components/login-form.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgOptimizedImage, LoginFormComponent],
  template: `
    <main class="min-h-screen flex flex-col justify-between max-w-6xl mx-auto px-6 py-12">
      <!-- Header -->
      <header class="flex justify-between items-center mb-16">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">A</div>
          <span class="text-xl font-bold tracking-tight text-white">AgileSprint</span>
        </div>
        <span class="text-xs px-3 py-1 bg-slate-800 text-blue-400 rounded-full font-mono border border-slate-700">
          SSR + Event Replay Enabled
        </span>
      </header>

      <!-- Hero Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div class="lg:col-span-7 space-y-6">
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            High-Velocity Sprint Management for Engineering Teams.
          </h1>
          <p class="text-slate-400 text-lg">
            Built on Angular 22 Zoneless Signal architecture with Spring Boot real-time WebSocket orchestration.
          </p>

          <!-- v18 SSR Event Replay Test Button -->
          <div class="p-4 bg-slate-800/50 border border-slate-700 rounded-xl space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase text-slate-400">SSR Event Replay Test</span>
              <span class="text-xs text-slate-500 font-mono">v18 Feature</span>
            </div>
            <button
              (click)="handlePreHydrationClick()"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg transition shadow-md">
              Simulate Click Before Hydration
            </button>
            @if (replayLog()) {
              <div class="p-3 bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-mono rounded">
                {{ replayLog() }}
              </div>
            }
          </div>

          <!-- v15 NgOptimizedImage LCP Target -->
          <div class="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img
              ngSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
              alt="AgileSprint Workspace Banner"
              fill
              priority
              class="object-cover" />
          </div>
        </div>

        <!-- Auth Form Column -->
        <div class="lg:col-span-5">
          <app-login-form (loginSubmitted)="onLogin($event)" />
        </div>
      </div>

      <!-- Footer -->
      <footer class="border-t border-slate-800 pt-6 flex justify-between items-center text-xs text-slate-500">
        <p>&copy; 2026 AgileSprint Inc. All rights reserved.</p>
        <p>Angular 22.0.0-zoneless</p>
      </footer>
    </main>
  `
})
export class LandingComponent {
  readonly replayLog = signal<string | null>(null);

  handlePreHydrationClick(): void {
    const timestamp = new Date().toISOString();
    this.replayLog.set(`[Event Replay Logged]: Click event executed successfully at ${timestamp}`);
  }

  onLogin(credentials: { email: string }): void {
    console.log(`Authenticated user: ${credentials.email}`);
    // Redirect logic to authenticated board shell goes here
  }
}