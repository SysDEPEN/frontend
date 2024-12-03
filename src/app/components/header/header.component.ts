import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { RegisterService } from '../../services/register/register.service';

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

  constructor(public userService: RegisterService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      // Use a interface personalizada ao decodificar o token
      const decodedToken = jwtDecode<JwtCustomPayload>(storedUser);

      var id = Number(decodedToken.id);
      this.user = this.userService.findUserById(id); // Agora sem erro
      console.log(this.user);
      this.userLogged = true;
      console.log(this.userLogged);
    }
  }
}
