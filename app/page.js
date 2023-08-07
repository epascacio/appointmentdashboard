'use client'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
 
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm">
    <button type="button" onClick={() => router.push('/login')}>
      Login
    </button>
    <br/>
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
    </div>
    </main>
  )
}
