import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<any> {
    const uid = this.authService.user.uid;
    return this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
      .then((ref) => console.log('!Exito', ref))
      .catch((err) => console.warn(err));
  }

  initIngresosEgresosListener(uid: string) {
    this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc) => ({
            uid: doc.payload.doc.id,
            ...(doc.payload.doc.data() as any),
          }))
        )
      )
      .subscribe((items) => console.log(items));
  }
}
