import { FileImage } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                <FileImage className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">ConvertHub</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            The fastest and most reliable online file converter. Convert images, videos, and documents instantly.
                        </p>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Tools</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#image" className="hover:text-white transition">Image Converter</a></li>
                            <li><a href="#video" className="hover:text-white transition">Video Converter</a></li>
                            <li><a href="#pdf" className="hover:text-white transition">PDF Converter</a></li>
                            <li><a href="#audio" className="hover:text-white transition">Audio Converter</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                            <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
                            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#terms" className="hover:text-white transition">Terms of Service</a></li>
                            <li><a href="#cookies" className="hover:text-white transition">Cookie Policy</a></li>
                            <li><a href="#security" className="hover:text-white transition">Security</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-center items-center">
                    <p className="text-sm text-gray-400 text-center">
                        © 2025 Innovatix Technologies. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;