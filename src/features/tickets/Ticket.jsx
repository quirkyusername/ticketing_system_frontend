import { TableCell, TableRow } from '@mui/material';
import React from 'react'
import Ticket_Update from './Ticket_Update';
const Ticket = ({ticket}) => {
  const {id,title, description} = {...ticket}
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
            <Ticket_Update ticket={ticket}></Ticket_Update>
        </TableCell>
    </TableRow>
  );
}

export default Ticket