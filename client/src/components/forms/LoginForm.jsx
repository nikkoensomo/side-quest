import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/authService';

import BigBlackButton from '../buttons/BigBlackButton';

const LoginForm = ({ onSuccess }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        general: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    function validate() {
        const newErrors = {}

        if (!formData.username.trim()) {
            newErrors.username = "Please enter your username."
        } 

        if (!formData.password) {
            newErrors.password = "Please enter your password."
        }

        return newErrors;
    }

    async function handleSubmit() {
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);

            const data = await loginService(formData);

            localStorage.setItem('token', data.token);

            onSuccess();
            navigate('/landing-page');
        } catch (error) {
            setErrors({
                ...errors,
                general: error.response?.data?.message || 'Something went wrong.'
            })
        } finally {
            setIsLoading(false);
        }

        console.log(formData);
    }

    return (
        <>
            <div className="flex flex-col gap-4 px-6">
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                <BigBlackButton
                    label={isLoading ? 'Logging in...' : 'Login'}
                    onClick={handleSubmit}
                    isDisabled={isLoading}
                />
            </div>
        </>
    );
}

export default LoginForm;