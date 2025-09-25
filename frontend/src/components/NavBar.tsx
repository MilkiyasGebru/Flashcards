import  { useState, useEffect, type KeyboardEvent } from 'react';
import { Menu, X, User, Settings, BookOpen, LogOut } from 'lucide-react';
import {useAuthContext} from "../hooks/useAuthContext.ts";
import {useNavigate} from "react-router-dom";



export default function Navbar( ) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const handleSignOut = async () => {
        authContext.dispatch(
            {
                type: "LOGOUT",
                payload: {
                    token: null,
                }
            }
        )
        navigate("/")
        localStorage.removeItem("flashcards-token")
    }

    // Handle scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('.navbar-container')) {
                setIsMobileMenuOpen(false);
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Navigation items
    const navItems = [
        { id: 'admin', label: 'Admin', icon: Settings },
        { id: 'study', label: 'Study', icon: BookOpen},

    ];

    const userMenuItems = [
        { label: 'Sign Out', icon: LogOut },
    ];

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsUserDropdownOpen(false);
    };

    // Toggle user dropdown
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsMobileMenuOpen(false);
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent, action: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };

    return (
        <nav
            className={`navbar-container sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-gradient-to-r from-green-50/80 to-yellow-50/80 backdrop-blur-sm'
            }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <a
                            href="/admin"
                            className="flex items-center space-x-2 text-2xl font-bold text-green-800 hover:text-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md px-2 py-1"
                            aria-label="Flashcards home page"
                        >
                            <div className="relative">
                                <BookOpen className="w-8 h-8" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-80"></div>
                            </div>
                            <span className="hidden sm:block">FLASHCARDS</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.id}
                                        href={`/${item.id}`}

                                        className="group flex items-center px-4 py-2 rounded-lg text-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-gray-700 hover:text-green-800 hover:bg-green-50 "
                                    >
                                        <Icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop User Menu */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 relative">
                            <button
                                onClick={toggleUserDropdown}
                                onKeyDown={(e) => handleKeyDown(e, toggleUserDropdown)}
                                className="bg-green-100 hover:bg-green-200 px-3 py-2 rounded-full text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                                aria-expanded={isUserDropdownOpen}
                                aria-haspopup="true"
                            >
                                <div className="flex items-center space-x-2">
                                    <User className="w-5 h-5" />
                                    {/*<span className="text-sm font-medium">{currentUser}</span>*/}
                                </div>
                            </button>

                            {/* User Dropdown */}
                            {isUserDropdownOpen && (
                                <div
                                    className="origin-top-right absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-200"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu"
                                >
                                    <div className="py-1">
                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <button
                                                    key={item.label}
                                                    className=" flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-150 w-full"
                                                    role="menuitem"
                                                    onClick={handleSignOut}
                                                >
                                                    <Icon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                                    {item.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            onKeyDown={(e) => handleKeyDown(e, toggleMobileMenu)}
                            className="bg-green-100 hover:bg-green-200 inline-flex items-center justify-center p-2 rounded-md text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle main menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed w-full md:hidden animate-in slide-in-from-top-2 duration-300"
                    id="mobile-menu"
                >
                    <div
                        className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-green-100">

                        <div className="flex items-center px-3 mb-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <User className="w-6 h-6 text-green-800"/>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">Welcome</div>
                                <div className="text-sm text-gray-500">Flashcards User</div>
                            </div>
                        </div>

                        {/* Mobile Navigation Items */}
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={item.id}
                                    className="group flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-gray-700 hover:text-green-800 hover:bg-green-50"
                                >
                                    <Icon
                                        className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"/>
                                    {item.label}
                                </a>
                            );
                        })}


                        {/* Mobile User Section */}
                        <div className="border-t border-green-100 pt-4 pb-3">

                            <div className="space-y-1">
                                {userMenuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <a
                                            key={item.label}
                                            href="/"
                                            onClick={handleSignOut}
                                            className="group flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-800 hover:bg-green-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            <Icon
                                                className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"/>
                                            {item.label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}