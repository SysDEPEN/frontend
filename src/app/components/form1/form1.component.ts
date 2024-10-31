import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBGEService } from '../../services/bge.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

import { IBGECityResponse, IBGEUFResponse } from '../../models/IBGEUF';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReqCampService } from '../../services/req_camp.service';
import { reqCamp } from '../../models/req_camps';
import { LocalStorageService } from '../../services/localStorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'component-form',
  standalone: true,
  imports: [
    MdbFormsModule,
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule],
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  providers: [provideNgxMask({})]
})
export class formComponent implements OnInit {

  form: FormGroup; // Define o FormGroup

  UF: IBGEUFResponse[] = []; // Lista das UFs
  cities: IBGECityResponse[] = []; // Lista de Cidades

  documentType: 'RNE' | 'RG' = 'RG';

  typeVisit = [
    { label: "Parentes", value: "Parentes" },
    { label: "Amigos", value: "Amigos" },
    { label: "Visita da igreja", value: "Visita da igreja" },
  ];

  reqOptions = [
    { label: "Visita social", value: "Visita social" },
    { label: "Visita assistida", value: "Visita assistida" },
    { label: "Visita íntima", value: "Visita íntima" },
  ];

  user: any;

  constructor(
    private ibgeService: IBGEService,
    private req_campService: ReqCampService,
    private localStorageService: LocalStorageService,
    ) {
    // Inicialize o FormGroup
    this.form = new FormGroup({
      name_visited: new FormControl('', Validators.required),
      cpf_rne: new FormControl('', Validators.required),
      cellphone: new FormControl('', Validators.required),
      type_visitation: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number_house: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.listAllUFS();
    const storedUser = localStorage.getItem('jwtToken');
    if (storedUser) {
        const decodedToken = jwtDecode(storedUser)
        this.user = decodedToken;
        console.log(this.user.id);
    }
  }

  listAllUFS(): void {
    this.ibgeService.listAllUFs().subscribe({
      next: (ufList) => {
        this.UF = ufList;
      },
      error: (err) => console.error('Erro ao listar UFs:', err),
    });
  }

  listAllCities(sigla: string | null): void {
    this.ibgeService.listAllCities(sigla).subscribe({
      next: (cityList) => {
        this.cities = cityList;
      },
      error: (err) => console.log('Erro ao listar CIDADES:', err),
    });
  }

  submitForm(): void {
    let dat_user ={
      id: this.user.id
    }
    if (this.form.valid) {
      const formData: reqCamp = this.form.value; // Captura os dados do formulário
      const data = {
        ...formData,
        id_user: dat_user // Adiciona os dados do usuário ao objeto de envio
      };

      console.log(data); // Exibe os dados a serem enviados

      this.req_campService.save(data).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro realizado com sucesso',
            icon: 'success',
            confirmButtonText: 'Seguir para o Login',
          });
        },
        error: (error) => {
          console.log(error)
          Swal.fire({
            title: 'Erro',
            text: 'Falha ao realizar o formulário: ',
            icon: 'error',
            confirmButtonText: 'Tente novamente',
          });
        },
      });
    } else {
      console.log('Formulário inválido', this.form);
    }
  }

}
