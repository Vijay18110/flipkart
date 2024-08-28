import React, { useEffect, useState } from "react";
import Sidemenu, { Footer, Header } from "../comcomponent";

function Adminview() {
    const [userorderdata, setuserorderdata] = useState([]);
    const [userorderdetails, setuserorderdetails] = useState([]);
    const getorder = async () => {
        const re = await fetch("http://localhost:7000/userorder", {
            method: "GET",
            headers: { "Content-Type": "Application/json" },
        })
        const data = await re.json();
        setuserorderdata(data)
    }
    const getorderdetails = async (username) => {
        const re = await fetch("http://localhost:7000/userorder", {
            method: "PATCH",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ username: username })
        })
        const data = await re.json();
        setuserorderdetails(data)
    }
    useEffect(() => {
        getorder();
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-md-2 " style={{ background: "black" }}>
                        <Sidemenu />
                    </div>
                    <div className="col-md-10" style={{ padding: "0px" }}>
                        <div className="row text-end p-2 bg-dark">
                            <Header />
                        </div>
                        <div className="row">
                            <table className="table-bordered ms-2">
                                <thead>
                                    <tr className="fs-2">
                                        <th>name</th>
                                        <th>mobile</th>
                                        <th>Address</th>
                                        <th>order date</th>
                                        <th>amount</th>
                                        <th>Action</th>
                                        <th>orderdetails</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userorderdata.map((data) => {
                                            return (
                                                <tr>
                                                    <td>{data.name}</td>
                                                    <td>{data.mobile}</td>
                                                    <td>{data.address}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.amount}</td>
                                                    <td>
                                                        <i
                                                            className=" fa fa-edit text-warning"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#myupdate"
                                                            onClick={() => {
                                                                getrecord(data._id);
                                                            }}
                                                        ></i>
                                                        &nbsp;
                                                        <i
                                                            className="fa fa-trash text-danger"
                                                            onClick={() => {
                                                                deleterecord(data._id
                                                                );
                                                            }}
                                                        ></i>
                                                    </td>
                                                    <td>
                                                        <div
                                                            onClick={() => getorderdetails(data.name)}
                                                            className="text-bold"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#myModal"
                                                        >
                                                            view
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="modal" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">order details</h4>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                        ></button>
                                    </div>
                                    <div className="modal-body" >

                                        <table className="table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>productpic</th>
                                                    <th>productname</th>
                                                    <th>price</th>
                                                    <th>quntity</th>
                                                    <th>orderno</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userorderdetails.map((data) => {
                                                        return (
                                                            <tr>
                                                                <td><img className="" style={{ width: "100px" }} src={"http://localhost:7000/" + data.productpic} alt="pic" /></td>

                                                                <td>{data.productname}</td>
                                                                <td>{data.price}</td>
                                                                <td>{data.quantity}</td>
                                                                <td>{data.orderno}</td>


                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
export default Adminview;
