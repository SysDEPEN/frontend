import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);

  logar() {
    console.log(this.login.document + ' ' + this.login.password)
    if(this.login.document == 'admin' && this.login.password == 'admin') {
      this.router.navigate(['home/candidato']);
    } else {
      alert('usuário incorreto');
    }
  }
}
