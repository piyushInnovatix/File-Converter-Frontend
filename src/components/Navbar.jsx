import { ChevronDown, FileImage, FileText, Menu, Video, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
    const buttonRef = useRef(null)

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center space-x-2">
                                <img src="/formatix-logo.png" alt="" />
                            </a>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <Link to={"/"} className="text-gray-700 hover:text-green-600 transition">
                                Converter
                            </Link>
                            <Link to={"/compressor"} className="text-gray-700 hover:text-green-600 transition">
                                Compressor
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                                Get Started
                            </button>
                        </div>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6 text-gray-700" />
                            ) : (
                                <Menu className="h-6 w-6 text-gray-700" />
                            )}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t">
                            <div className="flex flex-col space-y-4">
                                <Link to={"/"} className="text-gray-700 hover:text-green-600 transition">
                                    Converter
                                </Link>
                                <Link to={"/compressor"} className="text-gray-700 hover:text-green-600 transition">
                                    Comressor
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbar;