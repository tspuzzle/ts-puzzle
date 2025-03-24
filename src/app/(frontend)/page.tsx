import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { LoginButton } from '@/components/auth/login-button'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import config from '@/payload.config'
import { Poppins } from 'next/font/google'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="flex h-full bg-gradient-to-r from-sky-400 to-blue-800 items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className)}>
          Auth
        </h1>
        <p className="text-white text-lg">Simple authentication center</p>
        <LoginButton>
          <Button variant="secondary" size="lg">
            Sign In
          </Button>
        </LoginButton>
      </div>
    </div>
  )
}
