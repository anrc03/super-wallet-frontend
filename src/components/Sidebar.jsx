import { useState } from 'react'
import { Button, Layout } from 'antd'
import SidebarLogo from './SidebarLogo';
import MenuList from './MenuList';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

export default function Sidebar({component: Component}) {

const { Header, Sider } = Layout;
  const [collapsed, setcollapsed] = useState(false)

  return (
    <Layout>
        <Sider collapsed={collapsed} collapsible trigger={null} className='sidebar'>
            <SidebarLogo/>
            <MenuList/>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, backgroundColor: '#a2cc72' }}>
            <Button type='text' className='toggle' onClick={() => setcollapsed(!collapsed)} icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}/>
          </Header>
          <Component/>
        </Layout>
    </Layout>
  )
}
