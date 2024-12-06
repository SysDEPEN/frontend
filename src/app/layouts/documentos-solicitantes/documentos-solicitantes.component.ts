import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Protocols } from '../../models/protocols';
import { ProtocolsService } from '../../services/protocol.service';  // Serviço para atualizar protocolo
import { reqCamp } from '../../models/req_camps';

@Component({
  selector: 'app-documentos-solicitantes',
  templateUrl: './documentos-solicitantes.component.html',
  styleUrls: ['./documentos-solicitantes.component.scss']
})
export class DocumentosSolicitantesComponent implements OnInit {
  protocol!: Protocols;  // Protocolo a ser atualizado
  reqInfo!: reqCamp;

  constructor(
    private router: Router,
    private protocolsService: ProtocolsService  // Serviço para atualizar protocolo
  ) {}

  ngOnInit(): void {
    const navigationState = history.state; // Captura o estado da navegação
    console.log('Estado recebido:', navigationState); // Log para debug

    if (navigationState && navigationState['protocol']) {
      this.protocol = navigationState['protocol']; // Atribui o protocolo recebido
      console.log(this.protocol.req_info);
      this.reqInfo = this.protocol.req_info;
      console.log(this.reqInfo)
    } else {
      console.error('Nenhum protocolo recebido.');
      this.router.navigate(['/tabela-solicitantes']); // Redireciona caso não haja protocolo
    }
  }

  // Método para aceitar o protocolo (alterando o status para 1)
  aceitarProtocolo(): void {
    if (this.protocol) {
      this.protocol.status = 1;  // Mudando o status para "aprovado"
      this.salvarStatusNoBanco(this.protocol);
    }
  }

  // Método para rejeitar o protocolo (alterando o status para 2)
  rejeitarProtocolo(): void {
    if (this.protocol) {
      this.protocol.status = 2;  // Mudando o status para "recusado"
      this.salvarStatusNoBanco(this.protocol);
    }
  }

  // Função para salvar as alterações no banco
  salvarStatusNoBanco(protocol: Protocols): void {
    this.protocolsService.update(protocol).subscribe(
      (updatedProtocol) => {
        console.log('Protocolo atualizado:', updatedProtocol);
        // Redirecionar ou mostrar mensagem de sucesso se necessário
        this.router.navigate(['/tabela-solicitantes']);
      },
      (error) => {
        console.error('Erro ao atualizar o protocolo:', error);
        // Mostrar mensagem de erro ao usuário
      }
    );
  }
}
