import { MOEDA_ACT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MOEDA_ACT:
    return { ...state, currencies: Object.keys(action.payload) };
  default:
    return state;
  }
};

export default user;
