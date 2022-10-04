import { MOEDA_ACT,
  SALVA_DISPESA,
  REMOVE_ITENS,
  EDITAR_DISPESA,
  OBJETO_EDITADO } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MOEDA_ACT:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((item) => item !== 'USDT') };
  case SALVA_DISPESA:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_ITENS:
    return {
      ...state,
      expenses: state.expenses.filter((item) => +item.id !== +action.payload),
    };
  case EDITAR_DISPESA:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case OBJETO_EDITADO:
    return {
      ...state,
      expenses: [...action.payload],
      editor: false,
    };

  default:
    return state;
  }
};

export default wallet;
