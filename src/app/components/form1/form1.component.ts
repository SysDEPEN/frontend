import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { IBGECityResponse, IBGEUFResponse } from '../../models/IBGEUF';
import { IBGEService } from '../../services/bge.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'], // Correção: styleUrls no plural
})
export class formComponent implements OnInit {
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
        this.listAllCities(this.selectedUF)
        console.log(ufList); // Para depuração
      },
      error: (err) => console.error('Erro ao listar UFs:', err), // Tratamento de erro
    });
  }

  listAllCities(sigla: string | null): void {
    this.ibgeService.listAllCities(sigla).subscribe({
      next: (cityList) => {
        this.cities = cityList;
        console.log(cityList);
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