import { Injectable } from '@angular/core';
import { 
  collection, 
  collectionData, 
  docData, 
  doc,
  updateDoc,
  Firestore
} from '@angular/fire/firestore';
import { deleteDoc, addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Users{
  id?:string;
  nombre:string;
  email:string;
  contrasena:string;
}

export interface Cita{
  id?:string;
  nombreResponsable:string;
  problema:string;
  fecha:string;
  nota:string;
  folio:string;
}

export interface producto{
  id?: string;
  nombre: string;
  desc: string;
  img:string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore:Firestore
  ) { }

  getProductoArticulo():Observable<producto[]>{
    const prodREF = collection(this.firestore, 'productos_servicios/productos/articulos');
    return collectionData(prodREF, {idField:'id'}) as Observable<producto[]>;
  }

  addcita(cita:Cita){
    const citaREF = collection(this.firestore, 'citas');
    return addDoc(citaREF, cita)
  }

  addUser(user:Users){
    const userREF = collection(this.firestore, 'usuarios');
    return addDoc(userREF, user);
  }
  getUsuarios():Observable<Users[]>{
    const usersREF = collection(this.firestore, 'usuarios');
    return collectionData(usersREF, {idField:'id'}) as Observable<Users[]>
  }
  getUsuarioById(id):Observable<Users[]>{
    const userREF = doc(this.firestore, `usuarios/${id}`);
    return docData(userREF, {idField:'id'}) as Observable<Users[]>
  }
  deletUser(user:Users){
    const userREF = doc(this.firestore, `usuarios/${user.id}`);
    return deleteDoc(userREF)
  }
  updateUser(user:Users){
    const userREF = doc(this.firestore, `usuarios/${user.id}`);
    return updateDoc(userREF, {nombre: user.nombre, email:user.email, constrasena: user.contrasena});
  }
  
}
