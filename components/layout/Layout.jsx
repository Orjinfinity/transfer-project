
import { View, Header, Footer } from '@/components'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const Layout = ({ children }) => (
  
  <View
    display="grid"
    gridTemplateColumns="1fr"
    gridTemplateRows="auto 1fr auto"

    minHeight="100vh"
    alignItems="start"
    width="100%"
  >
    <Header />
    <main style={{maxWidth:"100vw",overflow:"hidden"}}>
 
      {children}
 
    </main>
    <Footer />
  </View>
)

export default Layout
