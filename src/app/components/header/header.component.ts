import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../auth/usuario';  // Importando a model correta

interface JwtCustomPayload {
  sub: string;  // 'sub' será o 'document' do usuário
  roles: string[] | number;
}

@Component({
  selector: 'app-header',
  standalone: true,  // Torna o HeaderComponent standalone
  imports: [],  // Certifique-se de importar módulos necessários aqui (se houver algum)
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: string | null = null;
  userLogged: boolean = false;
  isEditor: boolean = false;

  constructor(private userService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<JwtCustomPayload>(token);
      const userDocument = decodedToken.sub;  // O 'sub' do token é o 'document' do usuário
      const userRole = decodedToken.roles;

      // Busca o usuário pelo 'document' no backend
      this.findUser(userDocument).subscribe((user) => {
        this.user = user.name;
      });

      // Define o estado de login e o papel do usuário
      this.userLogged = true;
      this.isEditor = userRole === 1;  // Verifica se o usuário é editor (ajuste conforme necessário)
    }
  }

  // Função para buscar o usuário pelo 'document'
  findUser(document: string): Observable<Usuario> {
    return new Observable((observer) => {
      this.userService.findUserByDocument(document).subscribe({
        next: (users) => {
          const user = users.find(u => u.document === document);  // Encontra o usuário pelo 'document'
          if (user) {
            observer.next(user);  // Envia o usuário encontrado
            observer.complete();
          } else {
            observer.error(new Error('Usuário não encontrado'));  // Caso não encontre o usuário
          }
        },
        error: (err) => observer.error(err),  // Propaga o erro caso ocorra
      });
    });
  }

  // Função de logout
  logout(): void {
    localStorage.removeItem('token');
    this.userLogged = false;
    this.router.navigate(['/sign-in']);
  }
}
