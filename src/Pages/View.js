import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Emsspinner from '../components/Emsspinner'
import { useParams } from 'react-router-dom';
import { viewemployee } from '../services/allApis';
import { BASE_URL } from '../services/base_url';

function View() {

    const { id } = useParams()
    console.log(id);

    const [displayData, setDisplayData] = useState({})

    const viewUser = async () => {
        const { data } = await viewemployee(id)
        setDisplayData(data)
    }
    console.log(displayData);
    const [showSpin, setShowSpin] = useState(true)

    useEffect(() => {
        viewUser()
        setTimeout(() => {
            setShowSpin(false)
        }, 2000)
    }, [])

    return (
        <>
            {
                showSpin ? <Emsspinner /> :
                    <div className="conatiner">
                        <Card className='shadow col-lg-6 mx-auto'>
                            <Card.Body>
                                <div className="col">
                                    <div className="profile d-flex justify-content-center">
                                        <img width={'150px'} height={'150px'} src={`${BASE_URL}/uploads/${displayData.profile}`} alt="profile" srcset="" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3>{displayData.fname} {displayData.lname}</h3>
                                    <h5><i class="fa-solid fa-envelope fa-beat-fade"></i>
                                        <span className='fw-bolder ms-1'>{displayData.email}</span></h5>
                                    <h5><i class="fa-solid fa-mobile fa-shake"></i>
                                        <span className='fw-bolder ms-1'>{displayData.mobile}</span></h5>
                                    <h5><i class="fa-solid fa-person"></i>
                                        <span className='fw-bolder ms-1'>{displayData.gender}</span></h5>
                                    <h5><i class="fa-solid fa-location fa-bounce"></i>
                                        <span className='fw-bolder ms-1'>{displayData.location}</span></h5>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
            }
        </>
    )
}

export default View