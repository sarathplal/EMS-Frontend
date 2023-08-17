import React from 'react'
import {Navbar,Container} from 'react-bootstrap'
function Emsheader() {
  return (
    <>
     <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand href="/">
          <i class="fa-solid fa-list-check"></i>
            {' '}
            Employee Management
          </Navbar.Brand>
        </Container>
      </Navbar>

    </>
  )
}

export default Emsheader