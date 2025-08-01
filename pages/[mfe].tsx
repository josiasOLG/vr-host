'use client'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

const mfeMap = {
  'dashboard-mfe': dynamic(() => import('header/App'), { ssr: false }),
}

export default function MFELoader() {
  const params = useParams()
  const mfe = params?.mfe ?? 'dashboard-mfe'

  const MFEComponent = mfeMap[mfe as keyof typeof mfeMap] ?? mfeMap['dashboard-mfe']

  return <div><MFEComponent /></div>
}
