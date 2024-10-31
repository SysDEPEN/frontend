import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { IBGECityResponse, IBGEUFResponse } from '../../models/IBGEUF';
import { IBGEService } from '../../services/bge.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'component-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  providers: [provideNgxMask({})]
})
export class formComponent implements OnInit {
  sendForm: FormGroup;

  UF: IBGEUFResponse[] = []; // Lista das UFs
  selectedUF: string | null = null; // Cidade selecionada
  currentUf!: IBGEUFResponse;

  cities: IBGECityResponse[] = []; // Lista de Cidades
  selectedCity: string | null = null;

  typeVisit: any = [{ label: "Parentes", value: "Parentes" },
  { label: "Amigos", value: "Amigos" },
  { label: "Visita da igreja", value: "Visita da igreja" },]

  reqOptions = [
    { label: "Visita social", value: "Visita social" },
    { label: "Visita assistida", value: "Visita assistida" },
    { label: "Visita intima", value: "Visita intima" },
  ];

  selectedTypeVisit!: string;
  selectReqOptions!: string;

  telefoneValue: string = '';

  document: string = '';
  documentType: 'RNE' | 'RG' = 'RG';

  constructor(private ibgeService: IBGEService) {
    this.sendForm = new FormGroup({
      name: new FormControl('', Validators.required),
      document: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      typeVisit: new FormControl('', Validators.required),

    })
  }

  ngOnInit(): void {
    this.listAllUFS();
  }

  listAllUFS(): void {
    this.ibgeService.listAllUFs().subscribe({
      next: (ufList) => {
        this.UF = ufList;
        this.listAllCities(this.selectedUF)

      },
      error: (err) => console.error('Erro ao listar UFs:', err),
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

  submitForm(): void {

  }
}
