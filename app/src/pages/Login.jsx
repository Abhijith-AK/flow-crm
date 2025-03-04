import { useState } from "react";
import AuthImagePattern from "../utils/Patterns/AuthImagePattern";
import { Link, useNavigate } from "react-router"; 
import { formValidator } from "../utils/FormValidator";
import { loginAPI } from "../services/allAPI";

const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validateEmail = formValidator("email", credentials.email);
        const validatePassword = formValidator("password", credentials.password);

        if (!validateEmail.validation || !validatePassword.validation) {
            setErrors({
                email: validateEmail.message,
                password: validatePassword.message,
            });
            return;
        }

        const reqBody = {
            email : credentials.email,
            password : credentials.password
        }

        try {
            const response = await loginAPI(reqBody)
            if (response.status == 200) {
                localStorage.setItem("user", JSON.stringify(response.data.user))
                localStorage.setItem("token", response.data.token)
                alert("Login Successfull");
                const role = response.data.user.role
                if (role === "manager" || role === "employee") {
                    const id = response.data.user.crmId
                    navigate(`/crm/${id}/manager`)
                } else if (role === "admin") {
                    navigate('/admin')
                }
            } else {
                alert(response.response.data)
                console.log(response);
                
            }
        } catch (error) {
            alert(error.response.message)
        }
    };

    return (
        <div className="relative flex items-center px-8 justify-evenly min-h-screen bg-gray-900 text-white overflow-hidden">
            <AuthImagePattern
                title="Welcome back!"
                subtitle="Sign in to continue to your dashboard and catch up with your tasks."
            />

            {/* Login Content */}
            <div className="relative z-10 p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl text-center mb-4">Welcome Back!</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2"
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 rounded-lg text-lg hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-gray-300 text-center">
                    Don't have an account?{" "}
                    <Link className="text-blue-300 hover:text-blue-400" to="/register">
                        Register Your Company Now!!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
