import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  deleteUser,
  updateEmail,
  updatePassword
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(
    private auth:Auth
  ) { }

  async registro({email, password}){
    try{
      const userREF = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userREF
    }catch(err){
      return null
    }
  }

  async ingreso({email, password}) {
    try{
      const userREF = signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userREF
    }catch(err){
      return null
    }
  }

  async salida(){
    return signOut(this.auth);
  }

  async eliminar(user){
    try{
      const userREF = deleteUser(
        user
      );
      return userREF;
    }catch(err){
      return null
    }
  }

  async updateUser(user, email){
    try{
      const emailRef = updateEmail(
        user,
        email
      );
      return emailRef
    }catch(err){
      return null
    }
  }

  async updatePasswor(user, password){
    try{
      const passREF = updatePassword(
        user,
        password
      )
    }catch(err){

    }
  }
}
