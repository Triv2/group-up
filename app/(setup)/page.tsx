import { initialProfile } from '@/lib/initial-user'
import Image from 'next/image'

export default async function SetupPage() {
  const initProfile = await initialProfile();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  )
}
