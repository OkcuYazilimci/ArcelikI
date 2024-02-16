import { Inter } from 'next/font/google'
import SessionProvider from './components/AuthProvider'
import './globals.css'
import Nav from './components/Nav'
import Provider from './components/Provider'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Arch",
  description: "Welcome to Arch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
        <Provider>
          <main className='bg_landing'>
            <Nav />
            {children}
            <Footer />
          </main>
        </Provider>
      </SessionProvider>
      </body>
    </html>
  )
}
