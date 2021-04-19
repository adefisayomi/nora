import Dashboard from '../dashboard'
import styles from './style/business.module.css'
import Footer from '../../re-usables/footer'
import Empty from '../../re-usables/empty'
import { TableLayout, TableHeader, TableBody } from '../../re-usables/table'
import { GlobalState } from '../../../context/globalState'
import { useRouter } from 'next/router'

export default function Business ({children}) {


  const router = useRouter()
  const {business} = GlobalState()
  
    return (
        <Dashboard>
          <div className= {styles.business}>
            <div className= {styles.main}>
              {business && business.length > 0 ? 
                <TableLayout>
                  <TableHeader headers= {['Business', 'Revenue']} />
                  <TableBody business= {business} />
                </TableLayout> :
                <Empty content= {{ icon: 'handshake', text: 'You currently have no Business.' }} />
                }
            </div>
            
            <div className= {styles.footer}>
              <Footer content= {{icon: 'plus', content: 'Add New Business', onClick: () => router.push(`${router.asPath}/add`)}} />
            </div>
        </div>
        {children}
        </Dashboard>
        
    )
}
