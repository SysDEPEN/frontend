import { Component, OnInit, Input } from '@angular/core';
import { ProtocolsService } from '../../services/protocol.service';
import { Protocols } from '../../models/protocols';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-protocol.component.html',
  styleUrls: ['./status-protocol.component.scss'],
})
export class StatusCardComponent implements OnInit {
  @Input() protocolId!: string;

  statuses = [
    { step: 1, label: 'Envio de documentos', completed: false },
    { step: 2, label: 'Análise', completed: false },
    { step: 3, label: 'Emissão', completed: false },
  ];

  protocol?: Protocols;

  constructor(private protocolService: ProtocolsService) {}

  ngOnInit(): void {
    if (this.protocolId) {
      this.loadProtocol();
    }
  }

  private loadProtocol(): void {
    this.protocolService.findByUserEmail(this.protocolId).subscribe(
      (protocols) => {
        if (protocols && protocols.length > 0) {
          this.protocol = protocols[0];
          this.updateStatuses();
        } else {
          console.warn('Nenhum protocolo encontrado para o ID fornecido.');
        }
      },
      (error) => {
        console.error('Erro ao buscar protocolo:', error);
      }
    );
  }

  private updateStatuses(): void {
    if (typeof this.protocol?.status === 'number') {
      // Status é numérico, comparado com o step
      this.statuses.forEach((step) => {
        step.completed = step.step <= this.protocol!.status;
      });
    } else {
      console.warn('Tipo de status inesperado:', this.protocol?.status);
    }
  }
  
  
}
