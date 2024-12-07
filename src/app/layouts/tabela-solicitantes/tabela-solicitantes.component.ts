import { Component, OnInit } from '@angular/core';
import { ProtocolsService } from '../../services/protocol.service';
import { Protocols } from '../../models/protocols';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-tabela-solicitantes',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './tabela-solicitantes.component.html',
  styleUrls: ['./tabela-solicitantes.component.scss'],
})
export class TabelaSolicitantesComponent implements OnInit {
  protocols: Protocols[] = [];
  filteredProtocols: Protocols[] = []; // Protocolos filtrados

  constructor(private protocolsService: ProtocolsService, private router: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit chamado: iniciando carregamento de protocolos.');
    this.loadProtocols();
  }

  loadProtocols(): void {
    console.log('Método loadProtocols chamado: buscando protocolos no serviço.');
    this.protocolsService.findAll().subscribe(
      (data) => {
        console.log('Protocolos carregados com sucesso:', data);
        // Filtra apenas os protocolos com status === 0
        this.protocols = data.filter(protocol => protocol.status === 0);
        this.filteredProtocols = this.protocols;
        console.log('Protocolos com status 0:', this.filteredProtocols);
      },
      (error) => {
        console.error('Erro ao carregar protocolos:', error);
      }
    );
  }

  handleProtocol(protocol: Protocols): void {
    console.log('Método handleProtocol chamado. Protocolo selecionado:', protocol);
    this.router.navigate(['/documento-solicitantes'], { state: { protocol } });
  }

  formatDate(dateString: string): string {
    console.log('Método formatDate chamado com dateString:', dateString);
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Data inválida recebida:', dateString);
      return 'Data inválida';
    }
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    console.log('Data formatada:', formattedDate);
    return formattedDate;
  }

  // Função chamada quando a barra de pesquisa for usada
  onSearch(searchTerm: string): void {
    console.log('Método onSearch chamado. Termo de pesquisa:', searchTerm);
    this.filteredProtocols = this.protocols.filter(protocol =>
      protocol.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (protocol.id !== undefined && protocol.id.toString().includes(searchTerm)) // Filtra pelo nome ou número do protocolo
    );
    console.log('Protocolos filtrados:', this.filteredProtocols);
  }
}
