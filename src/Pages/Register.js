import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap'
import Select from "react-select"
import Emsspinner from '../components/Emsspinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { registerContext } from '../components/ContextShare';

function Register() {

  const { registerData, setRegisterData } = useContext(registerContext)

  const navigate = useNavigate()
  // State to hold normal inputs
  const [normalInput, setNormalInput] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })

  // to update normal inputs
  const setUserInputs = (e) => {
    const { name, value } = e.target
    setNormalInput({ ...normalInput, [name]: value })
  }

  // State to hold status
  const [status, setStatus] = useState("")

  // to update status
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  // state to hold image
  const [image, setImage] = useState("")

  // to update image
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  }

  const [preview, setPreview] = useState("")

  const [showSpin, setShowSpin] = useState(true)

  useEffect(() => {

    if (image) {
      setPreview(URL.createObjectURL(image))
    }

    setTimeout(() => {
      setShowSpin(false)
    }, 2000)
  }, [image])

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];


  const handleRegister = async (e) => {

    const { fname, lname, email, mobile, gender, location } = normalInput
    if (!fname || !lname || !email || !mobile || !gender || !status || !image || !location) {
      toast.error("Please fill the form completely")
    } else {

      // toast.success("Registered successfully")
      // make api call to backend
      // Body
      const data = new FormData()
      data.append("user_profile", image)
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("location", location)
      data.append("status", status)

      // Header
      const headerConfig = {
        "Content-Type": "multipart/form-data"
      }
      // make api call to service
      const response = await register(data, headerConfig)
      console.log(response.data);
      if (response.status === 200) {

        // Form reset
        setNormalInput({
          ...normalInput,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        })
        setStatus("")
        setImage("")

        // Share response data to home page using context api
        setRegisterData(response.data)

        setTimeout(() => {
          toast.success("Successfully Registered")
          // Navigate to home page
          navigate("/")
        }, 2000)

      } else {
        if (response.data) {
          toast.error(response.data)
        }
      }

    }
  }

  return (
    <>
      {
        showSpin ? <Emsspinner /> :
          <div className="d-flex justify-content-center">
            <div className="container mt-5">
              <h2>Register Employee Details</h2>
              <Card className='shadow mt-3 p-3'>
                <div className="text-center mb-3">
                  <img width={'50px'} height={'50px'} className='rounded' src={preview ? preview : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}></img>
                </div>
                <Form>
                  <Row>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicfname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name='fname' placeholder="Enter First Name" value={normalInput.fname} onChange={setUserInputs} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasiclname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Last name" name='lname' value={normalInput.lname} onChange={setUserInputs} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicemail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="text" placeholder="Enter email" name='email' value={normalInput.email} onChange={setUserInputs} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicmobile">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control type="text" placeholder="Enter Mobile Number" name='mobile' value={normalInput.mobile} onChange={setUserInputs} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicgender">
                      <Form.Label>Select Gender</Form.Label>
                      <Form.Check type="radio" aria-label="radio 1"
                        label={'Male'}
                        name="gender"
                        value={'Male'}
                        onChange={setUserInputs}
                      />
                      <Form.Check type="radio" aria-label="radio 2"
                        label={'Female'}
                        name="gender"
                        value={'Female'}
                        onChange={setUserInputs}
                      />
                      <Form.Check type="radio" aria-label="radio 3"
                        label={'Other'}
                        name="gender"
                        value={'Other'}
                        onChange={setUserInputs}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicstatus">
                      <Form.Label>Select Employee status</Form.Label>
                      <Select onChange={setStatusValue} options={options}></Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicimage">
                      <Form.Label>Choose Profile Image</Form.Label>
                      <Form.Control onChange={setProfile} type="file" name='userProfile' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasiclocation">
                      <Form.Label>Employee Location</Form.Label>
                      <Form.Control type="text" name="location" onChange={setUserInputs} placeholder="Enter location" value={normalInput.location} />
                    </Form.Group>
                    <Button onClick={handleRegister} className="w-100">Submit</Button>

                  </Row>

                </Form>
              </Card>
            </div>
            <ToastContainer />
          </div>
      }
    </>
  )
}

export default Register