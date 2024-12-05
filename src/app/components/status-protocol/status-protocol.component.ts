// status-card.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Protocol, ProtocolService } from '../../services/protocol/status.service';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-protocol.component.html',
  styleUrls: ['./status-protocol.component.scss'],
})
export class StatusCardComponent implements OnInit {
  @Input() protocolId!: number; // ID do protocolo passado como entrada
  protocol?: Protocol;

  statuses = [
    { step: 1, label: 'Envio de documentos', completed: false },
    { step: 2, label: 'Análise', completed: false },
    { step: 3, label: 'Emissão', completed: false },
  ];

  constructor(private protocolService: ProtocolService) {}

  ngOnInit(): void {
    if (this.protocolId) {
      this.protocolService.getProtocolById(this.protocolId).subscribe(
        (data) => {
          this.protocol = data;
          this.updateStatuses();
        },
        (error) => {
          console.error('Erro ao buscar protocolo:', error);
        }
      );
    }
  }

  updateStatuses() {
    if (this.protocol?.status) {
      const statusIndex = this.statuses.findIndex(
        (s) => s.label.toLowerCase() === this.protocol?.status.toLowerCase()
      );
      this.statuses.forEach((step, index) => {
        step.completed = index <= statusIndex;
      });
    }
  }
}
