import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  indexes: [
    {
      fields: ['provider', 'providerAccountId'],
      unique: true,
    },
  ],
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'provider',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'providerAccountId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'refreshToken',
      type: 'text',
    },
    {
      name: 'accessToken',
      type: 'text',
    },

    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
