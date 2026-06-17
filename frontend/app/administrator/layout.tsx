"use client"
import { Layout, Menu } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Sider, Header, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div style={{ padding: '16px', color: 'white', textAlign: 'center' }}>Admin Panel</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link href="/administrator">Dashboard</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '16px' }}>{children}</Content>
            </Layout>
        </Layout>
    );
}