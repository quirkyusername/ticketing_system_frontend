import React from 'react'
import { useParams } from 'react-router-dom'

const Ticket_Update = () => {
  const {id} = useParams()
  return (
    
    <div>Ticket number {id} update page. </div>
  )
}

export default Ticket_Update