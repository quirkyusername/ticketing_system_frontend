import React, { useEffect, useState } from 'react'
import Ticket from './Ticket'
import { Table, TableContainer, TableHead,TableRow,TableBody,TableCell, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// const TicketsList = ({tickets}) => {
const TicketsList = ({}) => {
  const navigate  = useNavigate()
  const [tickets, setTickets] = useState([])
  useEffect(()=>{
      const url = `https://localhost:7096/api/ticket`
      fetch(url, {method: 'GET'})
      .then((response)=> response.json())
      .then((data)=>{
        console.log(data)
        setTickets(data)})
      .catch((error)=>{
        console.log(error.message)
      }) 
  },[]);
  return (
    <section>
        <div>
            <button className='btn' onClick={()=>{navigate(`/tickets/create-ticket`)}}>
                Create New Ticket
            </button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                    <TableCell>Ticket Id</TableCell>
                    <TableCell align="right">Issue Subject</TableCell>
                    <TableCell align="right">Issue Description</TableCell>
                    <TableCell align="right">Issue Update Message</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => {                    
                    return <Ticket key={ticket.id} ticket={ticket}/>
                }
                )}
              </TableBody>
          </Table>
        </TableContainer>
        
    </section>    
  )
}

export default TicketsList