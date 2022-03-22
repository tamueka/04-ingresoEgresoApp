import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {
  ingresoForm: FormGroup;
  tipo: string = 'Ingreso';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }

    console.log(this.ingresoForm);
    console.log(this.ingresoForm.value);

    console.log(this.tipo);
  }
}
