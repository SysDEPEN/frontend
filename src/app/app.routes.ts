import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { SendFormComponent } from './layouts/send-form/send-form.component';
import { SendDocumentsComponent } from './layouts/send-documents/send-documents.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  {
    path: 'sign-in',
    component: LoginComponent,
    children: [
      {
        path: 'sign-up', component: RegisterComponent
      },
      { path: 'send-form', component: SendFormComponent },
      { path: 'send-documents', component: SendDocumentsComponent },
    ]
  }
];
