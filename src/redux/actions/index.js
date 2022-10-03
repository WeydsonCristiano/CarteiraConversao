export const USER_FORM = 'USER_FORM';

export const userForm = (payload) => ({
  type: USER_FORM,
  payload,
});

export const MOEDA_ACT = 'MOEDA_ACT';

export const moedas = (payload) => ({
  type: MOEDA_ACT,
  payload,
});

export const SALVA_DISPESA = 'SALVA_DISPESA';

export const salvarDispesas = (payload) => ({
  type: SALVA_DISPESA,
  payload,
});

export const getCurrent = () => {
  const endPont = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    const data = await fetch(endPont);
    const requisicaoMoedas = await data.json();
    dispatch(moedas(requisicaoMoedas));
    return requisicaoMoedas;
  };
};
