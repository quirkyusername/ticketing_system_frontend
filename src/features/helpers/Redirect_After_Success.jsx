import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

// const Redirect_After_Success = ({operation_msg,redirect_page_name, redirect_url}) =>{
const Redirect_After_Success = () =>{
  const navigate = useNavigate();
  const [progress, setProgress] = useState(10);
  const [queryParameters] = useSearchParams()
  const operation_msg = queryParameters.get('operation_msg')
  const redirect_page_name = queryParameters.get('redirect_page_name')
  const redirect_url = queryParameters.get('redirect_url')

  useEffect (()=>{
    // const timer = setInterval(() => {
    //   setProgress((prevProgress) => (prevProgress + 10)); 
    // }, 400);

    // return () => {
    //   clearInterval(timer);
    // };
    if (progress<=90){
      setTimeout(()=>{
        setProgress((prevProgress) => (prevProgress + 10));
      },400)
    }
  },[progress]);
  
  const redirect = ()=>{
      navigate(redirect_url);
  };
  if(progress>=90){
    redirect()
  } 
  
  
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