import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    });
  }

  crearUsuario(nombre: string, correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password);
  }

  logearUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
