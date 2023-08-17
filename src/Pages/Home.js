import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Hometable from '../components/Hometable'
import Emsspinner from '../components/Emsspinner'
import { editContext, registerContext } from '../components/ContextShare'
import { deleteEmployee, getAllEmployees } from '../services/allApis'

function Home() {
    const { registerData, setRegisterData } = useContext(registerContext)
    const { editData, setEditData } = useContext(editContext)
    const navigate = useNavigate()
    const [showSpin, setShowSpin] = useState(true)
    const [search, setSearch] = useState("")
    // console.log(search);

    const addUser = () => {
        navigate("/register")
    }


    useEffect(() => {
        getAllUsers()
        setTimeout(() => {
            setShowSpin(false)
        }, 2000)
    }, [search])

    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        const result = await getAllEmployees(search)
        setUsers(result.data)
    }
    // Delete user

    const removeEmployee = async (id) => {
        const response = await deleteEmployee(id)
        console.log(response);
        if (response.status === 200) {
            getAllUsers()
        } else {
            console.log("Error :", response);
        }
    }

    return (

        <>

            {
                registerData ? <Alert variant="success" onClose={() => setRegisterData("")} dismissible>
                    {registerData.fname.toUpperCase()} Successfully Registered !!
                </Alert> : ""
            }
            <div className='container mt-5'>
                <div className='main-div'>
                    <div className='search-add d-flex justify-content-between'>
                        <div className='search col-md-4'>
                            <Form className='d-flex'>
                                <Form.Control type="text" placeholder="search employee"
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <Button>
                                    <i className='fa-solid fa-magnifying-glass fa-fade'></i>
                                </Button>
                            </Form>
                        </div>
                        <div className='add-btn'>
                            <Button onClick={addUser}>
                                <i className='fa fa-solid fa-user-plus'></i> Add
                            </Button>
                        </div>
                    </div>
                    <div className='table-div'>
                        {
                            showSpin ? <Emsspinner />
                                : <Hometable removeEmployee={removeEmployee} displayData={users} />
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home