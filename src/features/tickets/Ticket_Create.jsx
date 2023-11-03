import React, { useEffect, useState } from 'react'
import DropDown from '../form-components/DropDown'

const Ticket_Create = () => {
  const [formData, setFormData] = useState({issue_subject: '', issue_description:'', status_id:'', status_update_msg:''});
  // const [statusData, setStatusData] = useState({id:'',status:''});
  const [statusData, setStatusData] = useState();

  // function renameKey ( obj, oldKey, newKey ) {
  // obj[newKey] = obj[oldKey];
  // delete obj[oldKey];
  // }

  useEffect(()=> {
    
    const url = `https://localhost:7096/api/status`
    fetch(url,{method: 'GET'})
    .then((response)=>response.json())
    .then((data)=> {
      // const arr = JSON.parse(data);
      // data.forEach( obj => renameKey( obj, 'id', 'status_id' ) );
      // const updatedJson = JSON.stringify( data );
      console.log(data);
      setStatusData(data);
      setFormData((prevFormData)=>({...prevFormData, 'status_id':data[0].id}))
    })
    .catch((error)=>{console.log(error)})
  },[]);
  
  const handleChange = (event)=>{
    const {name, value} = event.target;
    setFormData((prevFormData)=>({...prevFormData, [name]:value}));
  }
  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(formData)

  };

  if (statusData === undefined) {
    return <>Still loading...</>;
  }else{
    
  }
  
  return (
    <>
      <div>Ticket_Create</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='issue_subject'>Subject:</label>
        <input type='text' id='issue_subject' name='issue_subject' value={formData.issue_subject} onChange={handleChange}/>
        <label htmlFor='issue_description'>Issue Description:</label>
        <input type='text' id='issue_description' name='issue_description' value={formData.issue_description} onChange={handleChange}/>
        <label htmlFor='status_update_msg'>Ticket Updates:</label>
        <input type='text' id='status_update_msg' name='status_update_msg' value={formData.status_update_msg} onChange={handleChange}/>
        
        <DropDown onHandleChange = {setFormData} dropDownData = {statusData} selectOptionId = 'status_id' />

        <button type='submit'>Create Ticket</button>
      </form>
      
    </>
    
  );
}

export default Ticket_Create