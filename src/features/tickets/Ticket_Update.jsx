import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DropDown from '../form-components/DropDown'
import { CircularProgress } from '@mui/material';
import { ErrorSharp } from '@mui/icons-material';
const Ticket_Update = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  //form data state
  const [formData, setFormData] = useState()
  //errors state
  const [ errors, setErrors] = useState({})
  //submitting state
  const [submitting, setSubmitting] = useState(false);
  //status drop down data
  const [statusData, setStatusData] = useState();
  //server response message after updating
  const [serverResponse, setServerResponse] = useState();
  //fetch ticket from server
  useEffect(()=>{
    const url = `https://localhost:7096/api/Ticket/${id}`
    fetch(url,{method:'GET'})
    .then((response)=>response.json())
    .then((data)=>{
      setFormData(data);
      console.log(`get ticket info: ${JSON.stringify(data)}`)
    })
    .catch((error)=>{console.error(error)})
  },[]);
  //fetch status data from server
  useEffect(()=> {
    const url = `https://localhost:7096/api/status`;
    fetch(url,{method: 'GET'})
    .then((response)=>response.json())
    .then((data)=> {
      setStatusData(data);
      console.log(`get status data: ${JSON.stringify(data)}`)
    })
    .catch((error)=>{console.error(error)})
  },[]);
  //handle form changes
  const handleChange = (event)=>{
    const {name, value} = event.target;
    setFormData((prevFormData)=>({...prevFormData, [name]:value}));
  }
  //*handle form submit
  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(`user clicked on submit form: ${JSON.stringify(formData)}`);
    if(!submitting){
      setSubmitting(true);
      setErrors(inputValidations(formData));
    }
  };
  //*input validations
  const inputValidations = (inputValues) =>{
    let errors = {};    

    if(inputValues.issue_subject.length <3)
      errors.issue_subject = `Subject can't be less than 3 characters long`;
    if(inputValues.issue_description.length < 20)
      errors.issue_description = `Issue Description can't be less than 20 characters long`;
    if(!inputValues.status_id || inputValues.status_id <1)
      errors.status_id = `Please select a valid current status`;
    if(inputValues.status_update_msg.length <10)
      errors.status_update_msg = 'Status update description cannot be less than 10 characters long';

    return errors;
  };
  //*push ticket update (http/put) to server
  //TODO : display error to user when update is not successful  
  useEffect(() => {   
    if(Object.keys(errors).length===0 && submitting)
    {  
      setSubmitting(false); 
      const url =`https://localhost:7096/api/Ticket/${id}`;
      const postRequestOptions = {
        method: 'PUT', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      };
      fetch(url, postRequestOptions)
      .then((response)=>{
        if(response.status===204){
          console.log('ticket updated successfully');
          setServerResponse('Ticket updated successfully');
        }else{
          setServerResponse('Unknown issue occurred')
        }
      })          
      .catch((error)=>{
        console.error(error);
        setServerResponse('An error occurred while trying to updated the Ticket');
      })
    }
  }, [errors]); 
  
  if( formData ===undefined)
  {
    return <>
      <CircularProgress />
      <label>Still loading...</label>
    </>;
  }
  if(statusData===undefined)
  {
    return <>
      <CircularProgress />
      <label>Still loading...</label>
    </>;
  }  
  return (
    <>
      <div>Ticket number {id} update page. </div>
      {serverResponse ? <p className="">{serverResponse}</p> : null}
      {/* form with editable ticket properties */}
      <form name='ticket_update' id='ticket_update' onSubmit={handleSubmit}>
        <label htmlFor='issue_subject' id='lbl_issue_subject'>Subject</label>
        <input type='text' value={formData.issue_subject?formData.issue_subject:''} id='issue_subject' name='issue_subject' onChange={handleChange}></input>
        {errors.issue_subject ? <p>{errors.issue_subject}</p> : null }
        <label htmlFor='issue_description' id='lbl_issue_description'>Issue Description</label>
        <input type='text' value={formData.issue_description?formData.issue_description:''} id='issue_description' name='issue_description' onChange={handleChange}></input>
        {errors.issue_description ? <p>{errors.issue_description}</p> : null }
        {/* <label htmlFor='status' id='lbl_status'>Change Status</label> */}
        <DropDown id='status' name='status' dropDownData={statusData} onHandleChange={setFormData} selectName='status_id' selectedOption={formData.status_id}></DropDown>
        {errors.status_id ? <p>{errors.status_id}</p> : null }
        <label htmlFor='status_update_msg' id='lbl_status_update_msg'>Status Update Description</label>
        <input type='text' value={formData.status_update_msg?formData.status_update_msg:''} id='status_update_msg' name='status_update_msg' onChange={handleChange}></input>
        {errors.status_update_msg ? <p>{errors.status_update_msg}</p> : null }
        <p></p>
        <button className='btn' type='submit'>Submit Ticket Change</button>
      </form>
      <p></p>
      {/* back-button to redirect back to tickets list */}
      <button className='btn' onClick={()=>{navigate(`/tickets/tickets-list`)}}>Back To Tickets List</button>
    </>
    
  )
}

export default Ticket_Update