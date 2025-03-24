import { PayloadAuthAdapter } from '@/services/payloadAuthAdapter'
import { getPayload } from '@payload-config'
import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PayloadAuthAdapter(),
  providers: [
    Credentials({
      async authorize({ username, password }) {
        const payload = await getPayload()
        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
})
