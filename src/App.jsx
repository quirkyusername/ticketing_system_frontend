import { useState } from 'react'
import './App.css'
import tickets_data from './data/tickets_data.js'
import Tickets from './features/tickets/Tickets'
import { Box, Grid } from '@mui/material'
function App() {
  const [tickets, setTickets] = useState(tickets_data)
  return (
    
      <main>
        <section className='container'>
          <h1>Tickets List</h1>
          <div>
            <Tickets tickets={tickets}/>
          </div>
        </section>
      </main>
      
      
  )
}

export default App
