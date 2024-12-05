import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  // Emitir o valor da pesquisa para o componente pai
  onSearchChange(value: string): void {
    this.search.emit(value);
  }
}
