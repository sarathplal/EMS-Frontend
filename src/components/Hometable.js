import React from 'react'
import { Row, Card, Table, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/base_url'

function Hometable({ displayData, removeEmployee }) {

  return (
    <div className='mt-5 p-3'>
      <Row className=''>
        <Card ClassName='p-2'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Profile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                displayData?.length > 0 ? displayData.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.fname} {item.lname}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td><span className={item.status === "Active" ? 'btn btn-success btn-sm' : "btn btn-danger btn-sm"}>{item.status}</span></td>
                    <td>
                      <img
                        style={{
                          width: '50px',
                          height: '50px'
                        }}
                        src={`${BASE_URL}/uploads/${item.profile}`}
                        className='rounded'
                      />
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">

                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item >
                            <Link to={`/view/${item._id}`} style={{ textDecoration: 'none', color: '' }}>View</Link>
                          </Dropdown.Item>
                          <Dropdown.Item><Link to={`/edit/${item._id}`}>Edit</Link></Dropdown.Item>
                          <Dropdown.Item  ><div onClick={() => removeEmployee(item._id)}>
                            <i className='fa-solid fa-trash text-danger '></i> Delete
                          </div></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )) : <div>Sorry Nothing to display</div>

              }
            </tbody>
          </Table>
        </Card>
      </Row>
    </div>
  )
}

export default Hometable