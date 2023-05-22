import { Component,ViewChild,NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css'],
})

export class CrearAlumnoComponent {
  form:FormGroup
  titulo='Crear Alumno';
  loading=false
  id: string|null
  listAlumnos:Alumno[]=[]
  minimo:Date
  maximo:Date 
  selectedOption: string;
  fechaEgreso:Date
  fechaObservacion:Date
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  triggerResize() {
   
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
      
  constructor( private fb:FormBuilder, private _alumnoService: AlumnoService,private _snackBar:MatSnackBar,private aRouter:ActivatedRoute,private _ngZone: NgZone){
    

    this.minimo = new Date(); 
    this.maximo = new Date();
    this.fechaObservacion=new Date();
    this.minimo.setFullYear(this.minimo.getFullYear() -100);
    this.form=this.fb.group({
      apellido:['',Validators.required],
      nombre:['',Validators.required],
      dni:['',Validators.required],
      fechaNacimiento:['',Validators.required],
      domicilio:['',Validators.required],
      celularPrincipal:['',Validators.required],
      celularSecundario:['',Validators.required],
      estudios:['',Validators.required],
      fechaIngreso:['',Validators.required],
      fechaEgreso:['',Validators.required],
      nivelAlcanzado:['',Validators.required],
      cuotaPaga:['',Validators.required],
      observaciones:['']
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  
  }

  ngOnInit(): void {
       this.esEditar();
  }


  agregarAlumno() {
    const fecha=new Date()
    const user: Alumno = {
      apellido: this.form.get('apellido')?.value,
      nombre: this.form.get('nombre')?.value,
      dni: this.form.get('dni')?.value,
      fechaNacimiento:new Date(this.form.get('fechaNacimiento')?.value),
      domicilio: this.form.get('domicilio')?.value,
      celularPrincipal: this.form.get('celularPrincipal')?.value,
      celularSecundario: this.form.get('celularSecundario')?.value,
      estudios:this.form.get('estudios')?.value,
      fechaIngreso:new Date(this.form.get('fechaIngreso')?.value),
      fechaEgreso:new Date(this.form.get('fechaEgreso')?.value),
      nivelAlcanzado:this.form.get('nivelAlcanzado')?.value,
      cuotaPaga:this.form.get('cuotaPaga')?.value,
      observaciones:[`${new Date}: ${this.form.get('observaciones')?.value}`]
    }
  
    this.loading = true;
    let prueba=window.location;
    if(prueba.href=="http://localhost:4200/crearAlumno"){
      this._alumnoService.createStudent(user).then(()=> {
        this.loading = false;
        this._snackBar.open('El alumno fue agregado con exito', '', {
          duration: 1500,
          horizontalPosition: 'center',
        })
      }, error => {
        this.loading=false
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
        this.loading=false
        this.form.setValue({
          apellido: data.apellido,
          nombre: data.nombre,
          dni: data.dni,
          fechaNacimiento:data.fechaNacimiento.toDate(),
          domicilio: data.domicilio,
          celularPrincipal: data.celularPrincipal,
          celularSecundario:data.celularSecundario,
          estudios:data.estudios,
          fechaIngreso:data.fechaIngreso.toDate(),
          fechaEgreso:data.fechaEgreso.toDate(),
          nivelAlcanzado:data.nivelAlcanzado,       
          cuotaPaga: data.cuotaPaga,
          observaciones:data.observaciones
        })
      })
    }
  }
} 



 
