import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import './Nav.css'
import CategorydataLoad from './CategorydataLoad'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { CradContext } from './Context'
import { useDispatch } from 'react-redux'
const Customersubcategory = () => {
    const { id } = useParams();
    const [cookie, createcookie, removecookie] = useCookies();
    const Navigate = useNavigate();
    const [subcatdata, setsubcatdata] = useState([]);
    const [productdata, setproductdata] = useState([]);
    const [carddata, setcarddata] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        counttotalcard()
        loadsubcategory(id)
    }, [subcatdata])
    const counttotalcard = async () => {
        const re = await fetch("http://localhost:7000/carddata", {
            method: "PATCH",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ username: cookie.customer })
        })
        const data = await re.json();
        setcarddata(data)
        dispatch({ type: "initial", initialdata: carddata.length })
    }
    const loadsubcategory = async (id) => {
        const re = await fetch("http://localhost:7000/subcategory", {
            method: "PATCH",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ categoryid: id })
        })
        const data = await re.json();
        setsubcatdata(data);
    }
    const loadproducts = async (id) => {
        const re = await fetch("http://localhost:7000/product", {
            method: "PATCH",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ subcatid: id })
        })
        const data = await re.json();
        setproductdata(data);
    }
    const Buy = async (productname, price, offerprice, productpic, id) => {
        if (cookie["customer"] == null) {
            Navigate('/customer/register/' + id)
        }
        else {
            const re = await fetch("http://localhost:7000/carddata", {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ productname: productname, price: price, offerprice: offerprice, username: cookie.customer, productpic: productpic, pid: id, quantity: "1" })
            }
            )
            dispatch({ type: "plus" })
            const data = await re.json();
        }
    }
    return (
        <CradContext.Provider value={{
        }}>
            <div className='container-fluid'>
                <div className="row">
                    <Nav></Nav>
                    <CategorydataLoad></CategorydataLoad>
                </div>
                <div className="row mt-5">
                    <div className="col-md-2 fs-4">
                        <ul className='' style={{ listStyleType: "none" }}>
                            {
                                subcatdata.map((data) =>
                                    <li onClick={() => loadproducts(data._id)} className='pt-3'>{data.
                                        subcategoryname}</li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="col-md-10 ">
                        <div className="row">
                            <div className="col-md d-flex flex-wrap gap-4 ">
                                {productdata.map((data) => {
                                    return (
                                        <div className="card ccard" style={{ width: "200px" }}>
                                            <img className="card-img-top" src={"http://localhost:7000/" + data.productpic} alt="Card image" style={{
                                                width: "100%", height: "100px"
                                            }}></img>
                                            <div className="card-body">
                                                <h4 className="card-title">{data.productname}</h4>
                                                <p className="card-text"> ₹ <del className='text-danger'> {data.price} </del> &nbsp;<span className='text-success'>  {data.offerprice}</span></p>
                                                <p className="card-text">{data.desc}</p>
                                                <button className="btn btn-primary" onClick={() => {
                                                    Buy(data.productname, data.price, data.offerprice, data.productpic, data._id)

                                                }}  > Add to Card</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CradContext.Provider>
    )
}

export default Customersubcategory