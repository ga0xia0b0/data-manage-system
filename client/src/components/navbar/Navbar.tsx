import React, { useState, useEffect } from 'react';
import FoldButton from './FoldButton';
import { Menu } from 'antd';
import { HighlightOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 定义 getItem 函数的参数类型
interface ItemProps {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: ItemProps[];
  type?: string;
}

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: ItemProps[], type?: string): ItemProps {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isFold, setIsFold] = useState(false);

  const items: ItemProps[] = [
    getItem(<Link to="/data-manage">{t('数据管理')}</Link>, '1', <HighlightOutlined />),
    getItem(<Link to="/tag-manage">{t('标签管理')}</Link>, '2', <ThunderboltOutlined />),
  ];

  useEffect(() => {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    if (isFold) {
      navbar.style.width = '80px';
      content.style.width = 'calc(100vw - 140px)';
    } else {
      navbar.style.width = '230px';
      content.style.width = 'calc(100vw - 290px)';
    }
  }, [isFold]);

  const location = useLocation().pathname.split('/')[1];

  const selectedKeys = () => {
    switch (location) {
      case 'data-manage':
        return '1';
      case 'tag-manage':
        return '2';
      default:
        return '1';
    }
  };

  return (
    <div className="navbar">
      <Menu
        defaultSelectedKeys={[selectedKeys()]}
        mode="inline"
        theme="dark"
        inlineCollapsed={isFold}
        items={items}
      />
      <FoldButton isFold={isFold} setIsFold={setIsFold}/>
    </div>
  );
}

export default Navbar;
