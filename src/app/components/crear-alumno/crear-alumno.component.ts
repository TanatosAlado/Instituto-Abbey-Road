import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from '../../services/alumno.service'

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {
  form:FormGroup
  titulo='Crear Alumno';
  id: string|null
  listAlumnos:Alumno[]=[]

  constructor( private fb:FormBuilder, private _alumnoService: AlumnoService,private _snackBar:MatSnackBar,private aRouter:ActivatedRoute){
    this.form=this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      dni:['',Validators.required],
      domicilio:['',Validators.required],
      telefono:['',Validators.required],
      mail:['',Validators.required],
      curso:['',Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  
  }

  ngOnInit(): void {
       this.esEditar();
  }


  agregarAlumno() {
    const user: Alumno = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      dni: this.form.get('dni')?.value,
      domicilio: this.form.get('domicilio')?.value,
      telefono: this.form.get('telefono')?.value,
      mail: this.form.get('mail')?.value,
      curso: this.form.get('curso')?.value
    }

    let prueba=window.location;
    if(prueba.href=="http://localhost:4200/crearAlumno"){
      this._alumnoService.createStudent(user).then(()=> {
        this._snackBar.open('El alumno fue agregado con exito', '', {
          duration: 1500,
          horizontalPosition: 'center',
        })
      }, error => {
        console.log(error)
      })
    }
    else{
      if (this.id!==null){
        this._alumnoService.updateStudent(this.id,user).then(data=>{
          this._snackBar.open('El alumno fue actualizado con exito', '', {
            duration: 1500,
            horizontalPosition: 'center',
          })
            this.listAlumnos=data
        }, error => {
          console.log(error)
        })
          
      }
   
      
    }
   
  }
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Alumno'
      this._alumnoService.getStudentById(this.id).subscribe(data => {
        this.form.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          domicilio: data.domicilio,
          telefono: data.telefono,
          mail: data.mail,
          curso: data.curso
        })
      })
    }
  }
} 



 
