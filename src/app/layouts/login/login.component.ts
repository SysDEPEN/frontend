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
    var login = {
      document: this.document,
      password: this.password
    }
    this.login.handleLogin(login).subscribe({
      next: (response) => {
        localStorage.setItem('jwtToken', response.Token)
        console.log('Login bem-sucedido!')
        this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
      },
      error: (error) => {
        console.error('Erro ao fazer login', error);
      }
    });

  }
}
