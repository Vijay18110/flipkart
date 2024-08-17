import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
const CartDetail = () => {
    const [cookie, createcookie, removecookie] = useCookies();
    useEffect(() => {
        loadcard()
    }, [])
    const [cartdata, setcartdata] = useState([]);
    const loadcard = async () => {
        const re = await fetch("http://localhost:7000/carddata", {
            method: "PATCH",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ username: cookie.customer })
        })
        const data = await re.json();
        setcartdata(data);
        // console.log(data)
    }
    return (
        <div className="container-fluid">
            <div className="container mt-4">
                <div className="row bg-warning">
                    <div className="col-sm-12 d-flex flex-wrap gap-4 mt-5 mb-5">

                        {
                            cartdata.map((data) => <div>
                                <div className="card ccard" style={{ width: "200px" }}>
                                    <img className="card-img-top" src={"http://localhost:7000/" + data.productpic} alt="Card image" style={{
                                        width: "100%", height: "100px"
                                    }}></img>
                                    <div className="card-body">
                                        <h4 className="card-title">{data.title}</h4>
                                        <p className="card-text"> ₹ <del className='text-danger'> {data.price} </del> &nbsp;<span className='text-success'> {data.offerprice}</span></p>
                                        <p className="card-text"> <span className='text-black'> Username:</span>{data.username}</p>
                                        <button className="btn btn-primary"> Buy now</button>
                                    </div>
                                </div>
                            </div>

                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDetail