import React from "react";
import SettingButton from "./setting-button/SettingButton";
import { useTranslation } from "react-i18next";

// Define a type for the props
type HeaderProps = {
    setLang: (language: string) => void;
};

const Header: React.FC<HeaderProps> = ({ setLang }) => {
    const { t } = useTranslation();

    return (
        <header>
            <h2 className="title">{t('数据管理平台')}</h2>
            <SettingButton setLang={setLang}/>
        </header>
    );
}

export default Header;

