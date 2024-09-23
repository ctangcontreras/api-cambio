import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CambioService } from '../../servicios/cambio.service';
import { AuthInterceptorService } from '../../auth.interceptor';
import { ModalCambioComponent } from './modal-cambio/modal-cambio.component';
@Component({
  selector: 'app-tipo-cambio',
  standalone: true,
  imports: [

    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
  ],
  templateUrl: './tipo-cambio.component.html',
  styleUrl: './tipo-cambio.component.css',
  providers:[CambioService, ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true

    },
  ]
})
export class TipoCambioComponent implements OnInit{


  lista = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'monedaOrigen', 'montoOrigen', 'monedaDestino', 'montoDestino'];
  usuario :any = {} ;

  constructor(private cambioService: CambioService, public dialog: MatDialog, private toastr: ToastrService ) {
  }


  ngOnInit(): void {
    this.listarConverts();

  }



  showSuccess(message:string) {
    this.toastr.success(message, 'Mensaje!');
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalCambioComponent, {
      width: '400px',
      data: { modo: 'crear' }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {

        this.convertTipo(resultado);

      }
    });
  }



  private listarConverts() {
    this.cambioService.getAll().subscribe((result:any) => {
      this.lista.data = result.data;
    }, (err:any) => {
      console.error(err);
    });
  }


  private convertTipo(data:any) {
    this.cambioService.convert(data).subscribe((result:any) => {
       if (result.code===1) {
        this.showSuccess('El monto destino es : '+result.data.montoDestino);
        this.listarConverts();

       }
    }, (err:any) => {
      console.error(err);
    });
  }

}
