import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ReqDocsService } from '../../services/documents/req_docs.service';

@Component({
  selector: 'app-tabela-solicitantes',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './tabela-solicitantes.component.html',
  styleUrls: ['./tabela-solicitantes.component.scss'],
})
export class TabelaSolicitantesComponent implements OnInit {
  documentos: any[] = []; // Array para armazenar os documentos

  constructor(private documentsService: ReqDocsService) {}

  ngOnInit(): void {
    console.log('Componente TabelaSolicitantes carregado');
    this.fetchDocuments();
  }

  // Método para buscar documentos do backend
  fetchDocuments(): void {
    console.log('Buscando documentos do backend...');
    this.documentsService.getDocuments().subscribe(
      (data) => {
        console.log('Resposta do backend:', data);  // Exibe os dados completos recebidos do backend

        // Se os dados forem um array, exibe todas as informações dos documentos
        if (Array.isArray(data)) {
          console.log('Documentos recebidos (array):', data);
          
          // Exibe detalhes completos de cada documento
          data.forEach((doc, index) => {
            console.log(`Documento ${index + 1}:`, doc);
          });

          this.documentos = data.map(doc => ({
            nome: doc.nome,
            numeroProtocolo: doc.numeroProtocolo,
            dataEnvio: doc.dataEnvio,
            id: doc.id,  // ID para poder visualizar depois
          }));
          
          console.log('Documentos mapeados:', this.documentos);  // Exibe os documentos mapeados
        } else {
          console.warn('Os dados recebidos não são um array:', data);
        }
      },
      (error) => {
        console.error('Erro ao buscar documentos:', error);
      }
    );
  }

  // Método para visualizar o documento
  visualizarDocumento(id: number): void {
    console.log('ID do documento a ser visualizado:', id);
    // Chama o método do serviço para obter o documento completo, ou navegue para outra página
    this.documentsService.getDocumentById(id).subscribe(
      (data) => {
        console.log('Documento completo recebido:', data); // Exemplo de exibir o documento completo
        // Você pode abrir um modal ou navegar para uma página de detalhes
        this.openModal(data);  // Chama o método para abrir o modal (ou outra lógica)
      },
      (error) => {
        console.error('Erro ao carregar o documento completo:', error);
      }
    );
  }

  // Exemplo de método para abrir um modal (ou outra ação)
  openModal(documento: any): void {
    console.log('Abrir modal com o documento:', documento);
    // Aqui você pode implementar a lógica para abrir um modal ou navegar para outra página
  }
}
