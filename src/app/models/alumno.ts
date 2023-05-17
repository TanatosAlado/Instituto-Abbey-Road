export class Alumno {
    id?: string;
    nombre: string;
    apellido: string;
    dni: number;
    domicilio: string;
    telefono: number;
    mail: string;
    curso: string;

    constructor(nombre: string, apellido: string, dni: number, domicilio: string, telefono: number, mail: string, curso: string) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.domicilio = domicilio;
        this.telefono = telefono;
        this.mail = mail;
        this.curso = curso;
    }
}