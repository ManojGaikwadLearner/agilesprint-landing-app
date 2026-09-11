import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// v14: Strongly Typed Reactive Form Interface
export interface AuthFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="bg-slate-800/80 border border-slate-700 p-8 rounded-2xl shadow-xl backdrop-blur-md">
      <h3 class="text-xl font-bold text-white mb-2">Sign In to AgileSprint</h3>
      <p class="text-slate-400 text-sm mb-6">Enter your credentials to access the board workspace.</p>

      <form [formGroup]="loginForm" (ngSubmit)="handleSubmit()" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Work Email</label>
          <input
            type="email"
            [formControl]="loginForm.controls.email"
            placeholder="developer@company.com"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition" />
          @if (loginForm.controls.email.touched && loginForm.controls.email.invalid) {
            <span class="text-xs text-rose-400 mt-1 block">Valid work email is required.</span>
          }
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Password</label>
          <input
            type="password"
            [formControl]="loginForm.controls.password"
            placeholder="••••••••••••"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition" />
          @if (loginForm.controls.password.touched && loginForm.controls.password.invalid) {
            <span class="text-xs text-rose-400 mt-1 block">Password must be at least 6 characters.</span>
          }
        </div>

        <div class="flex items-center justify-between text-xs">
          <label class="flex items-center space-x-2 text-slate-300 cursor-pointer">
            <input type="checkbox" [formControl]="loginForm.controls.rememberMe" class="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0" />
            <span>Remember device</span>
          </label>
        </div>

        <button
          type="submit"
          [disabled]="loginForm.invalid"
          class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition duration-150 shadow-lg shadow-blue-600/20">
          Authenticate & Continue
        </button>
      </form>
    </div>
  `
})
export class LoginFormComponent {
  @Output() loginSubmitted = new EventEmitter<{ email: string; password: string }>();

  // v14: Typed FormGroup initialization (No 'any' typing)
  readonly loginForm = new FormGroup<AuthFormControls>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    rememberMe: new FormControl(true, { nonNullable: true })
  });

  handleSubmit(): void {
    if (this.loginForm.valid) {
      const rawValues = this.loginForm.getRawValue();
      this.loginSubmitted.emit({
        email: rawValues.email,
        password: rawValues.password
      });
    }
  }
}