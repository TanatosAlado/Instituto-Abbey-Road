import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CrearAlumnoComponent } from './components/crear-alumno/crear-alumno.component';
import { environment } from './environment/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    AppComponent,  
    LoginComponent,
    NavbarComponent,
    AlumnosComponent,
    CrearAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  exports: [
    SharedModule,
    AngularFireModule,
    AngularFireAuthModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
