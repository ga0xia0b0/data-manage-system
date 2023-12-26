import './App.css';
import Content from './components/Content';
import Header from './components/Header';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { useDispatch } from 'react-redux';
import axios from "axios";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import frFR from "antd/locale/fr_FR";
import jaJP from "antd/locale/ja_JP";
import { Locale } from 'antd/es/locale';

const antdLocale:{[key: string]: Locale} = {
  en: enUS,
  zh: zhCN,
  fr: frFR,
  jp: jaJP
}               // i18n语言映射到antd组件语言,使组件和系统语言一致

const fetchUserLanguage = async () => {
  const res = await axios.get('/api/lngsetting');
  return res.data; 
};

function App() {
  const [i18nInitialized, setI18nInitialized] = useState(false);
  const [lang, setLang] = useState('');  // antd组件语言
  const dispatch = useDispatch();

  useEffect(() => {
      async function initI18n () {
        const userLanguage = await fetchUserLanguage();   // 从后端获取语言设置
        setLang(userLanguage);
      
        i18n
          .use(HttpBackend)
          .use(initReactI18next)
          .init({
            lng: userLanguage,
            fallbackLng: "zh",
            backend: {
              loadPath: `/api/{{lng}}`,
            },
            interpolation: {
              escapeValue: false
            }
          }, () => {
            setI18nInitialized(true);
            dispatch({
              type: 'SET_LANGUAGE',
              payload: userLanguage,
            });
          });
      }; 
      initI18n();
    }, [dispatch]);

  if(!i18nInitialized) {
    return <div></div>;     // 条件渲染：根据初始化状态
  }

  return (
    <ConfigProvider locale={antdLocale[lang]}>
      <div className="App">
        <Header setLang={setLang}/>
        <div className="wrapper">
        <Router>
          <Navbar />
          <Content />
        </Router>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
