import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AlumnosComponent } from './components/listar-alumnos/listar-alumnos.component';
import { CrearAlumnoComponent } from './components/crear-alumno/crear-alumno.component';
import { VistaAlumnoComponent } from './components/vista-alumno/vista-alumno.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'alumnos',component:AlumnosComponent},
  {path:'crearAlumno',component:CrearAlumnoComponent},
  {path:'actualizarAlumno/:id',component:CrearAlumnoComponent},
  {path:'detalleAlumno/:id',component:VistaAlumnoComponent},
   {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
