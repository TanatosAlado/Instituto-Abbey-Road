import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno'
import { Observable } from 'rxjs';
// import firebase from 'firebase/app'

// import * as firebase from 'firebase/app';
// import 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore'
// /// <reference types="@types/firebase" />



@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private firestore: AngularFirestore) { }

  createStudent(alumno: Alumno): Promise<any> {
    return this.firestore.collection('Alumnos').add(alumno)
  }

  getStudents(): Observable<any> {
    return this.firestore.collection('Alumnos').snapshotChanges()
  }
  
  deleteStudent(id: string): Promise<any> {
    return this.firestore.collection('Alumnos').doc(id).delete();
  }

  updateStudent(id: string, cliente: any): Promise<any> {
    return this.firestore.collection('Alumnos').doc(id).update(cliente);
  }
  getStudentById(id: string): Observable<any> {
    return this.firestore.collection('Alumnos').doc(id).valueChanges()
  }
}

