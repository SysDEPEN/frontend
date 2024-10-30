import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { IBGECityResponse, IBGEUFResponse } from '../../models/IBGEUF';
import { IBGEService } from '../../services/bge.service';

@Component({
  selector: 'app-send-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.scss'], // Correção: styleUrls no plural
})
export class SendFormComponent implements OnInit {
  UF: IBGEUFResponse[] = []; // Lista das UFs
  selectedUF: string | null = null; // Cidade selecionada
  currentUf!: IBGEUFResponse;

  cities: IBGECityResponse[] = []; // Lista de Cidades
  selectedCity: string | null = null;

  constructor(private ibgeService: IBGEService) {}

  ngOnInit(): void {
    this.listAllUFS();
  }

  listAllUFS(): void {
    this.ibgeService.listAllUFs().subscribe({
      next: (ufList) => {
        this.UF = ufList;
    this.listAllCities();

        console.log(ufList); // Para depuração
      },
      error: (err) => console.error('Erro ao listar UFs:', err), // Tratamento de erro
    });
  }

  listAllCities(): void {
    this.ibgeService.listAllCities(this.selectedUF!.toString()).subscribe({
      next: (cityList) => {
        this.cities = cityList;
        console.log(this.selectedUF);
      },
      error: (err) => console.log('Erro ao listar CIDADES:', err),
    });
  }

  submitForm(form: any): void {
    if (form.valid) {
      console.log('Estado selecionado:', this.selectedUF);
    } else {
      console.log('Seleção inválida.');
    }
  }
}
