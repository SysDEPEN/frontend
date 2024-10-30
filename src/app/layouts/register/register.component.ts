import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { RegisterService } from '../../services/register/register.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  router = inject(Router);


  constructor(public register: RegisterService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      document: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { name, document, email, password } = this.registerForm.value;
      this.register.handleRegister(name, document, email, password).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro realizado com sucesso',
            icon: 'success',
            confirmButtonText: 'Seguir para o Login'
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Erro',
            text: 'Falha ao realizar cadastro',
            icon: 'error',
            confirmButtonText: 'Tente novamente'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Formulário inválido',
        text: 'Por favor, preencha todos os campos corretamente.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
}
