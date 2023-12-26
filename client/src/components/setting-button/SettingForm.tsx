import { Radio, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { setLanguage } from './actions';
import { connect } from 'react-redux';

// 定义 props 类型
type SettingFormProps = {
    setLang: (language: string) => void;
    showSettingForm: boolean;
    setShowSettingForm: (show: boolean) => void;
    language: string;
    setLanguage: (language: string) => void;
};

const SettingForm: React.FC<SettingFormProps> = ({
    setLang, 
    showSettingForm, 
    setShowSettingForm, 
    language, 
    setLanguage
}) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(language === 'zh' ? 1 : language === 'en' ? 2 : language === 'fr' ? 3 : 4);

    const handleClick = () => {
        const valueToState: { [key: number]: string } = { 1: 'zh', 2: 'en', 3: 'fr', 4: 'jp' };
        const valueToAntd: { [key: number]: string } = { 1: 'zh', 2: 'en', 3: 'fr', 4: 'ja' };
        setLanguage(valueToState[value as keyof typeof valueToState]);
        setLang(valueToAntd[value as keyof typeof valueToAntd]);
        setShowSettingForm(false);
    };

    const handleChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    return (
        showSettingForm &&
        <div className='settingform'>
          <h2 className='lang'>{t('语言')}</h2>
          <Radio.Group onChange={handleChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>{t('简体中文')}</Radio>
              <Radio value={2}>{t('英语')}</Radio>
              <Radio value={3}>{t('法语')}</Radio>
              <Radio value={4}>{t('日语')}</Radio>
            </Space>
          </Radio.Group>
          <div className='settingformbutton'>
            <Button type="primary" onClick={handleClick}>
              {t('确定')}
            </Button>
            <Button onClick={()=>setShowSettingForm(false)}>
              {t('取消')}
            </Button>
          </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
      language: state.language,
    };
};
  
const mapDispatchToProps = (dispatch: any) => {
    return {
        setLanguage: (language: string) => dispatch(setLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingForm);
