import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CambioService } from '../../../servicios/cambio.service';
import { ToastrService } from 'ngx-toastr';
import { AuthInterceptorService } from '../../../auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-modal-cambio',
  standalone: true,
  imports: [

    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './modal-cambio.component.html',
  styleUrl: './modal-cambio.component.css',
  providers:[CambioService, ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true

    },
  ]
})
export class ModalCambioComponent implements OnInit{

  listaMoneda:any[]=[];
  myForm: FormGroup;


  filteredOptions!: Observable<string[]>;
  filteredOptionsD!: Observable<string[]>;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCambioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cambioService: CambioService, public dialog: MatDialog
  ) {
    this.myForm = this.fb.group({

      monedaOrigen: [ '', Validators.required],
      monedaDestino: [ '', Validators.required],
      montoOrigen: [ '', Validators.required],

    });
  }

  ngOnInit(): void {
    this.listarMoneda();
  }





  onGuardar(): void {
    console.log(this.myForm)
    if (this.myForm.valid) {
      const formData = this.myForm.getRawValue();
      console.log(formData);

      this.dialogRef.close(formData);


    }
  }


  onCancelar(): void {
    this.dialogRef.close();
  }


  validateDecimalInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    const regex = /^[0-9]*\.?[0-9]*$/; // Permitir solo números y un punto decimal

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }



  private listarMoneda() {
    this.cambioService.getTipo().subscribe((result:any) => {
      const currencyList = Object.keys(result.data.rates);
      this.listaMoneda = currencyList;

      const monedaOrigenControl = this.myForm?.get('monedaOrigen');
      const monedaDestinoControl = this.myForm?.get('monedaDestino');

      this.filteredOptions = monedaOrigenControl? monedaOrigenControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      ) : of([]);


      this.filteredOptionsD = monedaDestinoControl? monedaDestinoControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      ) : of([]);


    }, (err:any) => {
      console.error(err);
    });
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaMoneda.filter(option => option.toLowerCase().includes(filterValue));
  }

}
