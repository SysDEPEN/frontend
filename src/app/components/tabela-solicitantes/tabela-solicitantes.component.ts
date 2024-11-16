import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-tabela-solicitantes',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './tabela-solicitantes.component.html',
  styleUrl: './tabela-solicitantes.component.scss'
})
export class TabelaSolicitantesComponent {

}
