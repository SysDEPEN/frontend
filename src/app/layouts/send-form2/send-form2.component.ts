import { Component } from '@angular/core';
import { ReqDocsService } from '../../services/documents/req_docs.service';
import { ReqDocs } from '../../models/req_docs';

@Component({
  selector: 'send-form2',
  standalone: true,
  imports: [],
  templateUrl: './send-form2.component.html',
  styleUrl: './send-form2.component.scss'
})
export class SendForm2Component {
  userId!: number;
  documentType!: string;
  selectedFiles: File[] = [];

  constructor(private uploadService: ReqDocsService) {}

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onUpload(): void {
    if (!this.userId || !this.documentType || this.selectedFiles.length === 0) {
      alert('Por favor, preencha todos os campos e selecione os arquivos.');
      return;
    }

     var file: ReqDocs = {
      userId: this.userId,
      documentType: this.documentType,
      files: this.selectedFiles
     };

    this.uploadService.save(file)
      .subscribe({
        next: (response) => {
          console.log('Upload realizado com sucesso:', response);
          alert('Arquivos enviados com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao enviar os arquivos:', error);
          alert('Erro ao enviar os arquivos.');
        }
      });
  }
}
