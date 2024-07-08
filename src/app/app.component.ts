import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdjudicacionesService } from './adjudicaciones.service';

export interface AdjudicacionesElement {
  grupo: string;
  programa: string;
  numero: string;
  fecha: Date;
  asociado: string;
}

const ELEMENT_DATA: AdjudicacionesElement[] = [];

// Función para generar un número aleatorio dentro de un rango
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar una fecha aleatoria
function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Nombres y programas de muestra para generar datos
const names = ['Juan Samaniego', 'Ana Pérez', 'Carlos Gómez', 'Laura Martínez', 'David Rodríguez'];
const programas = ['PLAN 21', 'AU0002', 'AU0001'];

// Generar 100 filas de datos
for (let i = 0; i < 100; i++) {
  ELEMENT_DATA.push({
    grupo: getRandomNumber(1, 50).toString(), // Grupo entre 1 y 50
    programa: programas[getRandomNumber(0, programas.length - 1)],
    numero: getRandomNumber(100000, 999999).toString(), // Número de 6 dígitos
    fecha: getRandomDate(new Date(2020, 0, 1), new Date()), // Fecha aleatoria entre 2020 y hoy
    asociado: names[getRandomNumber(0, names.length - 1)]
  });
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit,OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  
  adjudicacionesService = inject(AdjudicacionesService);
  displayedColumns: string[] = ['contrato', 'programa', 'grupo', 'asociado', 'fecha', 'detalle'];
  dataSource = new MatTableDataSource<AdjudicacionesElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator._intl.itemsPerPageLabel = "Items por página";
    // this.dataSource.paginator._intl.lastPageLabel = "Siguiente";
    // this.dataSource.paginator._intl.lastPageLabel = "Siguiente";
  }

  fillerNav = [];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  async ngOnInit(): Promise<any> {
    await this.search('6');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  async search(numero: string){
    try {
    const _response = await this.adjudicacionesService.searchAdjudicaciones(numero);
    console.log(_response); 
    this.dataSource.data = _response;
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 5; 
    } catch (error) {
      console.log(error)
    }
  }

  onlyNumbers(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove all non-numeric characters
    value = value.replace(/[^0-9]/g, '');

    // Set the input's value to the cleaned value
    input.value = value;
  }
}
