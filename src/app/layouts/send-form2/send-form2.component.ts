import { Component } from '@angular/core';
import { ReqDocsService } from '../../services/documents/req_docs.service';
import { ReqDocs } from '../../models/req_docs';
import { ProtocolsService } from '../../services/protocol.service';
import { Protocols } from '../../models/protocols';
import { Register } from '../../models/register';
import { RegisterService } from '../../services/register/register.service';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Usuario } from '../../auth/usuario';
import { reqCamp } from '../../models/req_camps';
import { ReqCampService } from '../../services/req_camp.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


interface JwtCustomPayload {
  id: string; // Ou o tipo correspondente
  sub: string; // Ou outros campos que você espera
}


@Component({
  selector: 'send-form2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './send-form2.component.html',
  styleUrl: './send-form2.component.scss'
})
export class SendForm2Component {
  userId!: number;
  documentType!: string;
  selectedFiles: File[] = [];
  req: number = 0;
  form: FormGroup;

  constructor(
    private protocolService: ProtocolsService,
    private userService: RegisterService,
    private reqService: ReqCampService) {
    this.form = new FormGroup({})
  }

  ngOnInit() {
    this.req = history.state.data;
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }


  findUser(id: number): Observable<Usuario[]> {
    var user = this.userService.findUserById(id);
    console.log(user)
    return user;
  }

  findReq(id: any): Observable<reqCamp[]> {
    var reqCamp = this.reqService.findReqById(id);
    return reqCamp;
  }


  handleRegisterProtocols() {
    let userCurrent: Usuario | any = null;
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      // Decodifica o token
      const decodedToken = jwtDecode<JwtCustomPayload>(storedUser);
      const id = Number(decodedToken.id);

      // Busca o usuário pelo ID
      this.findUser(id).subscribe({
        next: (user) => {
          userCurrent = user; // Aqui você obtém o valor emitido pelo Observable
          console.log('Usuário encontrado:', user);

          const protocol: Protocols = {
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user: {
              id: userCurrent.id
            },
            admin: null,
            doc: null,
            reqInfo: {
              id: this.req
            },
            status: 0
          };

          // Salva o protocolo
          this.protocolService.save(protocol).subscribe({
            next: (response) => {
              console.log('Cadastrado com sucesso:', response);
              alert('Cadastrado com sucesso!');
            },
            error: (error) => {
              console.error('Erro ao cadastrar o protocolo:', error);
              Swal.fire({
                title: 'Erro',
                text: 'Falha ao realizar o formulário: ',
                icon: 'error',
                confirmButtonText: 'Tente novamente',
              });
            }
          });
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
          alert('Erro ao buscar usuário');
        }
      });
    }
  }

}
