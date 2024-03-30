import './complaints.css';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import CustomNavbar from './Navbar';

const Complaints = () => {
    const [cookies] = useCookies(['token']);
    const [inputValue, setInputValue] = useState({
        wasteType: "",
        description: "",
        pickupTime: "",
        pickupDate: ""
    });
    const { wasteType, description, pickupTime, pickupDate } = inputValue;

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = cookies.token;
            // console.log(pickupDate);
            const { data } = await axios.post("http://localhost:4000/request",
                {
                    ...inputValue
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                },
                { withCredentials: true }
            );

            const { success, message } = data;
            if (success) {
                alert(message);
            } else {
                alert(message);
            }
            setInputValue({
                wasteType: "",
                description: "",
                pickupTime: "",
                pickupDate: ""
            });
        } catch (err) {
            alert(err)
        }

    }



    return (
        <>
            <CustomNavbar />
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="heading">
                        <h2>New Complaint</h2>
                        <p>Raise a new complaint</p>
                    </div>

                    <div className="input-group">
                        <label for="wasteType">Waste Type</label>
                        <select
                            name="wasteType"
                            value={wasteType}
                            id="wasteType"
                            className="input-field"
                            onChange={handleOnChange} >
                            <option value="">Select an option...</option>
                            <option value="wet">Wet Waste</option>
                            <option value="dry">Dry Waste</option>
                        </select>
                    </div>

                    <div className='input-group' style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="pickupDate">Pickup Date:</label>
                        <input type="date" id="pickupDate" name="pickupDate" value={pickupDate} onChange={handleOnChange} />
                    </div>

                    <div className="input-group">
                        <label for="pickupTime">Pickup Time</label>
                        <select
                            name="pickupTime"
                            value={pickupTime}
                            id="pickupTime"
                            className="input-field"
                            onChange={handleOnChange} >
                            <option value="">Select an option...</option>
                            <option value="morning">9:00 am - 12:00 pm</option>
                            <option value="afternoon">12:00 pm - 3:00 pm</option>
                            <option value="evening">3:00 pm - 6:00 pm</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label for="description">Description</label>
                        <textarea
                            name="description"
                            value={description}
                            id="description"
                            className="input-field"
                            placeholder="Describe your issue..."
                            onChange={handleOnChange}
                            rows="5" />
                    </div>

                    <div className="input-group">
                        <button className="btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Complaints;