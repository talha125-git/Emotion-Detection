import React, { useState } from 'react';
import talha from "../assets/talha_favicon.jpeg"
import {
    UserCircle,
    BookOpen,
    Database,
    Code,
    Mail,
    Github,
    Linkedin,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const AboutSection = () => {
    const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(true);
    const [isPersonalDetailsOpen, setIsPersonalDetailsOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="text-center mb-10">
                    <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-1">
                        About
                    </h1>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        A sophisticated AI-powered application that analyzes and classifies emotions from textual data
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Project Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                            <div
                                className="flex justify-between items-center cursor-pointer mb-4"
                                onClick={() => setIsProjectDetailsOpen(!isProjectDetailsOpen)}
                            >
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <BookOpen className="text-purple-600" size={24} />
                                    Project Details
                                </h2>
                                {isProjectDetailsOpen ? <ChevronUp /> : <ChevronDown />}
                            </div>

                            {isProjectDetailsOpen && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-5 rounded-xl border border-purple-100">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <Code className="text-purple-600" size={22} />
                                                </div>
                                                <h3 className="font-bold text-gray-800">Technology Stack</h3>
                                            </div>
                                            <ul className="space-y-2 text-gray-600">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <span className="font-medium">Frontend:</span> React with Tailwind CSS
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="font-medium">Backend:</span> Python (Flask/FastAPI)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                    <span className="font-medium">ML Library:</span> Pandas/joblib
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <Database className="text-blue-600" size={22} />
                                                </div>
                                                <h3 className="font-bold text-gray-800">Dataset & Scale</h3>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Dataset Size:</span>
                                                    <span className="font-bold text-blue-600">50,000+ lines</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                                                        style={{ width: '85%' }}
                                                    ></div>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Comprehensive dataset covering multiple emotional categories taken from Kaggle
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
                                        <h3 className="font-bold text-gray-800 mb-3">Project Description</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            This Emotion Detection system utilizes Natural Language Processing (NLP) techniques
                                            and machine learning algorithms to analyze text input and classify it into various emotional
                                            categories. The application features a responsive React frontend with real-time emotion
                                            visualization and a robust Python backend that handles model inference and data processing.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                                            <div className="text-2xl font-bold text-purple-600 mb-1">13</div>
                                            <div className="text-gray-600 text-sm">Emotion Emojis</div>
                                        </div>
                                        <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                                            <div className="text-2xl font-bold text-blue-600 mb-1">95%+</div>
                                            <div className="text-gray-600 text-sm">Model Accuracy</div>
                                        </div>
                                        <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                                            <div className="text-2xl font-bold text-green-600 mb-1">Real-time</div>
                                            <div className="text-gray-600 text-sm">Text Analysis</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Personal Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                            <div
                                className="flex justify-between items-center cursor-pointer mb-6"
                                onClick={() => setIsPersonalDetailsOpen(!isPersonalDetailsOpen)}
                            >
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <UserCircle className="text-blue-600" size={24} />
                                    Personal Details
                                </h2>
                                {isPersonalDetailsOpen ? <ChevronUp /> : <ChevronDown />}
                            </div>

                            {isPersonalDetailsOpen && (
                                <div className="space-y-6 animate-fadeIn">
                                    {/* Profile Card */}
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                                                <img
                                                    src={talha}
                                                    alt="Malik Abutalha Raheem"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='128' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute bottom-5 right-1/4 transform translate-x-1/2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Malik Abutalha Raheem</h3>
                                        <p className="text-gray-600 mb-4">Software Engineering Student</p>
                                    </div>

                                    {/* Academic Details */}
                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                                            <h4 className="font-bold text-gray-800 mb-2">Academic Information</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Student ID:</span>
                                                    <span className="font-bold text-black">CU-<span className='text-blue-600 text-xl'>4279</span>-2023</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Section:</span>
                                                    <span className="font-bold text-gray-800">A</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Subject:</span>
                                                    <span className="text-sm font-bold text-gray-800">Software Verification <br /> & Validation Lab</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                            <h4 className="font-bold text-gray-800 mb-2">Submitted To</h4>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <UserCircle className="text-purple-600" size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">Mam Minahil Ather</p>
                                                    <p className="text-sm text-gray-600">Course Instructor</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <h4 className="font-bold text-gray-800 mb-3">Contact Information</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-9 text-gray-600">
                                                <Mail size={18} className="text-blue-500" />
                                                <span className='text-sm'>malikabutalha.raheem.bsse-2023a@cecosian.edu.pk</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-6">
                                            <a
                                                href="https://github.com/talha125-git/Emotion_Detection_Web"
                                                className="flex-1 bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition"
                                            >
                                                <Github size={18} />
                                                GitHub
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/in/malik-abutalha-raheem-b89b09354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                                            >
                                                <Linkedin size={18} />
                                                LinkedIn
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Project Status */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Project Status</span>
                                    <span className="font-bold text-green-600">Completed</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-full"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Emotion Detection Project. 5th Semister BSSE-Sec-A  </p>
                    <p className="mt-1">This project is developed for educational purposes as part of Software Verification & Validation Lab.</p>
                </footer>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default AboutSection;