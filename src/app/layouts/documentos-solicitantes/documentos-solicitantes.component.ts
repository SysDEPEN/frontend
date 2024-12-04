import { Component } from '@angular/core';
import { ReqDocsService } from '../../services/documents/req_docs.service'; // Corrigir o caminho caso necessário

@Component({
  selector: 'app-documentos-solicitantes',
  standalone: true,
  imports: [],
  templateUrl: './documentos-solicitantes.component.html',
  styleUrl: './documentos-solicitantes.component.scss'
})
export class DocumentosSolicitantesComponent {

  documentoCompleto: any; // Para armazenar os dados do documento completo

  constructor(private reqDocsService: ReqDocsService) {} // Injeta o serviço corretamente

  visualizarDocumento(id: number): void {
    console.log('Documento a ser visualizado:', id);
    // Chama o método do serviço para obter o documento completo
    this.reqDocsService.getDocumentById(id).subscribe(
      (data) => {
        this.documentoCompleto = data;  // Documento completo para exibição
        // Você pode abrir um modal ou navegar para uma página de detalhes
        // Exemplo de abrir um modal
        this.openModal(data);
      },
      (error) => {
        console.error('Erro ao carregar documento completo:', error);
      }
    );
  }

  // Exemplo de método para abrir um modal
  openModal(data: any): void {
    console.log('Abrir modal com o documento:', data);
    // Código para abrir um modal com os dados do documento
  }
}
