import React from 'react'
import { Spinner } from 'react-bootstrap'
function Emsspinner() {
  return (
    <div className='mt-5 d-flex justify-content-center align-items-center'>
         <Spinner className="me-2" animation="grow" variant="primary" />
         <span className='fw-bolder'>loading...</span>
    </div>
  )
}

export default Emsspinner