import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MdbCollapseModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user:any
  userLogged: boolean = false;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('jwtToken');
    if (storedUser) {
        const decodedToken = jwtDecode(storedUser)
        this.user = decodedToken.sub;
        console.log(this.user)
        this.userLogged= true;
        console.log(this.userLogged)
    }
  }
}
