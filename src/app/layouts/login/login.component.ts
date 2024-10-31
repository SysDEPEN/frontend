import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
 document: string = '';
 password: string = '';

 router = inject(Router);

 constructor(public login: LoginService) {}

  onLogin() {
    this.login.handleLogin(this.document, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('jwtToken', response.Token)
        console.log('Login bem-sucedido!')
        this.router.navigate(['home/']);
      },
      error: (error) => {
        console.error('Erro ao fazer login', error);
      }
    });

  }
}
