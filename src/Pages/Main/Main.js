import './Main.css'
import React, { useEffect, useState } from 'react' 
import AuthUser from '../../config/AuthUser'
import { AxiosCustom } from '../../config'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import Login from '../Auth/Login'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import { Link } from 'react-router-dom'

const Main = () => {
  const { getToken, token, logout } = AuthUser()
  const [ checklist, setChecklist ] = useState([])

  useEffect(() => {
    fetchChecklist()
  },[])

  const fetchChecklist = () => {
    AxiosCustom.get('/checklist')
    .then((res) => {
      let response = res.data.data
      console.log(response)
      setChecklist(response)
    },
    error => {
      let errorResponse = error.response.data
      console.error(errorResponse)
    })
  }

  if (!getToken()) {
    return <Login />
  }

  return (
      <section className='main'>
          <NavigationBar />
          <Container>
              <div className='d-flex justify-content-between align-items-center mt-5'>
                <h1>Your Checklist</h1>
                <Button variant='dark'>Add Checklist</Button>
              </div>
              <Row xs={1} md={2} lg={4} className='mt-3'>
                { checklist.map((checklist, index) => (
                  <Col key={index}>
                    <Link to='/' className='link'>
                      <Card>
                        <Card.Body>
                          <Card.Title className={checklist.checklistCompletionStatus ? 'complete' : ''}>{checklist.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )) }
              </Row>
          </Container>
      </section>
  )
}

export default Main