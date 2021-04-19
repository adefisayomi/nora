import { GlobalState } from '../../context/globalState'
import {Label, Icon, Dropdown} from 'semantic-ui-react'
import styles from './style/filter_header.module.css'


export default function Filter ({onChange}) {

    const {UI, business, products} = GlobalState()
    const businessList = business ? business.map(bis => {
        return ({ key: bis._id , text: bis.business_name, value: bis._id })
    }) : []

    const menu = [
        {icon: 'users', value: 212,name: 'clients'},
        {icon: 'handshake', value: business?.length || 0, name: 'business'},
        {icon: 'cart', value: products?.length || 0, name: 'products'},
    ]

    return(
        <div className= {styles.filter} style= {{ backgroundColor: UI.bgColor, color: UI.color, border: UI.border}}>
            <span className= {styles.filter_business}>
                <Dropdown
                    placeholder= 'Business'
                    options= {businessList}
                    search
                    onChange= {onChange}
                    selection
                    fluid
                />
            </span>
            <span className= {styles.filter_tags}>
                {menu.map((menu, index) => (
                  <Label basic as= 'a' circular key= {index}>
                    <Icon
                        name= {menu.icon}
                        circular
                    />
                    <span >{menu.value}</span>
                    <span className= {styles.filter_name}>{menu.name}</span>
                </Label> 
                ))}
            </span>
        </div>
    )
}