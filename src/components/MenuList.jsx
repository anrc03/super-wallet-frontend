import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './redux/UserSlice';

export default function MenuList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (user) setRole(user.role)
    }, [])
    
    const handleLogout = (e) => {
        dispatch(logout())
        navigate("/login")
    }

  return (
    <Menu theme='dark' mode='inline' className='menu-bar'>
        {role === "ROLE_SUPER_ADMIN" ?
        <>
            <Menu.Item onClick={() => navigate("/admin")} key='home' icon={<i className="bi bi-house-fill"></i>}>
                Home
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/admin/admins")} key='admin' icon={<i className="bi bi-person-fill"></i>}>
                Admin
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/admin/customers")} key='customer' icon={<i className="bi bi-people-fill"></i>}>
                Customer
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/admin/currency")} key='currency' icon={<i className="bi bi-wallet"></i>}>
                Currency History
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/admin/transaction")} key='transaction' icon={<i className="bi bi-credit-card-fill"></i>}>
                Transaction History
            </Menu.Item>
            <Menu.Item onClick={handleLogout} key='settings' icon={<i className="bi bi-gear"></i>}>
                Logout
            </Menu.Item>
        </>
        :
        <>
            <Menu.Item onClick={() => navigate("/admin")} key='home' icon={<i className="bi bi-house-fill"></i>}>
                Home
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/admin/customers")} key='customer' icon={<i className="bi bi-people-fill"></i>}>
                Customer
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/admin/currency")} key='currency' icon={<i className="bi bi-wallet"></i>}>
                Currency History
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/admin/transaction")} key='transaction' icon={<i className="bi bi-credit-card-fill"></i>}>
                Transaction History
            </Menu.Item>
            <Menu.Item onClick={handleLogout} key='settings' icon={<i className="bi bi-gear"></i>}>
                Logout
            </Menu.Item>
        </>
        }
    </Menu>
  );
}
