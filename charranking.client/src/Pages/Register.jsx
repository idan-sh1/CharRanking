import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    // State variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    // State variable for error messages
    const [error, setError] = useState("");

    // Handle login click
    const handleLoginClick = () => {
        navigate("/login");
    }

    // Handle change events for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    // Handle submit event for the form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate email and passwords
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        {
            setError("Please enter a valid email address.");
        }
        else if (password !== confirmPassword)
        {
            setError("Passwords do not match.");
        }
        // Check the password have the required length and characters
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password))
        {

            var minChars = "";
            var ucLetter = "";
            var lcLetter = "";
            var number = "";
            var spChar = "";

            // Show error only for the missing parts
            if (password.length < 6) {
                minChars = " 6 characters";
            }
            if (!/[A-Z]/.test(password)) {
                ucLetter = " one uppercase letter";
            }
            if (!/[a-z]/.test(password)) {
                lcLetter = " one lowercase letter";
            }
            if (!/[0-9]/.test(password)) {
                number = " one number";
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                spChar = " one special character";
            }

            const strings = [minChars, ucLetter, lcLetter, number, spChar];
            let result = "";

            strings.forEach((s) => {
                if (s) {  // Only add non-empty strings
                    if (result) {
                        result += ", ";
                    }
                    result += s;
                }
            });

            setError("Paswword must include at least " + result + ".");
        }
        else
        {
            // Clear error message
            setError("");
            // Post data to the /register api
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                //.then((response) => response.json())
                .then((data) => {
                    // Handle success or error from the server
                    console.log(data);
                    if (data.ok)
                        setError("Successful register.");
                    else
                        setError("Error registering.");

                })
                .catch((error) => {
                    // Handle network error
                    console.error(error);
                    setError("Error registering.");
                });
        }
    };

    return (
        <div className="containerbox">
            <h3>Register</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                </div><div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label></div><div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label></div><div>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Register</button>

                </div>
                <div>
                    <button onClick={handleLoginClick}>Go to Login</button>
                </div>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Register;