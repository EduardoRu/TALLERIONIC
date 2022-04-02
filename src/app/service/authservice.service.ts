import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut
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
}
