import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import axios from 'axios'
import logo from '../assets/vijay1.png'
// import './Adminlog.css'
const Customerlogin = () => {
    const { id } = useParams();
    const [data, setdata] = useState({});
    const [cookie, createcookie, removecookie] = useCookies();

    const toastOption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }
    const Navigate = useNavigate()
    const [user, setuser] = useState({
        name: "",

        password: "",

    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handlevalidation()) {
            const { name, password } = user;
            const re = await fetch('http://localhost:7000/customer/register', {
                method: "PATCH",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ password: password, username: name })
            })
            const data = await re.json();
            if (data.msg === "valid user") {
                createcookie("customer", name)
                Navigate("/subcategory/" + id);
            }
            else alert(data.msg)
        }
    }
    const handlevalidation = () => {
        const { name, password } = user;
        if (password === "") {
            toast.error("username and password is required", toastOption);
            return false;
        }
        else if (name === "") {
            toast.error("username and password is required", toastOption);
            return false;
        }
        else return true;
    }
    const handlechange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }


    return (
        <>
            <div className='formContainer1'>
                <form className='' onSubmit={(e) => handleSubmit(e)}>
                    <img src={logo} alt="logo" className='logo' />
                    <h3 className='text-white'> Customer Login</h3>
                    <input type="text" placeholder='Username' name='name' onChange={(e) => handlechange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handlechange(e)} />
                    <button type='submit'> create-user</button>
                    <span> Don't have an account ? <Link to={'/customer/register/' + id}>register</Link></span>
                </form>
            </div>
            <ToastContainer></ToastContainer>

        </>
    )
}

export default Customerlogin

