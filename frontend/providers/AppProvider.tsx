'use client';

import { AntdProvider } from './AntdProvider';
import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider>
            <QueryProvider>
                <ThemeProvider>
                    <AntdProvider>
                        {children}
                    </AntdProvider>
                </ThemeProvider>
            </QueryProvider>
        </ReduxProvider>
    );
};