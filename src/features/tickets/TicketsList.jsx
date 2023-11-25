  import React, { useEffect, useState } from 'react'
  import Ticket from './Ticket'
  import { Table, TableContainer, TableHead,TableRow,TableBody,TableCell, Paper, Pagination, TableSortLabel } from '@mui/material'
  import { useNavigate } from 'react-router-dom'

  // const TicketsList = ({tickets}) => {
  const TicketsList = ({}) => {
  const navigate  = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState('id');
  const [searchString, setSearchString] = useState('');
  const [pageNumTotal, setPageNumTotal] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [parameters,setParameters] = useState();
  useEffect(()=>{
    const url = `https://localhost:7096/api/ticket`
    fetch(url, {method: 'GET'})
    .then((response)=>{
        let paginationHeader = response.headers.get('X-Pagination');
        const {TotalPages} = JSON.parse(paginationHeader);
        setTotalPages(TotalPages);
        return response;
      })
    .then((response)=> response.json())
    .then((data)=>{
      console.log(data)
      setTickets(data)})
    .catch((error)=>{
      console.log(error.message)
    }) 
  },[]);

  const handleChange = (event)=>{
    const {value} = event.target;
    setSearchString(value);
  }
  const handleSubmit = (event)=>{
    console.log('user clicked on search')
    event.preventDefault();
    if(!submitting){
      setSubmitting(true);
      setParameters(buildQuery());
    }
  }
  const buildQuery = ()=>{
    let queryParamters = {}
    queryParamters.pageSize = pageSize;
    queryParamters.pageNumber = pageNumber;
    queryParamters.sortBy = sortBy;
    queryParamters.searchString = searchString;
    return queryParamters;
  }
  useEffect(()=>{
    if(submitting){
      const url = `https://localhost:7096/api/Ticket?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}&searchString=${searchString}`;
      fetch(url,{method:'GET'})
      .then((response)=>{
        let paginationHeader = response.headers.get('X-Pagination');
        const {TotalPages} = JSON.parse(paginationHeader);
        setTotalPages(TotalPages);
        return response;
      })
      .then((response)=>response.json())
      .then((data)=>{
        setTickets(data);               
        // console.log(`size:${pages}`)
        setSubmitting(false);        
        console.log(data);
      })
      // .catch((error)=>{
      //   setSubmitting(false);
      //   console.error(`an error occurred: ${error}`);
      // })
    }
  },[parameters]);
  const handlePagination = (event,value) => {
    setPageNumber(value);
    console.log(`page number:${value}`)
    if(!submitting){
      setSubmitting(true);
      setParameters(buildQuery());
    }
  }
  const handleSortBy = (event,columnName) =>{
    console.log(`sort by : ${columnName}, event value: ${event.target.direction}`);
  }
  return (
    <section>
      <div>
        <input type='text' value={searchString} id='tb_searchInput' onChange={handleChange} placeholder='Search Term'></input>
        <button className='btn' onClick={handleSubmit}>Search</button>

      </div>
      <div>
        <button className='btn' onClick={()=>{navigate(`/tickets/create-ticket`)}}>
          Create New Ticket
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><TableSortLabel name='id' direction='desc' onClick={()=>handleSortBy('id')}>Ticket Id</TableSortLabel></TableCell>
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
      <div>
        <Pagination count={totalPages} page={pageNumber} onChange={handlePagination} />
      </div>
    </section>    
  )
  }

  export default TicketsList