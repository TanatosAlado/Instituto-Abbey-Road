import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno'
import { Observable } from 'rxjs';
// import firebase from 'firebase/app'

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import {AngularFirestore} from '@angular/fire/compat/firestore'
/// <reference types="@types/firebase" />



@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

 constructor(private firestore: AngularFirestore ){}

 createStudent(alumno:Alumno):Promise<any>{
     return this.firestore.collection('Alumnos').add(alumno)
   }

getStudents():Observable<any>{
    return this.firestore.collection('Alumnos').snapshotChanges()
  } 
deleteStudent(id:string):Promise<any>{
  return this.firestore.collection('Alumnos').doc(id).delete();
}


  // listAlumnno='http://localhost:4000/alumnos/'

  // constructor(private http:HttpClient) { }

  // getStudent(): Observable<any> {
  //   return this.http.get(this.listAlumnno);
  // }

  // deleteStudent(id: string): Observable<any> {
  //    return this.http.delete(this.listAlumnno + id);
   
  // }

  // createStudent(alumno: Alumno): Observable<any> {
  //   return this.http.post(this.listAlumnno , alumno);
  // }

  // getStudentById(id: string): Observable<any> {
  //   return this.http.get(this.listAlumnno + id);
  // }
  //  updateStudent(alumno: Alumno,id:string):Observable<any>{
  //    return this.http.put(this.listAlumnno+id,alumno)
  //  }
  
}

