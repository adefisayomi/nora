


export const businessCategory = [
  {key: 1, text: 'Clothing', value: 'clothing'},
  {key: 2, text: 'Shoe Making', value: 'shoe_making'},
  {key: 3, text: 'Foods', value: 'foods'},
]

export const asideMenu =
    [
      {
        text: 'home',
        value: 'home',
        icon: 'home',
        path: '/',
      },
      {
        text: 'store',
        value: 'store',
        icon: 'cart',
        path: '/store',
      },
      {
        text: 'business',
        value: 'business',
        icon: 'handshake',
        path: `dashboard/business`,
      },
    ]

export const dashboardMenu = [
    {
      text: 'store',
      value: 'store',
      icon: 'warehouse',
      path: '/dashboard/store',
    },
    {
      text: 'clients',
      value: 'clients',
      icon: 'users',
      path: '/dashboard/clients',
    },
    {
      text: 'wallet',
      value: 'wallet',
      icon: 'google wallet',
      path: '/dashboard/wallet',
    },
    {
        text: 'invoice',
        value: 'invoices',
        icon: 'payment',
        path: '/dashboard/invoice',
      },
    {
      text: 'profile',
      value: 'profile',
      icon: 'user',
      path: '/user/dashboard/profile',
    },
  ]
  export const cardMenu = [
    {
      text: 'business',
      value: 'business',
      icon: 'handshake',
      path: '/dashboard/business',
      color: 'teal'
    },
    {
      text: 'clients',
      value: 'clients',
      icon: 'users',
      path: '/dashboard/clients',
      color: 'orange'
    },
    {
        text: 'invoice',
        value: 'invoices',
        icon: 'payment',
        path: '/dashboard/invoice',
        color: ''
      },
    {
      text: 'wallet',
      value: 'wallet',
      icon: 'google wallet',
      path: '/dashboard/wallet',
    },
  ]
  export const socialMediaOptions = [
    { key: 'm', text: 'facebook', value: 'facebook', icon: 'facebook' },
    { key: 'f', text: 'instagram', value: 'instagram', icon: 'instagram' },
    { key: 'o', text: 'linkedin', value: 'linkedin', icon: 'linkedin' },
  ]
export const genderOptions = [
    { key: 'm', text: 'male', value: 'male' },
    { key: 'f', text: 'female', value: 'female' },
    { key: 'o', text: 'others', value: 'others' },
]