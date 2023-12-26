import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import SettingForm from './SettingForm';

// 定义 props 类型
type SettingButtonProps = {
  setLang: (language: string) => void;
};

const SettingButton: React.FC<SettingButtonProps> = ({ setLang }) => {
  const [showSettingForm, setShowSettingForm] = React.useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        type="text"
        style={{ color: 'white', fontSize: '17px' }}
        onClick={() => setShowSettingForm(!showSettingForm)}
      >
        {t('设置')}
      </Button>
      <SettingForm 
        setLang={setLang} 
        showSettingForm={showSettingForm} 
        setShowSettingForm={setShowSettingForm}
      />
    </>
  );
}

export default SettingButton;
