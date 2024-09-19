import { Component, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, UntypedFormGroup } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import passwordValidator from '../../validators/password.validator';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

type RegisterUserData = {
  email: string;
  password: string;
  username: string;
};

type LoginUserData = Omit<RegisterUserData, 'email'>;

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule] 
})
export class LoginComponent {
  authService(authService: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  authForm: UntypedFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, passwordValidator]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  loginFailed: boolean = false;
  registrationFailed: boolean = false;
  isRegistering = signal(false);

  private readonly usersKey = 'users';

  constructor(private router: Router, private translationService: TranslationService) {
    effect(() => {
      if (this.isRegistering()) {
        this.authForm.addControl('email', new FormControl('', [Validators.required, Validators.email]));
      } else {
        this.authForm.removeControl('email');
      }
    });

    this.authForm.valueChanges.subscribe(() => {
      console.log(this.authForm.get('password'), 'password_control');
    });
  }

  toggleForm() {
    this.isRegistering.set(!this.isRegistering());
    this.loginFailed = false;
    this.registrationFailed = false;
  }

  onSubmit() {
    const { username, email, password } = this.authForm.value;

    if (this.authForm.invalid) {
      console.log(this.authForm.errors, 'Form has errors');
      return;
    }

    if (this.isRegistering()) {
      this.onRegisterSubmit({ username, email, password });
    } else {
      this.onLoginSubmit({ username, password });
    }
  }

  private onLoginSubmit({ username, password }: LoginUserData) {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      console.log('Login successful');
      localStorage.setItem('isLoggedIn', '1');
      this.router.navigate(['/']);
      this.loginFailed = false;
    } else {
      console.log('Invalid credentials');
      localStorage.removeItem('isLoggedIn');
      this.loginFailed = true;
    }
  }

  private onRegisterSubmit({ username, email, password }: RegisterUserData) {
    const users = this.getUsers();
    const userExists = users.some(u => u.username === username);

    if (userExists) {
      console.log('User already exists');
      this.registrationFailed = true;
    } else {
      users.push({ username, password });
      this.setUsers(users);
      console.log('Registration successful');
      this.authForm.reset();
      this.isRegistering.set(false);
      this.registrationFailed = false;
    }
  }

  private getUsers(): any[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  private setUsers(users: any[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  switchLanguage(lang: 'en' | 'sw') {
    this.translationService.switchTo(lang);
  }
}
