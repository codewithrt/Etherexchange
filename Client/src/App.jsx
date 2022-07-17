import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Welcome from './Components/Welcome'
import Services from './Components/Services'
import Transaction from './Components/Transaction'
// import TransactionProvider from './context/TransactionContext'
import { TransactionProvider } from './context/TransactionContext'


function App() {


  return (
    
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
      {/* <TransactionProvider> */}
         <Navbar/>
         <Welcome/>
         {/* </TransactionProvider> */}
      </div>
      <Services/>
      <Transaction/>
      <Footer/>
    </div>
    
  )
}

export default App
