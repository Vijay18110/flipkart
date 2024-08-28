import React, { useContext, useEffect, useState } from 'react'
import card from './assets/card.svg'
import Store from './assets/Store-9eeae2.svg'
import user from './assets/user.svg'
import toggle from './assets/toggle.svg'
import { IoSearch } from "react-icons/io5";
import logo from './assets/vijay1.png'
import { useCookies } from 'react-cookie'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Nav.css'
import { useDispatch, useSelector } from 'react-redux';
const Nav = () => {
    const count = useSelector((state) => state.managecard);
    const Navigate = useNavigate();
    const [cookie, createcookie, removecookie] = useCookies();
    const { id } = useParams();
    const logoutCustomer = () => {
        removecookie("customer");
        Navigate('/subcategory/' + id);
    }
    const data = () => {
        if (cookie["customer"] != null) {
            return (
                <h6 className='fs-5'>
                    @
                    {
                        cookie.customer
                    }</h6>
            )
        }
        else {
            return (
                <Link className='fs-5' to={"/customer/register/" + id}>
                    <div>
                        <img src={user} alt="" />
                        <span>register</span>
                        <img className='ps-1 toggle1' src={toggle} alt="" />
                    </div>
                </Link>
            )
        }
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-light navbar11 ">
            <div className="container-fluid">
                <div className="row  w-100">
                    <div className="col-md-2 col-2">
                        <a className="navbar-brand  " href="javascript:void(0)">
                            <img style={{ width: "80px", height: "80px" }} src={logo} alt="" />
                        </a>
                    </div>
                    <div className="col-md-4 col-12  d-flex from-group" >
                        <input type="text" className="input from-control" name="" id="" />
                    </div>
                    <div className="col-md-6 col-10  d-flex  justify-content-around align-item-center">
                        <button className="btn me-2 " type="button" >
                            {
                                data()
                            }
                        </button>
                        <div className=" " id="mynavbar">
                            <ul className="navbar-nav me-auto d-flex f-wrap">
                                <Link to={"/carddetail/" + cookie.customer}>
                                    <li className="nav-item lic text-black d-flex ">
                                        <i> <img className='rounded-circle mt-3 imgcard' src={card} alt="" /></i>
                                        {/* <Link className="nav-link fs-5 mt-1" href="javascript:void(0)"> <span className=''>Cart</span></Link> */}
                                        <div type="button" className="btn position-relative">
                                            <span className='fs-3'> cart</span>
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {count}
                                                <span className="visually-hidden">unread messages</span>
                                            </span>
                                        </div>
                                    </li>
                                </Link>
                                <li>  <div className=' '>
                                    <button onClick={logoutCustomer} className='fs-5 btn text-center justify-content-center'>logout</button>
                                </div></li>
                                <Link to='/userorder'> <li>  <div className=' '>
                                    <button className='fs-5 btn text-center justify-content-center'>view order</button>
                                </div></li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}
export default Nav
