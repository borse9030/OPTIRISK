import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import DemoBanner from '@/components/DemoBanner';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNavBar from '@/components/MobileNavBar';

export const metadata: Metadata = {
  title: 'OptiRisk | Continuous Cyber Risk Quantification & Investment Optimization',
  description:
    'OptiRisk: Continuous cyber risk financial quantification and security budget optimization platform. SIH26105.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
        <AuthProvider>
          <DataProvider>
            <DemoBanner />
            <Header />
            <div className="flex-1 flex overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto min-h-[calc(100vh-6rem)] pb-24 lg:pb-8 bg-slate-50/60">
                {children}
              </main>
            </div>
            <MobileNavBar />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
