'use client';

import { ConfigProvider, App } from 'antd';

export const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider>
      <App>{children}</App>
    </ConfigProvider>
  );
};