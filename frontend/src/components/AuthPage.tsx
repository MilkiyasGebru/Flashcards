import { User, Lock, Eye, EyeOff, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import useAuthData from "../hooks/useAuthData.ts";
import {useAuthContext} from "../hooks/useAuthContext.ts";
import {Navigate} from "react-router-dom"

export default function AuthPage() {

    const { errors, isLoading, showPassword, showConfirmPassword,
            setShowPassword, setShowConfirmPassword, toggleAuthMode,
            handleInputChange, handleSubmit, isLogin, formData} = useAuthData()

    const authContext = useAuthContext()

    if (authContext.state.token){
        return <Navigate to={"/admin"} replace={true} />
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">


            {/* Auth Card */}
            <div className="relative w-full max-w-md">

                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="relative">
                            <BookOpen className="w-10 h-10 text-green-600" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full opacity-80"></div>
                        </div>
                        <h1 className="text-3xl font-bold text-green-800">FLASHCARDS</h1>
                    </div>
                    <p className="text-gray-600">
                        {isLogin ? 'Welcome back! Sign in to continue learning.' : 'Join us and start your learning journey.'}
                    </p>
                </div>

                {/* Auth Form Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 overflow-hidden">

                    {/* Form Toggle Header */}
                    <div className="relative bg-gradient-to-r from-green-500 to-yellow-500 p-1">
                        <div className="flex rounded-2xl bg-white/20 backdrop-blur-sm">
                            <button
                                onClick={() => !isLogin && toggleAuthMode()}
                                className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                                    isLogin
                                        ? 'bg-white text-green-700 shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => isLogin && toggleAuthMode()}
                                className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                                    !isLogin
                                        ? 'bg-white text-green-700 shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>


                    {/* Form Content */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Username Field */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                            errors.username
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                                        }`}
                                        placeholder="Enter your username"
                                    />
                                    {errors.username && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                {errors.username && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.username}</span>
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                            errors.password
                                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                                        }`}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-green-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.password}</span>
                                    </p>
                                )}
                            </div>


                            {/* Confirm Password Field (Registration Only) */}
                            {!isLogin && (
                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                                errors.confirmPassword
                                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                                            }`}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-green-600 transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-600 flex items-center space-x-1">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.confirmPassword}</span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    </>
                                )}
                            </button>

                            {errors.auth && (
                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.auth}</span>
                                </p>
                            )}


                        </form>
                    </div>


                    {/* Footer */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                        <p className="text-center text-sm text-gray-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={toggleAuthMode}
                                className="font-medium text-green-600 hover:text-green-800 hover:underline transition-colors"
                            >
                                {isLogin ? 'Sign up here' : 'Sign in here'}
                            </button>
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
}
