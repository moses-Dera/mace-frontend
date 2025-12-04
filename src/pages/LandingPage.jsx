import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, RotateCcw, Sparkles, Brain, Rocket, Twitter, Instagram, Linkedin } from 'lucide-react';

const LandingPage = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const automationSteps = [
        { icon: Brain, text: "AI generates perfect content", color: "text-purple-500" },
        { icon: Twitter, text: "Schedules across platforms", color: "text-blue-500" },
        { icon: Sparkles, text: "Optimizes for engagement", color: "text-yellow-500" },
        { icon: Rocket, text: "Grows your audience", color: "text-green-500" }
    ];

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentStep((prev) => (prev + 1) % automationSteps.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 opacity-30">
                <div 
                    className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                        transition: 'all 0.3s ease'
                    }}
                />
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-2xl animate-bounce" />
                <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-500 rounded-full blur-xl animate-pulse" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 flex justify-between items-center p-6 backdrop-blur-md bg-white/5 border-b border-white/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MACE
                </div>
                <div className="flex items-center space-x-6">
                    <Link to="/login" className="hover:text-purple-300 transition-colors">Login</Link>
                    <a href="https://socialai-beta.vercel.app/register" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg">
                        Start Free
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
                <div className="mb-8 animate-bounce">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
                        <Sparkles size={40} className="text-white" />
                    </div>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                    Social Media
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        On Autopilot
                    </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 leading-relaxed">
                    Watch AI create, schedule, and optimize your content while you sleep. 
                    <br className="hidden md:block" />
                    <span className="text-purple-300">Currently live with Twitter integration!</span>
                </p>

                {/* Interactive Demo */}
                <div className="mb-12 p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Live Automation Preview</h3>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
                            >
                                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                            </button>
                            <button 
                                onClick={() => setCurrentStep(0)}
                                className="p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                <RotateCcw size={16} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {automationSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;
                            
                            return (
                                <div 
                                    key={index}
                                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                                        isActive ? 'bg-white/10 scale-105 shadow-lg' : 
                                        isCompleted ? 'bg-green-500/20' : 'bg-white/5'
                                    }`}
                                >
                                    <div className={`p-3 rounded-full transition-all duration-300 ${
                                        isActive ? 'bg-purple-500 animate-pulse' :
                                        isCompleted ? 'bg-green-500' : 'bg-gray-600'
                                    }`}>
                                        <Icon size={20} className="text-white" />
                                    </div>
                                    <span className={`font-medium transition-colors ${
                                        isActive ? step.color : isCompleted ? 'text-green-300' : 'text-gray-400'
                                    }`}>
                                        {step.text}
                                    </span>
                                    {isActive && (
                                        <div className="ml-auto">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                    <a 
                        href="https://socialai-beta.vercel.app/register" 
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
                    >
                        Start Automating Now
                    </a>
                    <button className="px-8 py-4 border border-white/20 rounded-full text-lg font-semibold hover:bg-white/5 transition-all backdrop-blur-sm">
                        Watch Demo
                    </button>
                </div>
            </section>

            {/* Platform Status */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Platform Integration Status
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <PlatformCard 
                            icon={Twitter} 
                            name="Twitter" 
                            status="live" 
                            description="Full posting & scheduling"
                        />
                        <PlatformCard 
                            icon={Instagram} 
                            name="Instagram" 
                            status="coming" 
                            description="In development"
                        />
                        <PlatformCard 
                            icon={Linkedin} 
                            name="LinkedIn" 
                            status="coming" 
                            description="Coming soon"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-6 border-t border-white/10 backdrop-blur-md bg-white/5">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        MACE
                    </div>
                    <p className="text-gray-400 mb-8">The future of social media automation is here.</p>
                    <div className="flex justify-center space-x-8 text-sm text-gray-500">
                        <Link to="/privacy" className="hover:text-purple-300 transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-purple-300 transition-colors">Terms</Link>
                        <Link to="/data-deletion" className="hover:text-purple-300 transition-colors">Data Deletion</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const PlatformCard = ({ icon: Icon, name, status, description }) => (
    <div className={`p-6 rounded-2xl border transition-all hover:scale-105 ${
        status === 'live' 
            ? 'bg-green-500/10 border-green-500/30 shadow-green-500/20 shadow-lg' 
            : 'bg-white/5 border-white/10'
    }`}>
        <div className="flex items-center justify-center mb-4">
            <div className={`p-4 rounded-full ${
                status === 'live' ? 'bg-green-500' : 'bg-gray-600'
            }`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
            status === 'live' 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
        }`}>
            {status === 'live' ? '🟢 LIVE' : '🟡 COMING SOON'}
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

export default LandingPage;
