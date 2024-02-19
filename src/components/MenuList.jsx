import React from 'react';
import { Menu } from 'antd';

export default function MenuList() {

  return (
    <Menu theme='dark' mode='inline' className='menu-bar'>
        <Menu.Item  key='home' icon={<i className="bi bi-house-fill"></i>}>
            Home
        </Menu.Item>
        <Menu.Item key='admin' icon={<i className="bi bi-person-fill"></i>}>
            Admin
        </Menu.Item>
        <Menu.Item key='customer' icon={<i className="bi bi-people-fill"></i>}>
            Customer
        </Menu.Item>
        <Menu.Item key='currency' icon={<i className="bi bi-wallet"></i>}>
            Currency History
        </Menu.Item>
        <Menu.Item key='transaction' icon={<i className="bi bi-credit-card-fill"></i>}>
            Transaction History
        </Menu.Item>
        <Menu.Item key='settings' icon={<i className="bi bi-gear"></i>}>
            Settings
        </Menu.Item>
    </Menu>
  );
}
