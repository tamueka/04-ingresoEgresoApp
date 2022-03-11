import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // usamos destructuracion
    const { nombre, correo, password } = this.registroForm.value;
    this.authService
      .crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        Swal.close();
        this.router.navigate(['/dasboard']);
      })
      .catch((err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
