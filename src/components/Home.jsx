import { useState } from 'react';
import { Upload, FileImage, Loader2, CheckCircle2, AlertCircle, Download, X } from 'lucide-react';

function Home() {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("")
    const [format, setFormat] = useState("jpeg")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    // const [outputFormat, setOutputFormat] = useState("jpg");

    const imageFormats = ["jpeg", "bmp", "tiff", "png", "webp", "avif", "ico", "gif", "odd", "psd", "tga",];
    const videoFormats = ["mp4", "mov"]

    const handleFileChange = (e) => {
        setError("");
        setSuccess(false);
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            if (selectedFile.type.startsWith("video/")) {
                setFileType("video");
                setFormat("mp4")
            }
            else {
                setFileType("image")
                setFormat("jpeg")
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
            const droppedFile = e.dataTransfer.files[0]
            setFile(droppedFile);

            if (droppedFile.type.startsWith("video/")) {
                setFileType("video");
                setFormat("mp4");
            }
            else {
                setFileType("image");
                setFormat("jpeg");
            }
        }
    };

    const handleConvert = async () => {
        if (!file) {
            setError("Please select a file");
            return;
        }

        setError("");
        setSuccess(false);
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("format", format)

        try {
            const endpoint = fileType === "video" ? "/video/convert" : "/image/convert"
            const res = await fetch(`https://fileconverter-2-yt96.onrender.com/api${ endpoint }`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("File conversion failed");
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            const orignalName = file.name.split('.').slice(0, -1).join('.')

            a.href = url;
            a.download = `${ orignalName }.${ format }`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(url);
            setSuccess(true);
        } catch (err) {
            setError("An error occurred during conversion. Please try again later.");
            console.error(err);
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

    const currentFormats = fileType === "video" ? videoFormats : imageFormats

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                        <img src="/favicon.png" alt="" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        File Converter
                    </h1>
                    <p className="text-lg text-gray-600">
                        Convert to Images and Video files
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
                                    Drop your files here
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    or click to browse files
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

                    {file && (
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Convert to:
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {currentFormats.map((fmt) => (
                                        <button
                                            key={fmt}
                                            onClick={() => setFormat(fmt)}
                                            className={`py-2 px-4 rounded-lg font-medium transition ${ format === fmt
                                                ? "bg-green-600 text-white"
                                                : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                                                }`}
                                        >
                                            {fmt.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleConvert}
                        disabled={loading || !file}
                        className={`w-full mt-6 py-3 px-6 rounded-lg font-medium text-white transition-all ${ loading || !file
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-green-500 hover:shadow-lg hover:scale-105'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Converting...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                <Download className="w-5 h-5 mr-2" />
                                Convert to {format.toUpperCase()}
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
                                File converted successfully! Your download should start automatically.
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
    );
}

export default Home;