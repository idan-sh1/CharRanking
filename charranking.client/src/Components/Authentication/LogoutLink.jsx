import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function LogoutLink(props) {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear local storage data on user logout
        localStorage.clear()

        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""

        })
            .then((data) => {
                if (data.ok) {

                    navigate("/login");
                }


            })
            .catch((error) => {
                console.error(error);
            })

    };

    return (
        <>
            <a href="#" onClick={handleSubmit}>{props.children}</a>
        </>
    );
}
LogoutLink.propTypes = {
    children: PropTypes.string.isRequired,
};

export default LogoutLink;