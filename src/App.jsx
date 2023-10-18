import { useState } from 'react'
import './App.css'
import tickets_data from './data/tickets_data.js'
import TicketsList from './features/tickets/TicketsList'
import Ticket_Create from './features/tickets/Ticket_Create'
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom'

function App() {
  const [tickets, setTickets] = useState(tickets_data) 
  return (
    
    <main>
    <Router>
      <Routes>
        <Route path='tickets' element={<TicketsList tickets={tickets}/>}>
          <Route path='create-ticket' element={<Ticket_Create/>} />                 
        </Route>
        {/* <Router path='/create-ticket'>
          <Ticket_Create>

          </Ticket_Create>
        </Router> */}
      </Routes>
    </Router>
    </main>      
        
      
      
      // <main>
      //   <section className='container'>
      //     <Switch>
      //       <Route path='/'>
      //         <h1>Tickets List</h1>
      //         <div>
      //           <TicketsList tickets={tickets}/>
      //         </div>
      //       </Route>
      //       <Router path='/create-ticket'>
      //         <Ticket_Create>

      //         </Ticket_Create>
      //       </Router>
      //     </Switch>
          
      //   </section>
      // </main>
      
      
  )
}

export default App
