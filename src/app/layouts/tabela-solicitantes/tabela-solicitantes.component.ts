import { Component, OnInit } from '@angular/core';
import { ProtocolsService } from '../../services/protocol.service';
import { Protocols } from '../../models/protocols';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela-solicitantes',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './tabela-solicitantes.component.html',
  styleUrls: ['./tabela-solicitantes.component.scss'],
})
export class TabelaSolicitantesComponent implements OnInit {
  protocols: Protocols[] = [];

  constructor(private protocolsService: ProtocolsService) {}

  ngOnInit(): void {
    this.loadProtocols();
  }

  loadProtocols(): void {
    this.protocolsService.findAll().subscribe(
      (data) => {
        console.log('Data recebida do serviço:', data);
        this.protocols = data;
      },
      (error) => {
        console.error('Erro ao carregar protocolos:', error);
      }
    );
  }

  handleProtocol(status: number): void {
    console.log('Protocolo com status:', status);
  }


  formatDate(dateString: string): string {
    console.log('Data recebida para formatação:', dateString); // Log para ver a data recebida
    
    if (!dateString) {
      console.log('Data não recebida ou inválida'); // Log quando a data não for válida
      return 'Data inválida';
    }
  
    // Tenta corrigir possíveis problemas de fuso horário ou formatação
    dateString = dateString.trim();
    console.log('Data após trim:', dateString); // Log após remover espaços desnecessários
  
    if (!dateString.includes('T')) {
      dateString += 'T00:00:00'; // Se não houver 'T', adiciona a hora padrão
      console.log('Data ajustada para formato ISO:', dateString); // Log para verificar a data ajustada
    }
  
    const date = new Date(dateString);
    console.log('Objeto Date após conversão:', date); // Log para ver o objeto Date
  
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      console.log('Data inválida após conversão'); // Log se a data for inválida
      return 'Data inválida';
    }
  
    // Extraímos o dia, mês e ano
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    console.log(`Data formatada: ${day}/${month}/${year}`); // Log para ver o resultado final
  
    // Retorna a data no formato desejado: dd/MM/yyyy
    return `${day}/${month}/${year}`;
  }
  
}
