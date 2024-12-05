import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { SendFormComponent } from './layouts/send-form/send-form.component';
import { SendDocumentsComponent } from './layouts/send-documents/send-documents.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { SobreComponent } from './layouts/sobre/sobre.component';
import { ContatosComponent } from './layouts/contatos/contatos.component';
import { TabelaSolicitantesComponent } from './components/tabela-solicitantes/tabela-solicitantes.component';
import { DocumentosSolicitantesComponent } from './layouts/documentos-solicitantes/documentos-solicitantes.component';
import { SendForm2Component } from './layouts/send-form2/send-form2.component';
import { StatusCardComponent } from './components/status-protocol/status-protocol.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent},
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'send-form', component: SendFormComponent },
  { path: 'send-form2', component: SendForm2Component },
  { path: 'send-document', component: SendDocumentsComponent },
  { path: 'contatos', component: ContatosComponent }, 
  { path: 'sobre', component: SobreComponent }, 
  { path: 'tabela-solicitantes', component: TabelaSolicitantesComponent},
  { path: 'documento-solicitantes', component: DocumentosSolicitantesComponent},
  { path: 'contatos', component: ContatosComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'status', component: StatusCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
