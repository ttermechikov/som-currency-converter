import './globals.css';

export const metadata = {
  title: 'Конвертер валют',
  description: 'Конвертер валют по курсу НБКР',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">{children}</body>
    </html>
  );
}
