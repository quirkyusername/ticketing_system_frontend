import React, { useEffect, useState } from 'react'
import DropDown from '../form-components/DropDown'
import { CircularProgress } from '@mui/material';
import Redirect_After_Success from '../helpers/Redirect_After_Success';
import { useNavigate } from 'react-router-dom';

const Ticket_Create = () => {
  const [formData, setFormData] = useState({issue_subject: '', issue_description:'', status_id:null});
  const [statusData, setStatusData] = useState();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=> {
    const url = `https://localhost:7096/api/status`;
    fetch(url,{method: 'GET'})
    .then((response)=>response.json())
    .then((data)=> {
      setStatusData(data);      
    })
    .catch((error)=>{console.error(error)})
  },[]);
  
  const handleChange = (event)=>{
    const {name, value} = event.target;
    setFormData((prevFormData)=>({...prevFormData, [name]:value}));
  }
  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(formData);
    setErrors(validateValues(formData));
    if(!submitting){    
      setSubmitting(true);
    }
  };

  const validateValues = (inputValues) => {
    let errors = {};
    if(formData.issue_subject.length <3)
      errors.issue_subject = `Subject can't be less than 3 characters long`;
    if(formData.issue_description.length < 20)
      errors.issue_description = `Issue Description can't be less than 20 characters long`;
    if(!formData.status_id)
      errors.status_id = `Current status can't be left empty`;
    return errors;
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) 
    {
      const url =`https://localhost:7096/api/Ticket`;
      const postRequestOptions = {
        method: 'POST', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      };
      fetch(url, postRequestOptions)
      .then((response)=>response.json())
      .then((data)=>{
        console.log(`server response after post:${JSON.stringify(data)}`);
        navigate(`/redirect-after-success/?operation-msg=Ticket&redirect-page-name=Tickets List&redirect-url=/tickets/tickets-list`);         
        setSubmitting(false);     
      }).catch((error)=>{
        console.error(error);     
        setSubmitting(false);   
      })
    }
  }, [errors]);

  if (statusData === undefined) {
    return <>
      <CircularProgress />
      <label>Still loading...</label>
    </>;
  }
  
  return (
    <>
      <div>Ticket_Create</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='issue_subject'>Subject:</label>
        <input type='text' id='issue_subject' name='issue_subject' value={formData.issue_subject} onChange={handleChange}/>
        {errors.issue_subject ? <p className='error'>{errors.issue_subject}</p>:null}
        <label htmlFor='issue_description'>Issue Description:</label>
        <input type='text' id='issue_description' name='issue_description' value={formData.issue_description} onChange={handleChange}/>
        {errors.issue_description ? <p>{errors.issue_description}</p> : null}
        <DropDown onHandleChange = {setFormData} dropDownData = {statusData} selectName= 'status_id' />
        {errors.status_id ? <p>{errors.status_id}</p> : null}
        <button type='submit'>Create Ticket</button>
      </form>
    </>
    
  );
}

export default Ticket_Create