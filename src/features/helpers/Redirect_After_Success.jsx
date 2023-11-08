import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

// const Redirect_After_Success = ({operation_msg,redirect_page_name, redirect_url}) =>{
const Redirect_After_Success = () =>{
    const navigate = useNavigate();
    // const {operation_msg, redirect_page_name, redirect_url} = useSearchParams()
    const [queryParameters] = useSearchParams()
    const operation_msg = queryParameters.get('operation_msg')
    const redirect_page_name = queryParameters.get('redirect_page_name')
    const redirect_url = queryParameters.get('redirect_url')
    return (
    <>
        <div>
            <h3>{operation_msg? operation_msg:'Operation'} has been successfully completed!</h3>
            <h5>Redirecting in ...</h5>
            <button className='btn' onClick={()=>{navigate(redirect_url)}}>Go To {redirect_page_name? redirect_page_name:'Previous Page'}</button>
        </div>
    </>);
}

export default Redirect_After_Success;