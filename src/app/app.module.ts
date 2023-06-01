import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AlumnosComponent } from './components/listar-alumnos/listar-alumnos.component';
import { CrearAlumnoComponent } from './components/crear-alumno/crear-alumno.component';
import { environment } from './environment/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { VistaAlumnoComponent } from './components/vista-alumno/vista-alumno.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,  
    LoginComponent,
    NavbarComponent,
    AlumnosComponent,
    CrearAlumnoComponent,
    VistaAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule

  ],
  exports: [
    SharedModule,
    AngularFireModule,
    AngularFireAuthModule,
  ],

  providers: [
    DatePipe,
     { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
     { provide: LOCALE_ID, useValue: 'es-ES' },
     { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
     { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
  
  
})
export class AppModule { }
