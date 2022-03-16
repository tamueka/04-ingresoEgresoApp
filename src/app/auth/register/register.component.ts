import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  cargando: boolean;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      console.log(`Cargando ${ui.isLoading}`);
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
    console.log('Cancelamos cargando');
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }

    /*     Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      },
    }); */

    this.store.dispatch(ui.isLoading());

    // usamos destructuracion
    const { nombre, correo, password } = this.registroForm.value;
    this.authService
      .crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        // Swal.close();
        this.router.navigate(['/dasboard']);
      })
      .catch((err) => {
        console.error(err);

        /*         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        }); */
      });
  }
}
