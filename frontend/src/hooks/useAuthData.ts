import {useState} from "react";
import {useAuthContext} from "./useAuthContext.ts";
import {useNavigate} from "react-router-dom";

export default function useAuthData() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;



    // Form validation
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm password validation (only for registration)
        if (!isLogin) {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Toggle between login and register
    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setFormData({ username: '', password: '', confirmPassword: '' });
        setErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
    };


    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        const url = isLogin ? `${BACKEND_BASE_URL}/api/auth/login` : `${BACKEND_BASE_URL}/api/auth/register`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    username: formData.username,
                    password: formData.password
                }
            )
        })

        const json_response = await response.json();


        if (response.ok) {
            const token: string = json_response.token;
            authContext.dispatch({
                type: "LOGIN",
                payload: {
                    token: token
                }
            })
            localStorage.setItem("flashcards-token", token);
            navigate("/admin")
        }
        else {
            setErrors({"auth": json_response.error});
        }
        setIsLoading(false);

    };



    return {
        setIsLogin,
        validateForm,
        errors,
        isLoading,
        setIsLoading,
        showPassword,
        showConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        setFormData,
        toggleAuthMode,
        handleInputChange,
        handleSubmit,
        isLogin, formData
    }

}