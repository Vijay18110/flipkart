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
import { CradContext } from './Context'
const Nav = () => {
    const Navigate = useNavigate();
    const [cookie, createcookie, removecookie] = useCookies();
    const { id } = useParams();
    const { count, setcount, counttotalcard } = useContext(CradContext)
    const logoutCustomer = () => {
        removecookie("customer");
        setcount(0)
        Navigate('/subcategory/' + id);

    }

    useEffect(() => {

    }, [])
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
                <div>
                    <img src={user} alt="" />
                    <Link className='fs-5' to={"/customer/register/" + id}>register</Link>
                    <img className='ps-1 toggle1' src={toggle} alt="" />
                </div>
            )
        }
    }
    return (

        <nav class="navbar navbar-expand-sm navbar-dark bg-light navbar11 ">
            <div class="container">
                <div className="row">
                    <div className="col-md">
                        <a class="navbar-brand  " href="javascript:void(0)">
                            <img style={{ width: "80px", height: "80px" }} src={logo} alt="" />
                        </a>
                    </div>
                    <div className="col-md d-flex ms-3">
                        <form class="">
                            <div className='d-flex'>
                                <i className='searchicon mb-3'><IoSearch></IoSearch></i>
                                <input class=" input form-control me-2" type="text" placeholder="Search for Products,Brands and More" />
                            </div>

                        </form>
                    </div>
                    <div className="col-md collast  ">
                        <button class="btn me-5 " type="button" >
                            {
                                data()
                            }
                        </button>
                        <div class=" " id="mynavbar">
                            <ul class="navbar-nav me-auto  ">
                                <Link to={"/carddetail/" + cookie.customer}>
                                    <li class="nav-item lic text-black d-flex ">
                                        <i> <img className='rounded-circle mt-3 imgcard' src={card} alt="" /></i>

                                        {/* <Link class="nav-link fs-5 mt-1" href="javascript:void(0)"> <span className=''>Cart</span></Link> */}
                                        <div type="button" class="btn position-relative">
                                            <span className='fs-3'> cart</span>
                                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {count}
                                                <span class="visually-hidden">unread messages</span>
                                            </span>
                                        </div>
                                    </li>
                                </Link>
                                <li>  <div className=' '>
                                    <button onClick={logoutCustomer} className='fs-5 btn text-center justify-content-center'>logout</button>
                                </div></li>
                            </ul>

                        </div>
                    </div>
                </div>



            </div>
        </nav >

    )
}

export default Nav
