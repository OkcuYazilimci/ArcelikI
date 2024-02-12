import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './components/Nav'
import Provider from './components/Provider'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Arch',
  description: 'You found an easter egg!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className='bg_landing'>
            <Nav />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  )
}
