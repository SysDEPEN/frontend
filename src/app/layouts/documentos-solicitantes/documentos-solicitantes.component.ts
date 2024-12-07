import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Protocols } from '../../models/protocols';
import { ProtocolsService } from '../../services/protocol.service';  // Serviço para atualizar protocolo
import { reqCamp } from '../../models/req_camps';
import Swal from 'sweetalert2';

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
    console.log('ngOnInit chamado.');
    const navigationState = history.state; // Captura o estado da navegação
    console.log('Estado recebido:', navigationState); // Log para debug

    if (navigationState && navigationState['protocol']) {
      this.protocol = navigationState['protocol']; // Atribui o protocolo recebido
      console.log('Protocolo recebido:', this.protocol);
      console.log('Informações de requisição:', this.protocol.req_info);
      this.reqInfo = this.protocol.req_info;
    } else {
      console.error('Nenhum protocolo recebido.');
      this.router.navigate(['/tabela-solicitantes']); // Redireciona caso não haja protocolo
    }
  }

  // Método para aceitar o protocolo (alterando o status para 1)
  aceitarProtocolo(): void {
    console.log('Método aceitarProtocolo chamado.');
    if (this.protocol) {
      this.protocol.status = 1;  // Mudando o status para "aprovado"
      console.log('Status do protocolo atualizado para 1 (Aprovado).');
      this.salvarStatusNoBanco(this.protocol);
    } else {
      console.error('Protocolo não definido no método aceitarProtocolo.');
    }
  }

  // Método para rejeitar o protocolo (alterando o status para 2)
  rejeitarProtocolo(): void {
    console.log('Método rejeitarProtocolo chamado.');
    if (this.protocol) {
      this.protocol.status = 2;  // Mudando o status para "recusado"
      console.log('Status do protocolo atualizado para 2 (Recusado).');
      this.salvarStatusNoBanco(this.protocol);
    } else {
      console.error('Protocolo não definido no método rejeitarProtocolo.');
    }
  }

  // Função para salvar as alterações no banco
  salvarStatusNoBanco(protocol: Protocols): void {
    console.log('Método salvarStatusNoBanco chamado.');
    console.log('Protocolo a ser salvo:', protocol);
    var id = protocol.id;
    this.protocolsService.update(protocol, id).subscribe(
      (updatedProtocol) => {
        console.log('Protocolo atualizado no banco:', updatedProtocol);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Status atualizado com sucesso',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/tabela-solicitantes']);
      },
      (error) => {
        console.error('Erro ao atualizar o protocolo:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao atualizar status do protocolo',
          icon: 'error',
          confirmButtonText: 'Seguir para o Login',
        });
        // Mostrar mensagem de erro ao usuário
      }
    );
  }
}
