import i18n from "i18next";
import axios from "axios";
import { Dispatch } from 'redux';

interface SetLanguageAction {
  type: 'SET_LANGUAGE';
  payload: string;
}

export const setLanguage = (language: string) => {
  return (dispatch: Dispatch<SetLanguageAction>) => {
    i18n.changeLanguage(language);   // 改变语言
    axios.put('/api/lngsetting/', language);   // 发送请求到后端以保存语言设置

    dispatch({
      type: 'SET_LANGUAGE',
      payload: language,
    });
  };
};