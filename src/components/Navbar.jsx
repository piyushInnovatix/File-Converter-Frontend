import { ChevronDown, FileImage, FileText, Menu, Video, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!buttonRef.current && buttonRef.current.contains(e.target)) {
                setToolsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    });

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <a href="/" className="flex items-center space-x-2">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                    <FileImage className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">ConvertHub</span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to={"/"} className="text-gray-700 hover:text-blue-600 transition">
                                Image Converter
                            </Link>

                            <Link to={"/video"} className='text-gray-700 hover:text-blue-600 transition'>
                                Video Converter
                            </Link>

                            <Link to={"/compressor"} className="text-gray-700 hover:text-blue-600 transition">
                                Compressor
                            </Link>
                        </div>

                        {/* CTA Button (Desktop) */}
                        <div className="hidden md:block">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
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

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t">
                            <div className="flex flex-col space-y-4">
                                <a href="/" className="text-gray-700 hover:text-blue-600 transition">
                                    Home
                                </a>
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-gray-500">Tools</p>
                                    <a href="#image" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 pl-4">
                                        <FileImage className="h-4 w-4" />
                                        <span>Image Converter</span>
                                    </a>
                                    <a href="#video" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 pl-4">
                                        <Video className="h-4 w-4" />
                                        <span>Video Converter</span>
                                    </a>
                                    <a href="#document" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 pl-4">
                                        <FileText className="h-4 w-4" />
                                        <span>Document Converter</span>
                                    </a>
                                </div>
                                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">
                                    Pricing
                                </a>
                                <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
                                    About
                                </a>
                                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
                                    Contact
                                </a>
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbar;