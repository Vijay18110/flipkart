import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import './Customer.css'
import Banner from './Banner'
import Nav from './Nav'
import hero from './assets/heropic.webp'
import CategorydataLoad from './CategorydataLoad'
import { Link } from 'react-router-dom'
const idmobile = "66ba592e520eaf6292dd891a";
const Customer = () => {

    useEffect(() => {
        // loadsubcategory()
        loadsubcategoryomobile(idmobile)
    }, [])
    const [subcatdata, setsubcatdata] = useState([])
    const loadsubcategoryomobile = async (idmobile) => {
        const re = await fetch("http://localhost:7000/subcategory", {
            method: "PATCH",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ categoryid: idmobile })
        })
        const data = await re.json();
        setsubcatdata(data)
    }


    return (
        <>




            <div className=' m-0  container-fluid text-center fs-4 text-white'>
                <div className="row bg-primary">
                    <Nav></Nav>



                </div>

                <CategorydataLoad></CategorydataLoad>



                <div className="row ">
                    <div className="col-md mt-3">
                        <Banner></Banner>
                    </div>
                </div>
                <div className='row container mt-3  '>
                    <div className='col-md   bannerbottom'>
                        <div className="row   d-flex ">
                            <div className="col-md-10  d-flex flex-wrap gap-2">

                            </div>
                            <div className="col-md-2 text-primary">

                            </div>
                        </div>
                    </div>
                </div>

                <div className='container-fluid bg-white mt-2 bannerbottom text-dark'>
                    <div className='row text-start'>
                        <div className="col">
                            <h2 className='text-black'> Best Deals On Smart Phones</h2>
                        </div>
                    </div>
                    <div className="row d-flex flex-wrap" >
                        <div className="col-6-md col-lg-10 col-ms-4 d-flex gap-2 flex-wrap">
                            {subcatdata.map((data) => {
                                return (
                                    <div class="card ccard" style={{ width: "180px" }}>
                                        <div className='card-img'> <img class="card-img-top" src={"http://localhost:7000/" + data.subcategorypic} alt="Card image" style={{
                                            width: "100%", height: "150px"

                                        }}></img>
                                        </div>
                                        <div class="card-body ">
                                            <h4 class="card-title">{data.subcategoryname}</h4>
                                            <Link to="#" class="card-title btn text-dark btn-primary" > Add to Card </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-6-md col-lg-2 col-ms-4">
                            <div class="card ccard" style={{ width: "180px" }}>
                                <img class="card-img-top" src={hero} alt="Card image" style={{
                                    width: "100%", height: "100%"

                                }}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default Customer