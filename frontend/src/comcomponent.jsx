import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Sidemenu = () => {
    return (
        <>
            <ul className="fs-3 ps-4" style={{ listStyleType: "none", textAlign: "center" }}>
                <div className="h2 text-white" style={{ fontWeight: "700" }}>Dashboard</div>

                <li>
                    <Link to={"/category"}>category</Link>
                </li>
                <li>
                    <Link to={"/subcategory"}>subcategory</Link>
                </li>
                <li>
                    <Link to={"/product"}>product</Link>
                </li>
                <li>
                    <Link to={"/placedorder"}>view order</Link>
                </li>

            </ul>
        </>
    )
};
const Header = () => {
    const [cookie, createcookie, removecookie] = useCookies();
    const Navigate = useNavigate();

    const logoutadmin = () => {
        removecookie("adcookie")
        Navigate('/adminlog')
    }
    return (
        <>
            <div className=" text-end p-3">
                <div className="container mt-2">
                    <button onClick={logoutadmin} className="btn btn-primary " style={{ borderRadius: "3rem" }}>logout</button>
                </div>
            </div>
        </>
    )
};
const Footer = () => {
    return (
        <>
            <div
                className="container-fluid bg-dark text-center"
                style={{ color: "white", height: "40px" }}
            >
                @copyright:2009
            </div>
        </>
    )
};
export default Sidemenu;
export { Header, Footer };