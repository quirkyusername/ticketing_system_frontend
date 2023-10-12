import React from 'react'
import Ticket from './Ticket'
import { Table, TableContainer, TableHead,TableRow,TableBody,TableCell, Paper } from '@mui/material'


const Tickets = ({tickets}) => {
  return (
    <section>
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
                    return <Ticket key={ticket.id} {...ticket}/>
                }
                )}
                </TableBody>
            </Table>
        </TableContainer>
        
    </section>    
  )
}

export default Tickets