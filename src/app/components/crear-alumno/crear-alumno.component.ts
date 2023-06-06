import { Component,ViewChild,NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router} from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css'],
 
 })

export class CrearAlumnoComponent {


  cuotaPaga = new FormControl('');
  mensaje=new FormControl()
  buttonVisible:boolean=true

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

  //  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  // triggerResize() {
   
  //   this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  // }
 
      
  constructor( private fb:FormBuilder, private _alumnoService: AlumnoService,private _snackBar:MatSnackBar,private aRouter:ActivatedRoute,private _ngZone: NgZone, private datePipe:DatePipe,private router: Router){
    
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

  // guardarComoArray() {
  //   // Divide el contenido del textarea en un array utilizando saltos de línea como separador
  //   this.arrayValores.push (`${this.datePipe.transform(new Date(),'dd/MM/yyyy')}: ${ this.textoTextarea}`);
  //    return this.arrayValores
  // }

  guardarComoArray() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; 
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
    if (this.textoTextarea!="") {
      this.arrayValores.push(`${fechaFormateada}: ${this.textoTextarea}`);
    }
    return this.arrayValores;
  }

  mostrarArrayEnInput(observaciones) {
  
    return observaciones
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
      // fechaEgreso:new Date(this.form.get('fechaEgreso')?.value),
      fechaEgreso: fechaEgreso,
      nivelAlcanzado:this.form.get('nivelAlcanzado')?.value,
      cuotaPaga:(this.form.get('cuotaPaga')?.value),
      observaciones:this.guardarComoArray()
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
      location.reload()
    
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
   
  } //AgregarAlumno

 
  esEditar() {
    if (this.id !== null) {


      //Cambiar con URL correcto
      let prueba=window.location.pathname;
      console.log(`pr: ${prueba}`)
      let sol = prueba.slice(1,8)
      

      const fechaEgresoValue = this.form.get('fechaEgreso')?.value;
      const fechaEgreso = fechaEgresoValue ? new Date(fechaEgresoValue) : null;
      // this.titulo = 'Editar Alumno'
      if(sol == "detalle"){
        this.titulo = 'Detallar Alumno'
        this.form.disable()
        this.buttonVisible=false
      }else {
        this.titulo = 'Editar Alumno'
        this.form.enable()
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
          observaciones:this.mostrarArrayEnInput(data.observaciones)
        })
      })
    }
  }


} 



 
