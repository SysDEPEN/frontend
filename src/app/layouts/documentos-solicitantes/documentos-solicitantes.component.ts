import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentos-solicitantes',
  standalone: true,
  templateUrl: './documentos-solicitantes.component.html',
  styleUrls: ['./documentos-solicitantes.component.scss'],
})
export class DocumentosSolicitantesComponent implements OnInit {
  protocol: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.protocol = history.state.protocol;
    if (!this.protocol) {
      console.error('Nenhum protocolo foi passado.');
      this.router.navigate(['/tabela-solicitantes']); // Redireciona para a tabela se não houver protocolo
    }
  }
}
