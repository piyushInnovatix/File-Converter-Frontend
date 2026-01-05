import { AlertCircle, CheckCircle2, Download, FileImage, FileType, Loader2, Upload, X } from 'lucide-react';
import React, { useState } from 'react'

function Compressor() {

    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("image")
    const [quality, setQuality] = useState("medium")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    // const [outputFormat, setOutputFormat] = useState("jpg");

    const handleFileChange = (e) => {
        setError("");
        setSuccess(false);
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            if (selectedFile.type.startsWith("video/")) {
                setFileType("video");
                setQuality("medium");
            }
            else {
                setFileType("image")
            }
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        setError("");
        setSuccess(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);

            if (droppedFile.type.startsWith("video/")) {
                setFileType("video");
                setQuality("medium")
            }
            else {
                setFileType("image")
            }
        }
    };

    const handleCompress = async () => {
        if (!file) {
            setError("Please select a file");
            return;
        }

        setError("");
        setSuccess(false);
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("quality", quality);
        try {
            let endpoint = "compress-image";

            if (fileType === "video") {
                endpoint = "compress-video";
                formData.append("level", quality); // ✅ FIXED
            }

            const res = await fetch(`https://file-converter-backend-we6y.onrender.com/${ endpoint }`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Compression failed");

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileType === "video"
                ? "compressed.mp4"
                : "compressed.jpg";

            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("An error occurred during compression");
        } finally {
            setLoading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setError("");
        setSuccess(false);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                        <img src="/favicon.png" alt="" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        File Compressor
                    </h1>
                    <p className="text-lg text-gray-600">
                        Compress Images and Videos
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div
                        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${ dragActive
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            accept="image/*, video/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="file-input"
                        />

                        {!file ? (
                            <div className="text-center">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-lg font-medium text-gray-700 mb-2">
                                    Drop your file here
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Image (PNG, JPG, WebP, AVIF) or Video (MP4, WebM, etc)
                                </p>
                                <label
                                    htmlFor="file-input"
                                    className="inline-block bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-2 rounded-lg font-medium cursor-pointer hover:shadow-lg transition"
                                >
                                    Choose File
                                </label>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FileImage className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={removeFile}
                                    className="flex-shrink-0 ml-4 p-1 hover:bg-gray-200 rounded-full transition"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        )}
                    </div>

                    {fileType === "video" && file && (
                        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Quality
                            </label>
                            <div className="flex gap-3">
                                {["high", "medium", "low"].map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => setQuality(q)}
                                        className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${ quality === q
                                            ? "bg-green-600 text-white"
                                            : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                                            }`}
                                    >
                                        {q.charAt(0).toUpperCase() + q.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                {quality === "high" && "Best quality, larger file"}
                                {quality === "medium" && "Balanced quality and file size"}
                                {quality === "low" && "Smaller file, lower quality"}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleCompress}
                        disabled={loading || !file}
                        className={`w-full mt-6 py-3 px-6 rounded-lg font-medium text-white transition-all ${ loading || !file
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-green-500 hover:shadow-lg hover:scale-105'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Compressing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                <Download className="w-5 h-5 mr-2" />
                                Compress Image
                            </span>
                        )}
                    </button>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-800">
                                File Compressed successfully! Your download should start automatically.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white/100 backdrop-blur rounded-lg p-4">
                        <div className="text-2xl mb-2">⚡</div>
                        <p className="text-sm font-medium text-gray-700">Lightning Fast</p>
                    </div>
                    <div className="bg-white/100 backdrop-blur rounded-lg p-4">
                        <div className="text-2xl mb-2">🔒</div>
                        <p className="text-sm font-medium text-gray-700">100% Secure</p>
                    </div>
                    <div className="bg-white/100 backdrop-blur rounded-lg p-4">
                        <div className="text-2xl mb-2">💯</div>
                        <p className="text-sm font-medium text-gray-700">Free Forever</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compressor