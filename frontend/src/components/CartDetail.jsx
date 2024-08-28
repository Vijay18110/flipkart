import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { useCookies } from 'react-cookie';
import { FaMinus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import Nav from '../Nav'
const CartDetail = () => {
    const [cookie, createcookie, removecookie] = useCookies();
    const [cartdata, setcartdata] = useState([]);
    const dispatch = useDispatch();
    const [carddata, setcarddata] = useState();
    const [name, setname] = useState();
    const [mobile, setmobile] = useState();
    const [address, setaddress] = useState();
    const [total, settotal] = useState();
    const [gst, setgst] = useState();
    const [gtotal, setgtotal] = useState();
    const [gtot, setgtot] = useState();
    const [date, setdate] = useState();
    const [dateobj, setdateobj] = useState();






    const getdate = () => {
        const date = new Date();

        setdate(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())

    }

    useEffect(() => {

        loadcard()
        if (cookie["customer"] != null)
            counttotalcard();
    }, [cartdata])


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



    const loadcard = async () => {
        const re = await fetch("http://localhost:7000/carddata", {
            method: "PATCH",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ username: cookie.customer })
        })
        const data = await re.json();
        setcartdata(data);
        var tot = 0;
        for (let i = 0; i < data.length; i++) {
            tot = tot + (data[i].quantity) * data[i].price;
        }
        var Gst = 0;
        Gst = tot * 20 / 100;
        setgst(Gst);
        settotal(tot)
        setgtot(tot + gst + 45)
    }
    const updatecard = async (id, op, qty) => {
        const re = await fetch("http://localhost:7000/carddata", {
            method: "PUT",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ pid: id, op: op, qty: qty })
        })
        dispatch({ type: "plus" })
    }
    const deletecard = async (pid) => {
        const re = await fetch("http://localhost:7000/carddata", {
            method: "DELETE",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ pid: pid })
        })
        const data = await re.json();
    }

    const saveUserOrder = async () => {
        const re = await fetch("http://localhost:7000/userorder", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ date: date, amount: gtot, name: name, mobile: mobile, address: address, username: cookie['customer'] })
        });
        const data = await re.json();
        alert(data.msg);
        loadcard()

    };

    return (
        <div className="container-fluid">
            <Nav ></Nav>
            <div className="container mt-4">
                <div className="row bg-warning">

                    <div className="col-sm-8  mt-5 mb-5">
                        <table className=''>
                            <thead className='text-center' >
                                <tr className='' >
                                    <th>productpic</th>
                                    <th>productname</th>
                                    <th>price</th>
                                    <th>quantity</th>

                                    <th>Action</th>
                                </tr>

                            </thead>
                            <tbody className='text-center'>
                                {
                                    cartdata.map((data) => {
                                        return (
                                            <tr className='p-5'>
                                                <td>
                                                    <img style={{ width: "50%" }} className='rounded-circle' src={"http://localhost:7000/" + data.productpic} alt="" />
                                                </td>
                                                <td>

                                                    {data.productname}
                                                </td>
                                                <td>
                                                    {data.price}
                                                </td> <td>
                                                    {data.quantity}
                                                </td>
                                                <td className=''>
                                                    <button className=" me-2 btn btn-danger  " onClick={() => deletecard(data.pid)}><i className=''> <MdDelete></MdDelete> </i> </button>
                                                    <button onClick={() => { updatecard(data._id, "plus", data.quantity) }} className="me-2 btn bg-success "><i className=' text-white fs-5'  > <CiSquarePlus></CiSquarePlus> </i> </button>
                                                    <button className="btn btn-danger  " onClick={() => { updatecard(data._id, "minus", data.quantity) }}><i className=''> <FaMinus></FaMinus> </i> </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-4 gap-4 mt-5 text-start mb-5">
                        <div className='h4'>total:{total}</div>
                        <div className='h4'>delivery charge:45</div>
                        <div className='h4'>GST:{gst}</div>
                        <div className='h4'>Grand total:{gtot}</div>

                        <div className='form-group'>
                            <label htmlFor="name"> Name</label>
                            <input onChange={(e) => setname(e.target.value)} className='form-control' type="text" name="" placeholder='name' id="name" />
                        </div>                        <div className='form-group'>
                            <label htmlFor="Mobile"> Mobile</label>
                            <input onChange={(e) => setmobile(e.target.value)} className='form-control' type="text" name="" placeholder='Mobile' id="Mobile" />
                        </div>                        <div className='form-group'>
                            <label htmlFor="address"> Shopping address</label>
                            <textarea onChange={(e) => setaddress(e.target.value)} className='form-control' type="text" name="" placeholder='address' id="address" />
                        </div>
                        <button onMouseOver={getdate} type='submit' className=' mt-4 fs-2 btn btn-success' onClick={saveUserOrder}>  place order</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default CartDetail
