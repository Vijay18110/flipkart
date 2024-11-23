import React, { useEffect, useState } from "react";
import Sidemenu, { Footer, Header } from "./comcomponent";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
function Subcategory() {
    const [cookie, createcookie, removecookie] = useCookies();
    const Navigate = useNavigate();
    const [getdata, setgetdata] = useState([]);
    const [subcatname, setsubcatname] = useState();
    const [subcatname1, setsubcatname1] = useState();
    const [subcatpic, setsubcatpic] = useState();
    const [catid, setcatid] = useState();
    const [catid1, setcatid1] = useState();
    const [subcatdata, setsubcatdata] = useState([]);
    useEffect(() => {
        if (cookie["adcookie"] == null) {
            Navigate('/adminlog')
        }
        datarecordget()
    }, [])

    const loadsubcategory = async (x) => {
        const r = await fetch("http://localhost:7000/subcategory", {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ categoryid: x })
        });
        const data = await r.json();
        setsubcatdata(data);
        setcatid(x);
    }
    const datarecordget = async (x) => {
        const re = await fetch("http://localhost:7000/category", {
            method: "get",
            headers: { "content-type": "application/json" },
        });
        const data = await re.json();
        setgetdata(data);
        setcatid(x);
    };
    const recordsave = async () => {
        const fdata = new FormData();
        fdata.append("categoryid", catid);
        fdata.append("subcategoryname", subcatname);
        fdata.append("subcategorypic", subcatpic);
        const re = await fetch("http://localhost:7000/subcategory", {
            method: "post",
            body: fdata
        });
        const data = await re.json();
        alert(data.msg);
        loadsubcategory(catid);
    };

    const deleterecord = async (x) => {
        const re = await fetch('http://localhost:7000/subcategory', {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ subcatid: x })

        })
        const data = await re.json();
        alert(data.msg)
        loadsubcategory(catid);
    }

    const getrecord = async (m) => {


        const re = await fetch("http://localhost:7000/subcategory/" + m, {
            method: "get",
            headers: { "content-type": "application/json" },
        });
        const data = await re.json();
        setsubcatname1(data[0].subcategoryname);
        setcatid1(m);

    };



    const recordUpdate = async () => {
        const re = await fetch("http://localhost:7000/subcategory", {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                subcategoryname: subcatname1,
                catid1,
            }),
        });
        const data = await re.json();
        alert(data.msg);
        loadsubcategory(catid);

    };
    return (
        <>
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-md-2 " style={{ background: "black" }}>
                        <Sidemenu />
                    </div>
                    <div className="col-md-10 bg-warning " style={{ padding: "0px" }}>

                        <Header />
                        <div className="row text-end p-2">
                            <div className="col-6 text-start fs-2">
                                <div className="form-group">
                                    <label>category name</label>
                                    <select name="" id="" onChange={(e) => { loadsubcategory(e.target.value) }} className="form-control" >
                                        <option value="select"> select option</option>
                                        {getdata.map((m) => <option value={m._id}>{m.categoryname} </option>)}
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
                                        <th>SubCategoryName</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subcatdata.map((m) => {
                                        return (
                                            <tr>
                                                <td><img style={{ width: "100px", height: "100px" }} className="rounded-circle" src={"http://localhost:7000/" + m.subcategorypic} alt="pic" /></td>
                                                <td>{m.subcategoryname}</td>

                                                <td>
                                                    <i
                                                        className=" fa fa-edit text-warning"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#myupdate"
                                                        onClick={() => {
                                                            getrecord(m._id);
                                                        }}
                                                    ></i>
                                                    &nbsp;
                                                    <i
                                                        className="fa fa-trash text-danger"
                                                        onClick={() => {
                                                            deleterecord(m._id
                                                            );
                                                        }}
                                                    ></i>
                                                </td>


                                            </tr>
                                        )
                                    })}
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
                                                onChange={(e) => setcatid(e.target.value)}
                                                className="form-control"
                                                value={catid}
                                            >
                                                <option value="select"> select option</option>
                                                {getdata.map((m) => {
                                                    return (
                                                        <option value={m._id}>{m.categoryname}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>subcategory name</label>
                                            <input
                                                onChange={(e) => setsubcatname(e.target.value)}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>subcategory pic</label>
                                            <input
                                                onChange={(e) => setsubcatpic(e.target.files[0])}
                                                type="file"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-dismiss="modal"
                                            onClick={recordsave}
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
                                                value={subcatname1}
                                                onChange={(e) => setsubcatname1(e.target.value)}
                                                type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-dismiss="modal"
                                            onClick={recordUpdate}
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

export default Subcategory;