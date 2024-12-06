import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { RegisterService } from '../../services/register/register.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../auth/usuario';

interface JwtCustomPayload {
  id: string; // Ou o tipo correspondente
  sub: string; // Ou outros campos que você espera
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MdbCollapseModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user: any;
  userLogged: boolean = false;

  constructor(public userService: RegisterService) { }
  userCurrent: Usuario | any = null;
  ngOnInit(): void {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      // Use a interface personalizada ao decodificar o token
      const decodedToken = jwtDecode<JwtCustomPayload>(storedUser);

      var id = Number(decodedToken.id);
      console.log(id);
      this.findUser(id).subscribe({
        next: (user) => {
          this.userCurrent = user;
          console.log('Usuário encontrado:', this.userCurrent.name);
          this.user = this.userCurrent.name
        }
      })

      this.userLogged = true;
      console.log(this.userLogged);
    }
  }

  findUser(id: number): Observable<Usuario[]> {
    var user = this.userService.findUserById(id);
    console.log(user)
    return user;
  }
}
