import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.models';

@Pipe({
  name: 'ordenarIngreso',
})
export class OrdenarIngresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return [...items].sort((a) => (a.tipo === 'Ingreso' ? -1 : 1));
  }
}
