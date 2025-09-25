import { Home, Search, ArrowLeft } from 'lucide-react';

export default function  NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-30"></div>
                <div className="absolute bottom-20 left-20 w-36 h-36 bg-blue-200 rounded-full opacity-20"></div>
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-orange-200 rounded-full opacity-25"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100 rounded-full opacity-10"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="text-center max-w-2xl mx-auto">
                    {/* 404 Number */}
                    <div className="mb-8">
                        <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 leading-none">
                            404
                        </h1>
                    </div>

                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl font-bold">!</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Message */}
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Page Not Found
                    </h2>

                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Oops! The page you're looking for does not exist.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Go Back</span>
                        </button>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            <Home className="w-5 h-5" />
                            <span>Back to Flashcards</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

