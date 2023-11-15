import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Redirect_After_Success = () =>{
  const navigate = useNavigate();
  const [progress, setProgress] = useState(10);
  const [queryParameters] = useSearchParams()
  const operation_msg = queryParameters.get('operation-msg')
  const redirect_page_name = queryParameters.get('redirect-page-name')
  const redirect_url = queryParameters.get('redirect-url')

  useEffect (()=>{
    if (progress<90){
      setTimeout(()=>{
        setProgress((prevProgress) => (prevProgress + 10));
        if(progress>=80){
          redirect()
        } 
      },400)
    }
  },[progress]);
  
  const redirect = ()=>{
      navigate(redirect_url);
  };

  return (
  <>
    <div>
      <h3>{operation_msg? operation_msg:'Operation'} has been successfully completed!</h3>
      <h5>Redirecting to {redirect_page_name}</h5>
      <CircularProgress variant='determinate' value={progress}></CircularProgress>
      <p></p>
      <button className='btn' onClick={()=>{navigate(redirect_url)}}>Go To {redirect_page_name? redirect_page_name:'Previous Page'}</button>
    </div>
  </>);
}

export default Redirect_After_Success;