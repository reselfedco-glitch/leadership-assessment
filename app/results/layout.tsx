import { Suspense } from 'react'

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      {children}
    </Suspense>
  )
}
