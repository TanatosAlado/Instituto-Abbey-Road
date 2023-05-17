import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CrearAlumnoComponent } from './components/crear-alumno/crear-alumno.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'alumnos',component:AlumnosComponent},
  {path:'crearAlumno',component:CrearAlumnoComponent},
  {path:'actualizarAlumno/:id',component:CrearAlumnoComponent},
   {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
