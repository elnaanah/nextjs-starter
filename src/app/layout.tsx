import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aura AI — واجهة تشات ذكاء اصطناعي',
  description: 'واجهة تشات احترافية لنموذج ذكاء اصطناعي متقدم',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
