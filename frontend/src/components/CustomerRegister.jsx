import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import logo from '../assets/vijay1.png'
const Customerregister = () => {
    const { id } = useParams();
    const [data, setdata] = useState({});
    const Navigate = useNavigate();
    const toastOption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleSubmit = async (event) => {
        alert("hello")
        event.preventDefault();
        if (handlevalidation()) {
            const { name, email, password } = user;
            const re = await fetch('http://localhost:7000/customer/register', {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await re.json();
            alert(data.msg)
            Navigate('/customer/login/' + id);
        }
    }
    const handlevalidation = () => {
        const { email, name, confirmPassword, password } = user;
        if (password !== confirmPassword) {
            toast.error("password and confirm password should be same", toastOption);
            return false;
        }
        else if (name.length <= 3) {
            toast.error("username must be greater than 3 character", toastOption);
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
                    <div className='d-flex'>
                        <div>
                            <div className='text-white'>CUSTOMER</div>
                            <div className='text-white'>REGISTRATION</div>
                        </div>
                        <img src={logo} alt="logo" className='logo' />

                    </div>
                    <input type="text" placeholder='Username' name='name' onChange={(e) => handlechange(e)} />
                    <input type="email" placeholder='Email' name='email' onChange={(e) => handlechange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handlechange(e)} />
                    <input type="password" placeholder='confirmPassword' name='confirmPassword' onChange={(e) => handlechange(e)} />
                    <button type='submit'> create-user</button>
                    <span> Already have an account ? <Link to={'/customer/login/' + id}>Login</Link></span>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
}
export default Customerregister