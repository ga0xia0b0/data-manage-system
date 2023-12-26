import i18n from "i18next";

const initialState = {
  language: i18n.language
};

const languageReducer = (state = initialState, action: { type: string; payload: string; }) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
