import { useState } from 'react'
import './App.css'
import tickets_data from './data/tickets_data.js'
import TicketsList from './features/tickets/TicketsList'
import Ticket_Create from './features/tickets/Ticket_Create'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tickets from './features/tickets/Tickets'
import Ticket_Update from './features/tickets/Ticket_Update'

function App() {
  const [tickets, setTickets] = useState(tickets_data) 
  return (
    
    <main>
    <Router>
      <Routes>
        <Route path='tickets' element={<Tickets />}>
          <Route path='tickets-list' element={<TicketsList tickets={tickets}/>}/>
          <Route path='create-ticket' element={<Ticket_Create/>} />
          <Route path='update-ticket/:id' element={<Ticket_Update/>}/>            
        </Route>       
      </Routes>
    </Router>
    </main>
      
  )
}

export default App
