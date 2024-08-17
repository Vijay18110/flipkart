import React, { useEffect, useState } from "react";
import Sidemenu, { Footer, Header } from "./comcomponent";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function Categoryshop() {
  const [catname, setcategoryname] = useState();
  const [catpic, setcategorypic] = useState();
  const [catname1, setcategoryname1] = useState();
  const [catdata, setcatdata] = useState([]);
  const [cid, setcid] = useState();
  const Navigate = useNavigate();
  const [cookie, createcookie, removecookie] = useCookies();
  useEffect(() => {
    if (cookie["adcookie"] == null) {
      Navigate('/adminlog');
    }
    displayrecord();
  }, []);
  const displayrecord = async () => {
    const re = await fetch("http://localhost:7000/category", {
      method: "get",
      headers: { "content-type": "application/json" },
    });
    const data = await re.json();
    setcatdata(data);
  };
  const recordsaved = async () => {
    const fdata = new FormData();
    fdata.append("categoryname", catname);
    fdata.append("categorypic", catpic);
    const re = await fetch("http://localhost:7000/category", {
      method: "post",
      body: fdata,
    });
    const data = await re.json();
    alert(data.msg);
    displayrecord();
  };
  const deleterecord = async (m) => {
    const re = await fetch("http://localhost:7000/category", {
      method: "delete",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cid: m }),
    });
    const data = await re.json();
    alert(data.msg);
    displayrecord();
  };
  const getrecord = async (m) => {
    const re = await fetch("http://localhost:7000/category/" + m, {
      method: "get",
      headers: { "content-type": "application/json" },
    });
    const data = await re.json();
    setcategoryname1(data[0].categoryname);
    setcid(m);
  };
  const recordupdate = async () => {
    const re = await fetch("http://localhost:7000/category", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        categoryname: catname1,
        cid,
      }),
    });
    const data = await re.json();
    alert(data.msg);
    displayrecord();
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-md-2" style={{ background: "black" }}>
            <Sidemenu />
          </div>
          <div className="col-md-10 bg-dark  " style={{ padding: "0px" }}>
            <Header />

            <div className="container-fluid p-3 text-end">
              <button
                style={{ borderRadius: "3rem" }}
                className="btn btn-primary fs-3"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                Add new category
              </button>
            </div>
            <div className="container text-center  fs-3">
              <table
                className="table table-hover table-bordered "
                style={{ border: "2px solid black" }}
              >
                <thead>
                  <tr>
                    <th>Images</th>
                    <th>CategoryName</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {catdata.map((x) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={"http://localhost:7000/" + x.categorypic}
                            style={{ width: "50px" }}
                          />
                        </td>
                        <td>{x.categoryname}</td>
                        <td>
                          <i
                            className=" fa fa-edit text-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#myupdate"
                            onClick={() => {
                              getrecord(x._id);
                            }}
                          ></i>
                          &nbsp;
                          <i
                            className="fa fa-trash text-danger"
                            onClick={() => {
                              deleterecord(x._id);
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
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
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setcategoryname(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>category pic</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setcategorypic(e.target.files[0])}
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
                      <input
                        type="text"
                        className="form-control"
                        value={catname1}
                        onChange={(e) => setcategoryname1(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={recordupdate}
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

export default Categoryshop;