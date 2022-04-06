import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import * as actions from './ingreso-egreso.actions';

export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWhitIngresoEgreso extends AppState {
  ingresoEgreso: State;
}

export const initialState: State = {
  items: [],
};

const _ingresoEgresoReducer = createReducer(
  initialState,

  on(actions.setItems, (state, { items }) => ({
    ...state,
    items: [...items],
  })),

  on(actions.unSetItems, (state) => ({
    ...state,
    items: [],
  }))
);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
