import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
const CategorydataLoad = () => {
    useEffect(() => {

        Loadcategory()
    }, [])
    const [catdata, setcatdata] = useState([])
    const [carddata, setcarddata] = useState([]);


    const Loadcategory = async () => {
        const re = await fetch("http://localhost:7000/category", {
            method: "GET",
            headers: { "Content-type": "Application/json" },
        })
        const data = await re.json();
        setcatdata(data)
    }


    return (
        <div className='row  bg-white w-100 p-0 m-0 row2 mt-2'>

            <div className=" d-flex  flex-wrap justify-content-between">
                {catdata.map((data) => {
                    return (
                        <div className='category justify-content-center'>
                            <Link to={"/subcategory/" + data._id}>
                                <img className="rounded-circle" style={{ width: "70px", height: "70px" }} src={"http://localhost:7000/" + data.categorypic} alt="pic" />

                            </Link>
                            <h6 className='text-black'>{data.categoryname}</h6>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default CategorydataLoad