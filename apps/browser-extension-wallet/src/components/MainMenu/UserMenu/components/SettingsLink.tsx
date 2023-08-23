import React from 'react';
import { walletRoutePaths } from '@routes';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../../UserMenu/components/UserMenu.module.scss';

export const SettingsLink = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <Menu.Item data-testid="header-menu-settings" className={styles.menuItem}>
      <Link to={walletRoutePaths.settings}>{t('browserView.topNavigationBar.links.settings')}</Link>
    </Menu.Item>
  );
};
