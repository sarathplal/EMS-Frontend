import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap'
import Select from "react-select"
import Emsspinner from '../components/Emsspinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register, viewemployee, editEmployee } from '../services/allApis';
import { useNavigate, useParams } from 'react-router-dom';
import { editContext, registerContext } from '../components/ContextShare';
import { BASE_URL } from '../services/base_url';


function Edit() {

  const { id } = useParams()
  const [existingImg, setExistingImg] = useState("")
  // const { editData, setEditData } = useContext(editContext)
  const navigate = useNavigate()

  const getEmployeeDetails = async () => {
    let { data } = await viewemployee(id)
    setNormalInput(data);
    setStatus(data.status)
    setExistingImg(data.profile)
  }

  const [showSpin, setShowSpin] = useState(true)

  useEffect(() => {
    getEmployeeDetails()
  }, [id])



  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
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


  // Handle register

  const handleUpdate = async (e) => {
    alert("Inside update")

    const { fname, lname, email, mobile, gender, location } = normalInput

    if (!fname || !lname || !email || !mobile || !gender || !status || !image || !location) {
      toast.error("Please fill the form completely")
    } else {

      // toast.success("Registered successfully")

      // make api call to backend
      // Body
      const data = new FormData()
      image ? data.append("user_profile", image) : data.append("user_profile", existingImg)

      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("location", location)
      data.append("status", status)

      // Header
      if (image) {
        var headerConfig = {
          "Content-Type": "multipart/form-data"
        }
      } else {
        var headerConfig = ""
      }


      // make api call to service
      const response = await editEmployee(id, data, headerConfig)
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

        //  Navigate to home page
        navigate("/")

        // Share response data to home page using context api
        // setEditData(response.data)

        // setTimeout(() => {
        //   toast.success("Successfully Registered")

        // }, 2000)

        // } else {
        //   if (response.data) {
        //     toast.error(response.data)
        //   }
      }

    }
  }

  // 
  useEffect(() => {

    if (image) {
      setExistingImg("")
      setPreview(URL.createObjectURL(image))
    }

    setTimeout(() => {
      setShowSpin(false)
    }, 2000)
  }, [image])



  return (

    <>
      {
        showSpin ? <Emsspinner /> :
          <div className="d-flex justify-content-center">
            <div className="container mt-5">
              <h2>Edit Employee Details</h2>
              <Card className='shadow mt-3 p-3'>
                <div className="text-center mb-3">
                  <img width={'50px'} height={'50px'} className='rounded' src={preview ? preview : `${BASE_URL}/uploads/${existingImg}`}></img>
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
                        checked={normalInput.gender === 'Male' ? true : false}
                        onChange={setUserInputs}
                      />
                      <Form.Check type="radio" aria-label="radio 2"
                        label={'Female'}
                        name="gender"
                        value={'Female'}
                        checked={normalInput.gender === 'Female' ? true : false}
                        onChange={setUserInputs}
                      />
                      <Form.Check type="radio" aria-label="radio 3"
                        label={'Other'}
                        name="gender"
                        value={'Other'}
                        checked={normalInput.gender === 'Other' ? true : false}
                        onChange={setUserInputs}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicstatus">
                      <Form.Label>Select Employee status</Form.Label>
                      <Select placeholder={status} onChange={setStatusValue} options={options}></Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicimage">
                      <Form.Label>Choose Profile Image</Form.Label>
                      <Form.Control onChange={setProfile} type="file" name='userProfile' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasiclocation">
                      <Form.Label>Employee Location</Form.Label>
                      <Form.Control type="text" name="location" onChange={setUserInputs} placeholder="Enter location" value={normalInput.location} />
                    </Form.Group>
                    <Button onClick={handleUpdate} className="w-100">Submit</Button>

                  </Row>

                </Form>
              </Card>
            </div>
          </div>
      }
    </>

  )
}

export default Edit