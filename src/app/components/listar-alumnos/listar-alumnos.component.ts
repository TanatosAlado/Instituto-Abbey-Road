import { Component, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno'
import { AlumnoService } from '../../services/alumno.service'


@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css']
})
export class AlumnosComponent {
  listAlumnos: Alumno[] = []


  displayedColumns: string[] = ['apellido', 'nombre', 'dni', 'domicilio', 'celularPrincipal','nivelAlcanzado', 'acciones'];
  dataSource:MatTableDataSource<Alumno>;
 
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort
  private paginator: MatPaginator; ; private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
      this.sort = ms;
      this.setDataSourceAttributes();
  }
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
      this.setDataSourceAttributes();
  }
  
  setDataSourceAttributes() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }



  constructor(private _alumnoService: AlumnoService, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.listAlumnos);
  }

  ngOnInit() {
    
    this.cargarAlumno()

    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
   
  }


  cargarAlumno() {
    this._alumnoService.getStudents().subscribe(doc => {
      this.listAlumnos = []
      this.dataSource = new MatTableDataSource(this.listAlumnos)
      doc.forEach((element: any) => {
        this.listAlumnos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  // eliminarAlumno(id: any) {
  //   this._alumnoService.deleteStudent(id).then(() => {
  //     this._snackBar.open('El usuario ha sido eliminado correctamente', '', {
  //       duration: 1500,
  //       horizontalPosition: 'center',
  //       verticalPosition: 'bottom'
  //     })
  //   }, error => {
  //     console.log(error)
  //   });
  // }

  eliminarAlumno(id: any) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar a este alumno?');
    if (confirmacion) {
      this._alumnoService.deleteStudent(id).then(() => {
        this._snackBar.open('El usuario ha sido eliminado correctamente', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }, error => {
        console.log(error);
      });
    }
  }





}
