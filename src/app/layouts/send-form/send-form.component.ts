import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { IBGEService } from '../../services/bge.service';
import { IBGEUFResponse } from '../../models/IBGEUF';

@Component({
  selector: 'app-send-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './send-form.component.html',
  styleUrl: './send-form.component.scss'
})
export class SendFormComponent {
  ibgeService = inject(IBGEService);
  constructor() {
  //  console.log(this.ibgeService.listAllUFs())
  }
  cities: IBGEUFResponse[]= [];
  selectedCity: string | null = null;


  listAllUFS() {
    this.ibgeService.listAllUFs().subscribe({
      next: UF => {
        console.log(UF)
        this.cities = UF
      }
     }
    );
  }

  submitForm(form: any) {
    if (form.valid) {
      console.log('Cidade selecionada:', this.selectedCity);
    } else {
      console.log('Seleção inválida.');
    }
  }

}
