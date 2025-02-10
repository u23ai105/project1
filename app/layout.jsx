import './globals.css';
import { Poppins } from 'next/font/google';
import { GoogleOAuthProvider } from "@react-oauth/google";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Helper Buddy',
  description: 'Your trusted helper buddy application',
};

const CLIENT_ID = "461684247163-47n3j4fkr1ldc01l2nt0aggnbt1efgcg.apps.googleusercontent.com";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} w-screen h-screen`}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}