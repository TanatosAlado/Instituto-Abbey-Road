import { Component,ViewChild,NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router} from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { DatePipe, registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es-ES');
import { Inject, LOCALE_ID } from '@angular/core';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css'],
 
 })

export class CrearAlumnoComponent {


  @ViewChild(MatSelect) cuotaPagaSelect!: MatSelect;
  cuotaPaga = new FormControl('');
  mensaje=new FormControl()
  buttonVisible:boolean=true

  esBloqueante: boolean=false

  toppingList: string[] = ['Inscripción', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto', 'Septiembre','Octubre','Noviembre','Diciembre'];
  selected=this.toppingList


  
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
  formattedDate: string;
  selectDate: Date
  textoTextarea: string = '';
  arrayValores:any[]=[]
  detallar:boolean;
 
      
  constructor( private fb:FormBuilder, private _alumnoService: AlumnoService,private _snackBar:MatSnackBar,private aRouter:ActivatedRoute,private _ngZone: NgZone, private datePipe:DatePipe,private router: Router, @Inject(LOCALE_ID) private locale: string){
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
      celularSecundario:[''],
      estudios:['',Validators.required],
      fechaIngreso:['',Validators.required],
      fechaEgreso:[''],
      nivelAlcanzado:[''],
      cuotaPaga:[''],
      observaciones:['']
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  
  }

  ngOnInit(): void {
       this.esEditar();
  }

  cerrar(){
    this.esBloqueante=false
    this.router.navigate(['alumnos'])
  }

  agregarAlumno() {

    const fechaEgresoValue = this.form.get('fechaEgreso')?.value;
    const fechaEgreso = fechaEgresoValue ? new Date(fechaEgresoValue) : null;


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
      fechaEgreso: fechaEgreso,
      nivelAlcanzado:this.form.get('nivelAlcanzado')?.value,
      cuotaPaga:(this.form.get('cuotaPaga')?.value),
      observaciones: this.form.get('observaciones')?.value
     }
    this.loading = true;
    let prueba=window.location;
    if(prueba.href=="https://institute-abbey-road.web.app/crearAlumno"){
    // if(prueba.href=="http://localhost:4200/crearAlumno"){
      this._alumnoService.createStudent(user).then(()=> {
        this.loading = false;
        this._snackBar.open('El alumno fue agregado con exito', '', {
          duration: 1500,
          horizontalPosition: 'center',
        })
      setTimeout(() => {
        this.router.navigate(['alumnos'])
      }, 2000);
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
          setTimeout(() => {
            this.router.navigate(['alumnos'])
          }, 2000);
            this.listAlumnos=data
        }, error => {
          console.log(error)
        })   
      }      
    }
   
  } 

  esEditar() {
    if (this.id !== null) {


      //Cambiar con URL correcto
      let prueba=window.location.pathname;
      let sol = prueba.slice(1,8)
      

      const fechaEgresoValue = this.form.get('fechaEgreso')?.value;
      const fechaEgreso = fechaEgresoValue ? new Date(fechaEgresoValue) : null;
      if(sol == "detalle"){
        this.titulo = 'Detallar Alumno'
        this.buttonVisible=false
        this.esBloqueante=true
      }else {
        this.titulo = 'Editar Alumno'
        this.esBloqueante=false
      }
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
          fechaEgreso:fechaEgreso,
          nivelAlcanzado:data.nivelAlcanzado,       
          cuotaPaga: data.cuotaPaga,
          observaciones: data.observaciones
        })
      })
    }
  }

  reiniciarPeriodo() {
    // Deseleccionar todas las opciones en el mat-select de cuotaPaga
    this.form.get('cuotaPaga')?.setValue([]);
    // También puedes cerrar el panel del mat-select si es necesario
    this.cuotaPagaSelect.close();
  }


} 



 
