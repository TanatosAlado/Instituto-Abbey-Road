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
  idDelete: string;

  public showConfirmationDialog = false;


  displayedColumns: string[] = ['apellido', 'nombre', 'dni', 'domicilio', 'celularPrincipal', 'acciones'];
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
      this.paginator._intl.itemsPerPageLabel='Alumnos por Página'
      this.paginator._intl.firstPageLabel="Primera Página"
      this.paginator._intl.previousPageLabel="Página Anterior"
      this.paginator._intl.nextPageLabel='Siguiente Página'
      this.paginator._intl.lastPageLabel="Última Página"
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

  eliminarAlumno(id: any){
    this.showConfirmationDialog = true;
    console.log(`idDelete en eliminar ${id}`)
    this.idDelete = id;
  }


  confirm() {
    console.log(`idDelete en confirm: ${this.idDelete}`)
    this._alumnoService.deleteStudent(this.idDelete).then(() => {
      this._snackBar.open('El usuario ha sido eliminado correctamente', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }, error => {
      console.log(error);
    });
    this.showConfirmationDialog = false;
  }
  
  cancel() {
    // Lógica para cancelar la acción
    this.showConfirmationDialog = false;
  }

  

  detalleAlumno(id: any){
    
  }


}
