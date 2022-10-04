export const USER_FORM = 'USER_FORM';

export const userForm = (payload) => ({
  type: USER_FORM,
  payload,
});
//
export const MOEDA_ACT = 'MOEDA_ACT';

export const moedas = (payload) => ({
  type: MOEDA_ACT,
  payload,
});
//
export const SALVA_DISPESA = 'SALVA_DISPESA';

export const salvarDispesas = (payload) => ({
  type: SALVA_DISPESA,
  payload,
});
//
export const REMOVE_ITENS = 'REMOVE_ITENS';

export const removerItens = (payload) => ({
  type: REMOVE_ITENS,
  payload,
});
//

export const EDITAR_DISPESA = 'EDITAR_DISPESA';

export const editarDispesa = (payload) => ({
  type: EDITAR_DISPESA,
  payload,
});

export const OBJETO_EDITADO = 'OBJETO_EDITADO';

export const objetoEditado = (payload) => ({
  type: OBJETO_EDITADO,
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
