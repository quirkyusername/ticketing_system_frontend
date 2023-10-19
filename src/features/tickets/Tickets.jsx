import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Tickets = () => {
  return (
    <>
      <div>
        <Link to='/tickets/tickets-list'>Tickets List</Link>
        <Link to='/tickets/create-ticket'>New Ticket</Link>        
      </div>
        
        <Outlet/>
    </>
  )
}

export default Tickets