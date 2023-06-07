export class Alumno {
    id?: string;
    apellido: string
    nombre: string;
    dni: number;
    fechaNacimiento:Date;
    domicilio: string;
    celularPrincipal: number;
    celularSecundario:number;
    estudios:string;
    fechaIngreso:Date
    fechaEgreso:Date;
    nivelAlcanzado:string
    cuotaPaga:Array<any>;
    observaciones:string;
   
    constructor( apellido: string,nombre: string, dni: number, fechaNacimiento:Date, domicilio: string, celularPrincipal: number, celularSecundario: number, estudios: string,fechaIngreso:Date,fechaEgreso:Date,nivelAlcanzado="sin datos",cuotaPaga:Array<any>,observaciones: string) {

        this.apellido = apellido
        this.nombre = nombre
        this.dni = dni
        this.fechaNacimiento=fechaNacimiento,
        this.domicilio = domicilio
        this.celularPrincipal=celularPrincipal
        this.celularSecundario=celularSecundario
        this.estudios =estudios
        this.fechaIngreso =fechaIngreso
        this.fechaEgreso =fechaEgreso
        this.nivelAlcanzado=nivelAlcanzado
        this.cuotaPaga=cuotaPaga
        this.observaciones=observaciones
       
    }
    
}

