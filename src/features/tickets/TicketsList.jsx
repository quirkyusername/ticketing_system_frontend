import React from 'react'
import Ticket from './Ticket'
import { Table, TableContainer, TableHead,TableRow,TableBody,TableCell, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TicketsList = ({tickets}) => {
  const navigate  = useNavigate()
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
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Description</TableCell>
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