import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Providers } from './providers';

export const metadata = {
  title: 'Multi-Tenant Dashboard',
  description: 'Tenant-scoped analytics with admin-only views',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="site-header">
            <div className="brand">HypeQuery Multi-Tenant</div>
            <nav className="nav">
              <Link href="/">Tenant</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </header>
          <div className="content">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
