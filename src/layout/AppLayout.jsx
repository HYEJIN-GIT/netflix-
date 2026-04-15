import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link, Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
  const [keyword,setKeyword] = useState("")
  const navigate = useNavigate()
  const searchByKeyword = (e)=>{
    e.preventDefault()
    navigate(`/movies?q=${keyword}`)
    setKeyword('')
  }
  return (
    <div className='nav-css'>
      <Navbar expand="lg" className="bg-black navbar-dark">
      <Container fluid>
        <Navbar.Brand className="logo">       
          <img src='https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg' width={100}></img>
      
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'
             }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
          </Nav.Link>
            <Nav.Link 
            as={Link} to="/movies"
            >Movies</Nav.Link>
            </Nav>
          <Form className="d-flex" onSubmit={searchByKeyword}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
            />
            <Button variant="danger" type='submit'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Outlet>

    </Outlet>

    </div>
  )
}

export default AppLayout
