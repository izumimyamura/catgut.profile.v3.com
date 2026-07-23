import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white m-0 p-0 overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
