import { Component, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

type RegisterUserData = {
  email: string;
  password: string;
  username: string;
}

type LoginUserData = Omit<RegisterUserData, 'email'>

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule] 
})
export class LoginComponent {
  // Login form variables
  authForm: UntypedFormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email])
  })

  loginFailed: boolean = false;

  registrationFailed: boolean = false;

  isRegistering = signal(false);

  private readonly usersKey = 'users'; // Key to store users in local storage

  constructor(private router: Router) {
    effect(() => {
      if(!this.isRegistering()) {
        this.authForm.removeControl("email")
      } else {
          this.authForm.addControl("email", new FormControl("", [Validators.required, Validators.email]))
      }
    })
  }

  // Toggle between login and registration forms
  toggleForm() {
    this.isRegistering.set(!this.isRegistering());
    this.loginFailed = false;
    this.registrationFailed = false;
  }

  onSubmit() {
    const {username, email, password} = this.authForm.value
    if(this.isRegistering()) {
      this.onRegisterSubmit({
        username,
        email,
        password
      })
    } else {
      this.onLoginSubmit({
        username,
        password
      })
    }
  }

  // Handle login form submission
  private onLoginSubmit({ username, password }: LoginUserData) {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    console.log(username, password, user, users)
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

  // Handle registration form submission
  private onRegisterSubmit({username, email, password}: RegisterUserData) {
    const users = this.getUsers();
    const userExists = users.some(u => u.username === username);

    if (userExists) {
      console.log('User already exists');
      this.registrationFailed = true;
    } else if (username && password) {
      users.push({ username, password });
      this.setUsers(users);
      console.log('Registration successful');
      this.authForm.reset();
      this.isRegistering.set(false); // Switch back to login view after successful registration
      this.registrationFailed = false;
    } else {
      console.log('Registration failed');
      this.registrationFailed = true;
    }
  }

  // Helper function to get users from local storage
  private getUsers(): any[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  // Helper function to set users in local storage
  private setUsers(users: any[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
