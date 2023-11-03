import { TableCell, TableRow } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const Ticket = ({ticket}) => {
  const {id,issue_subject,issue_description, status_update_msg, status} = {...ticket}
  const navigate =  useNavigate()
  
  return (
    <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="ticket">
            {id}
        </TableCell>
        <TableCell align="right">{issue_subject}</TableCell>
        <TableCell align="right">{issue_description}</TableCell>
        <TableCell align="right">{status_update_msg}</TableCell>
        <TableCell align="right">{status.status}</TableCell>
        <TableCell align='right'>            
          <button className='btn' onClick={()=>navigate(`/tickets/update-ticket/${id}`)}>Edit</button>
        </TableCell>
        <TableCell align='right'>
          <button className='btn' onClick={()=>navigate(`/tickets/delete-ticket/${id}`)}>Delete</button>
        </TableCell>
    </TableRow>
  );
}

export default Ticket