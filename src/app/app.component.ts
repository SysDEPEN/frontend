import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';  // Importando HeaderComponent standalone
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';  // Importando FooterComponent standalone

@Component({
  selector: 'app-root',
  standalone: true,  // Torna o AppComponent standalone
  imports: [RouterOutlet, HeaderComponent, FormsModule, FooterComponent],  // Importa os componentes necessários
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
}
