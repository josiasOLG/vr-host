'use client'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

const HeaderComponent = dynamic(() => import('header/App'), { ssr: false })
const FooterComponent = dynamic(() => import('footer/App'), { ssr: false })

const mfeMap = {
  'card-mfe': dynamic(() => import('card/App'), { ssr: false }),
}

export default function MFELoader() {
  const params = useParams()
  const mfe = params?.mfe ?? 'card-mfe'

  const MFEComponent = mfeMap[mfe as keyof typeof mfeMap] ?? mfeMap['card-mfe']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <HeaderComponent />
      </header>
      
      <main style={{ flex: 1, padding: '20px' }}>
        <MFEComponent />
      </main>
      
      <footer style={{ marginTop: 'auto' }}>
        <FooterComponent />
      </footer>
    </div>
  )
}
