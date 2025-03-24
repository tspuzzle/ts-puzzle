import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed

    { name: 'name', type: 'text' },
    { name: 'image', type: 'text' },
    { name: 'emailVerified', type: 'date' },
  ],
}
