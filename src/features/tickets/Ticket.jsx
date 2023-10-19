import { TableCell, TableRow } from '@mui/material';
import React from 'react'
import Ticket_Update from './Ticket_Update';
import { useNavigate } from 'react-router-dom';
const Ticket = ({ticket}) => {
  const {id,title, description} = {...ticket}
  const navigate =  useNavigate()
  return (

    

    <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="ticket">
            {id}
        </TableCell>
        <TableCell align="right">{title}</TableCell>
        <TableCell align="right">{description}</TableCell>
        <TableCell align='right'>
            {/* <Ticket_Update ticket={ticket}></Ticket_Update> */}
            <button className='btn' onClick={()=>navigate(`/tickets/update-ticket/${id}`)}>Edit</button>
        </TableCell>
    </TableRow>
  );
}

export default Ticket