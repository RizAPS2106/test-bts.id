import './Main.css'
import React, { useState } from 'react'
import AuthUser from '../../config/AuthUser'
import { AxiosCustom } from '../../config'
import Login from '../Auth/Login'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import { Col, Container, Row, Card } from 'react-bootstrap'

const Main = () => {
  const [checklists, setChecklists] = useState([]);
  const { getToken, token, logout } = AuthUser()
  
  const fetchDataChecklists = React.useCallback(async () => {
    AxiosCustom.get('/checklist')
    .then(res => {
        setChecklists(res.data)
        console.log(res)
    },
    error => {
        console.error('Error Fetching Data : ',error)
    })
  },[])

  if(!getToken()) {
    return <Login />
  }

  return (
    <section className='main'>
        <NavigationBar />
        <Container>
            <h1 className='mt-5'>Your Checklists</h1>
            <Row xs={1} md={2} lg={4} className='mt-3'>
              <Col>
                <Card>
                  <Card.Body></Card.Body>
                </Card>
              </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Main