import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { SendFormComponent } from './layouts/send-form/send-form.component';
import { SendDocumentsComponent } from './layouts/send-documents/send-documents.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent},
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'send-form', component: SendFormComponent },
  { path: 'send-document', component: SendDocumentsComponent },
//  { path: 'documentos', component: DocumentosComponent }, // Crie o componente DocumentosComponent
//  { path: 'sobre', component: SobreComponent }, // Crie o componente SobreComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }