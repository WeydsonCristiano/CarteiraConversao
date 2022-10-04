import { MOEDA_ACT, SALVA_DISPESA, REMOVE_ITENS } from '../actions';

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

  default:
    return state;
  }
};

export default wallet;
