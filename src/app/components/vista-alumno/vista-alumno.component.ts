import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.component.html',
  styleUrls: ['./vista-alumno.component.css']
})
export class VistaAlumnoComponent {
  form:FormGroup
  listAlumnos:Alumno[]=[]
  dataSource:MatTableDataSource<Alumno>;
  
 
 

  constructor(private fb:FormBuilder, private _alumnoService: AlumnoService){ 
    this.dataSource = new MatTableDataSource(this.listAlumnos);
  }
   
  

  ngOnInit(): void {
    this.mostrarAlumno()
  }

 mostrarAlumno() {
  let id=(window.location.pathname).slice(15)
  this._alumnoService.getStudentById(id).subscribe(doc => {
    this.listAlumnos.push(doc)   
  })
  
}

  
}
