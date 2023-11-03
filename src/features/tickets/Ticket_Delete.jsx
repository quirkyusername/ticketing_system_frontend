import React from 'react'
import { useParams } from 'react-router-dom'

const Ticket_Delete = () => {
  const {id} = useParams()
  return (
    <div>Delete Ticket Number {id}</div>
  )
}

export default Ticket_Delete