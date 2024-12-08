import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../auth/usuario';
import { jwtDecode } from 'jwt-decode'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: any;
  userLogged: boolean = false;
  userCurrent: Usuario | null = null;

  constructor(public userService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      const decodedToken = jwtDecode<any>(storedUser);
      const id = Number(decodedToken.id);
      this.findUser(id).subscribe((user) => {
        this.userCurrent = user;
        this.user = user.name;
      });
      this.userLogged = true;
    }
  }

  // Usando a nova função para buscar um único usuário
  findUser(id: number): Observable<Usuario> {
    return this.userService.findSingleUserById(id); 
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.userLogged = false;
    this.user = null;
    this.router.navigate(['/sign-in']);
  }
}
