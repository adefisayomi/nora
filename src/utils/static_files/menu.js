import { GlobalState } from "../../context/globalState"
import styles from './style/main_menu.module.css'
import {Icon, Checkbox} from 'semantic-ui-react'
import {useRouter} from 'next/router'
import ProfileTab from '../../components/re-usables/profileTab'
import Cart from "../../components/cart/cartTab"
import DropDown from '../../components/re-usables/dropdown'
import CartDropDown from '../../components/cart/cart_dropDown'



export const MainMenu = () => {

  const router = useRouter()
  const {UI, user, toggleUI, logOut} = GlobalState()
  const handleClick= (path) => {
    router.push(`/${path}`)
}
 
  return(
    <ul className= {styles.main_menu} style= {{ backgroundColor: UI.bgColor, color:UI.color }}>
        {user && <li className= {styles.main_menu_list_hide} style= {{ borderBottom: UI.border}} onClick= {() => router.push(`/${user?._id}`)}>
            <ProfileTab width= '30px' url= {user?.image?.url} username= {user?.username} id= {user?._id} />
        </li>}
        {user && <li className= {styles.main_menu_list_hide} style= {{ borderBottom: UI.border}}>
            <DropDown list= {<CartDropDown />} width= '250px'>
                <Cart />
            </DropDown>
          </li>}
        {user && asideMenu && asideMenu.length > 0 && asideMenu.map((list, index) => (
          <li key= {index} onClick= {() => handleClick(list.path)} className= {styles.main_menu_list_hide}>
            {list.text}
          </li>
        ))}
       {user ? 
        <li style= {{ borderBottom: UI.border}} onClick= {logOut}>Logout</li> : 
        <li style= {{ borderBottom: UI.border}} onClick= {() => router.push('/account/login')}>Login</li>
        }
      <li className= {styles.main_menu_theme} style= {{ borderBottom: UI.border}}>
          <Checkbox toggle onChange= {toggleUI}/>
          <h4>{UI?.dark ? 'Light Mode' : 'Dark Mode'}</h4>
      </li>
      </ul>
  )
}


export const businessCategory = [
  {key: 1, text: 'Fashion deisgning & Tailoring', value: 'clothing'},
  {key: 2, text: 'Shoe Making', value: 'shoe_making'},
  {key: 3, text: 'Catering', value: 'Catering'},
  {key: 4, text: 'House cleaning', value: 'House cleaning'},
  {key: 5, text: 'Copy or content writing', value: 'Copy or content writing'},
  {key: 6, text: 'Graphics design', value: 'Graphics design'},
  {key: 7, text: 'Interior', value: 'Interior'},
  {key: 8, text: 'Photography', value: 'Photography'},
  {key: 9, text: 'Real estate', value: 'Real estate'},
  {key: 10, text: 'Personal trainer', value: 'Personal trainer'}
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
        text: 'dashboard',
        value: 'dashboard',
        icon: 'dashboard',
        path: `/dashboard/store`,
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
      text: 'business',
      value: 'business',
      icon: 'handshake',
      path: '/dashboard/business',
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
      path: '/user',
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