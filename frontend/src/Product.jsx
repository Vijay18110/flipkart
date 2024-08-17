import React, { useEffect, useState } from "react";
import Sidemenu, { Footer, Header } from "./comcomponent";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
function Product() {
    const Navigate = useNavigate();
    const [cookie, createcookie, removecookie] = useCookies();
    useEffect(() => {
        if (cookie["adcookie"] == null) {
            Navigate('/adminlog');
        }
    }, [])
    const [getdata, setgetdata] = useState([]);
    const [catid, setcatid] = useState();
    const [subcatgetdata, setsubcatgetdata] = useState([]);

    const [price, setprice] = useState();
    const [subcatid, setsubcatid] = useState();
    const [offerprice, setofferprice] = useState();
    const [desc, setdesc] = useState();
    const [pname, setpname] = useState();
    const [productpic, setproductpic] = useState();
    const [productdata, setproductdata] = useState([]);

    const [productname1, setproductname1] = useState();
    const [subcatid1, setsubcatid1] = useState();

    const Loadproduct = async (x) => {
        const r = await fetch("http://localhost:7000/product", {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ subcatid: x })
        });
        const data = await r.json()
        setproductdata(data);
    }

    const recordsaved = async () => {
        const fdata = new FormData();
        fdata.append("price", price)
        fdata.append("subcatid", subcatid)
        fdata.append("desc", desc)
        fdata.append("pname", pname)
        fdata.append("offerprice", offerprice)
        fdata.append("productpic", productpic);
        const re = await fetch("http://localhost:7000/product", {
            method: "post",
            body: fdata,
        });
        const data = await re.json();
        alert(data.msg);
    };
    const getrecord = async (id) => {
        const re = await fetch("http://localhost:7000/product/" + id, {
            method: "GET",
            headers: { "content-type": "application/json" },
        })
        const data = await re.json();
        setproductname1(data[0].productname);
        setsubcatid1(id);


    }


    const categorydata = async (x) => {
        const re = await fetch("http://localhost:7000/category", {
            method: "get",
            headers: { "content-type": "application/json" },
        });
        const data = await re.json();
        setgetdata(data);
        setcatid(x);
    };

    const Loadsubcategory = async (x) => {
        const r = await fetch("http://localhost:7000/subcategory", {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ categoryid: x })
        });
        const data = await r.json()
        setsubcatgetdata(data);
        setsubcatid(x);
    }


    const updaterecord = async () => {
        const re = await fetch('http://localhost:7000/product', {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ subcategoryid: subcatid1, productname: productname1 })
        })
        const data = await re.json();
        alert(data.msg);

    }
    const deleterecord = async (id) => {
        const re = await fetch("http://localhost:7000/product/" + id, {
            method: "delete",
            headers: { "content-type": "application/json" },
        })
        const data = await re.json();
        alert(data.msg);
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-md-2 " style={{ background: "black" }}>
                        <Sidemenu />
                    </div>
                    <div className="col-md-10 bg-dark " style={{ padding: "0px" }}>
                        <Header />
                        <div className="row text-end p-2">
                            <div className="col-6 text-start fs-2">
                                <div className="form-group">
                                    <label>category name</label>
                                    <select
                                        onClick={categorydata}
                                        onChange={(e) => { Loadsubcategory(e.target.value) }}
                                        name="" id="" className="form-control" >
                                        <option value="select"> select option</option>
                                        {
                                            getdata.map((data) => <option value={data._id}>{data.categoryname}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>subcategory name</label>
                                    <select name="" id="" className="form-control"
                                        onChange={(e) => { Loadproduct(e.target.value) }}
                                    >
                                        <option value="select"> select option</option>

                                        {subcatgetdata.map((data) => <option value={data._id}>{data.subcategoryname}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <button
                                    style={{ borderRadius: "3rem" }}

                                    className="btn btn-primary fs-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal"
                                >
                                    Add new subcategory
                                </button>
                            </div>
                        </div>
                        {/* <div className="container-fluid text-end">
              <button
                className="btn btn-primary fs-3"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                Add new subcategory
              </button>
            </div> */}
                        <div className="container text-center  fs-3">
                            <table
                                className="table table-hover table-bordered "
                                style={{ border: "2px solid black" }}
                            >
                                <thead>
                                    <tr>
                                        <th>Images</th>
                                        <th>ProductName</th>
                                        <th> price</th>
                                        <th> OfferPrice</th>
                                        <th> desc</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productdata.map((data) => <tr>

                                            <td><img src={"http://localhost:7000/" + data.productpic} alt="logo" /></td>
                                            <td>{data.productname}</td>
                                            <td>{data.price}</td>
                                            <td>{data.offerprice}</td>
                                            <td>{data.desc}</td>

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

                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="modal" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Category</h4>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>category name</label>
                                            <select
                                                onClick={categorydata}
                                                onChange={(e) => { Loadsubcategory(e.target.value), setcatid(e.target.value) }}
                                                name="" className="form-control" >
                                                <option value="select"> select option</option>
                                                {
                                                    getdata.map((data) => <option value={data._id}>{data.categoryname}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>SubCategory Name</label>
                                            <select name="" className="form-control"
                                                onChange={(e) => { setsubcatid(e.target.value) }}
                                            >
                                                <option value="select"> select option</option>

                                                {subcatgetdata.map((data) => <option value={data._id}>{data.subcategoryname}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input
                                                onChange={(e) => setpname(e.target.value)}

                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Product Pic</label>
                                            <input
                                                onChange={(e) => setproductpic(e.target.files[0])}

                                                type="file"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input
                                                onChange={(e) => setprice(e.target.value)}
                                                type="tel"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>OfferPrice</label>
                                            <input
                                                onChange={(e) => setofferprice(e.target.value)}

                                                type="tel"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>description</label>
                                            <textarea
                                                onChange={(e) => setdesc(e.target.value)}

                                                type=""
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-dismiss="modal"
                                            onClick={recordsaved}
                                        >
                                            save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal" id="myupdate">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">subCategory</h4>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                        ></button>
                                    </div>

                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>subcategory name</label>
                                            <input
                                                value={productname1}
                                                onChange={(e) => setproductname1(e.target.value)}
                                                type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-dismiss="modal"
                                            onClick={updaterecord}
                                        >
                                            update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div>ss</div> */}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Product;