import './complaintHistory.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNav';

const AllRequests = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [allRequests, setAllRequests] = useState([]);
    const [zeroComplaints, setZeroComplaints] = useState(false);
    const [currentReq, setCurrentReq] = useState();

    useEffect(() => {
        fetchComplaints();
    }, [])

    useEffect(() => {
        if (currentReq) {
            updateStatus();
            window.location.reload();
        }
    }, [currentReq]);

    const updateStatus = async () => {
        console.log("inside updateStatus")
        const token = cookies.token;
        const res = await axios.patch('http://localhost:4000/request/update',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    _id: currentReq
                }
            });

        if (res.status === 200) {
            // setAllRequests(res.data);
            alert("Successfully approved!");
        } else if (res.status === 403) {
            alert(res.data.message);
            navigate('/');
        } else {
            alert(res.data.message);
        }
    }

    const fetchComplaints = async () => {
        const token = cookies.token;
        const res = await axios.get('http://localhost:4000/request/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            setAllRequests(res.data);
        } else if (res.status === 204) {
            setZeroComplaints(true);
        } else {
            alert(res.data.message);
        }
    }
    // fetchComplaints()

    const handleLogout = () => {
        removeCookie('token');
        navigate("/login");
    };

    return (
        <>

            <div>
                <AdminNavbar onLogout={handleLogout} />

                <h1 className='page-heading' style={{ color: 'orange', fontWeight: 'bold' }}>Unresolved Queries</h1>


                {zeroComplaints &&
                    <div className='not-found-div'>
                        <h4>All good! No complaints were found.</h4>
                    </div>
                }
                {!zeroComplaints &&
                    <div className="container">
                        {/* <div id="pending"> */}
                            <table className='table table-fixed'>
                                <thead>
                                    <tr>
                                        <th scope="col" class="col-xs-3">Description</th>
                                        <th scope="col" class="col-xs-3">Type</th>
                                        <th scope="col" class="col-xs-3">Pickup Date</th>
                                        <th scope="col" class="col-xs-3">Pickup Time</th>
                                        <th scope="col" class="col-xs-3">Status</th>
                                        <th scope="col" class="col-xs-3">Change Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {!zeroComplaints && allRequests.map((val, index) => {
                                        return (

                                            !val.isResolved &&
                                            <tr className='table-item' key={index}>
                                                <td className='col-xs-6'>{val.description}</td>
                                                <td className={`c-type ${val.wasteType === 'dry' ? 'brown-text' : val.wasteType === 'wet' ? 'blue-text' : ''}`}>{val.wasteType}</td>
                                                <td>{val.pickupDate !== null ? val.pickupDate.substring(0, 10) : ""}</td>
                                                <td>{val.pickupTime}</td>
                                                <td><span className={val.isResolved ? 'status green' : 'status yellow'}>{val.isResolved ? "Resolved" : "Pending"}</span></td>
                                                <td className=''>
                                                    <button
                                                        style={{
                                                            backgroundColor: '#007bff',
                                                            color: 'white',
                                                            padding: '4px 8px',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={e => { setCurrentReq(val._id); console.log(currentReq) }}
                                                    >
                                                        Mark as complete
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>

                            </table>
                        {/* </div> */}

                        <br />
                        <br />

                        {/* <div id="completed"> */}
                            <h1 className='page-heading' style={{ color: 'green', fontWeight: 'bold' }}>Resolved Queries</h1>

                            <table className='table table-fixed'>

                                <thead>
                                    <tr>
                                        <th scope="col" class="col-xs-3">Description</th>
                                        <th scope="col" class="col-xs-3">Type</th>
                                        <th scope="col" class="col-xs-3">Pickup Date</th>
                                        <th scope="col" class="col-xs-3">Pickup Time</th>
                                        <th scope="col" class="col-xs-3">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!zeroComplaints && allRequests.map((val, index) => {
                                        return (

                                            val.isResolved &&
                                            <tr className='table-item' key={index}>
                                                <td className='col-xs-6'>{val.description}</td>
                                                <td className={`c-type ${val.wasteType === 'dry' ? 'brown-text' : val.wasteType === 'wet' ? 'blue-text' : ''}`}>{val.wasteType}</td>
                                                <td>{val.pickupDate !== null ? val.pickupDate.substring(0, 10) : ""}</td>
                                                <td>{val.pickupTime}</td>
                                                <td><span className={val.isResolved ? 'status green' : 'status yellow'}>{val.isResolved ? "Completed" : "Pending"}</span></td>

                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>

                            </table>
                        </div>

                    // </div>
                }
            </div>
        </>
    );
}

export default AllRequests;