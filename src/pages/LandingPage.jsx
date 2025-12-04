import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap, Users } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-classic-charcoal bg-classic-cream">
            {/* Navigation */}
            <nav className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-classic-gold/20 sticky top-0 z-50">
                <div className="text-2xl font-serif font-bold text-classic-navy">MACE</div>
                <div className="space-x-6">
                    <Link to="/login" className="text-classic-navy hover:text-classic-gold transition-colors font-medium">Log In</Link>
                    <a href="https://socialai-beta.vercel.app/register" className="px-6 py-2 bg-classic-navy text-white rounded-md hover:bg-classic-navy/90 transition-colors font-medium shadow-md">Get Started</a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-classic-cream to-white">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-classic-navy mb-6 leading-tight">
                    Master Your Social <br /> <span className="text-classic-gold">Presence</span>
                </h1>
                <p className="text-xl md:text-2xl text-classic-slate max-w-2xl mb-10 leading-relaxed">
                    The elegant solution for modern social media management. Schedule, analyze, and grow with precision and style.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://socialai-beta.vercel.app/register" className="px-8 py-4 bg-classic-navy text-white text-lg rounded-md hover:bg-classic-navy/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                        Start Your Journey <ArrowRight size={20} />
                    </a>
                    <Link to="/demo" className="px-8 py-4 bg-white text-classic-navy border border-classic-navy/20 text-lg rounded-md hover:bg-classic-cream transition-all shadow-sm hover:shadow-md">
                        View Demo
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-classic-navy mb-16">
                        Crafted for Excellence
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Zap size={32} className="text-classic-gold" />}
                            title="Lightning Fast"
                            description="Experience zero latency with our optimized scheduling engine designed for high-volume posting."
                        />
                        <FeatureCard
                            icon={<Shield size={32} className="text-classic-gold" />}
                            title="Bank-Grade Security"
                            description="Your data is protected with enterprise-level encryption and secure OAuth integrations."
                        />
                        <FeatureCard
                            icon={<Users size={32} className="text-classic-gold" />}
                            title="Team Collaboration"
                            description="Seamlessly manage workflows with your team. Assign roles, review posts, and approve with ease."
                        />
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-20 px-6 bg-classic-navy text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">Trusted by Industry Leaders</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
                        {/* Placeholders for logos */}
                        <div className="text-2xl font-serif font-bold">VOGUE</div>
                        <div className="text-2xl font-serif font-bold">FORBES</div>
                        <div className="text-2xl font-serif font-bold">WIRED</div>
                        <div className="text-2xl font-serif font-bold">TIME</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-classic-charcoal text-classic-cream py-12 px-6 border-t border-classic-gold/30">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-2xl font-serif font-bold text-white mb-4">MACE</div>
                        <p className="text-classic-cream/60">Elevating social media management to an art form.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-classic-cream/60">
                            <li><a href="#" className="hover:text-classic-gold transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-classic-gold transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-classic-gold transition-colors">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-classic-cream/60">
                            <li><a href="#" className="hover:text-classic-gold transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-classic-gold transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-classic-gold transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-classic-cream/60">
                            <li><Link to="/privacy" className="hover:text-classic-gold transition-colors">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-classic-gold transition-colors">Terms</Link></li>
                            <li><Link to="/data-deletion" className="hover:text-classic-gold transition-colors">Data Deletion</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-classic-cream/40 text-sm">
                    © {new Date().getFullYear()} MACE. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 bg-classic-cream rounded-lg border border-classic-navy/5 hover:border-classic-gold/50 transition-all hover:shadow-lg group">
        <div className="mb-6 p-4 bg-white rounded-full w-fit shadow-sm group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-classic-navy mb-3 font-serif">{title}</h3>
        <p className="text-classic-slate leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
