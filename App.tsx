
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin, 
  CheckCircle2, 
  Terminal, 
  Mail, 
  Loader2, 
  RefreshCw,
  Lock,
  Cpu,
  AlertTriangle
} from 'lucide-react';
import Logo from './components/Logo';
import ChatWidget from './components/ChatWidget';
import { SERVICES, getIcon } from './constants';
import { SectionId } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: SERVICES[0].id,
    message: ''
  });

  const fullText = "Initializing secure handshake... [OK]\nScanning for vulnerabilities... [NONE FOUND]\nByteCode Labs: Digital Fortress Active.\nSystem Status: READY.";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError(null);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Identity and Comms fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid secure comms format (Email).");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Updated with the Form ID from your screenshot: mpqaggno
      const response = await fetch("https://formspree.io/f/mpqaggno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `ByteCode Labs Inquiry: ${formData.name}`,
          _gotcha: "" 
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || "Transmission failed. Node refused connection.");
      }
    } catch (err) {
      setError("Network failure. Connection to secure node lost.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      service: SERVICES[0].id,
      message: ''
    });
    setIsSubmitted(true); // Keeping success view active but reset internal data if needed
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => scrollToSection(SectionId.HERO)}>
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Services', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection(SectionId.CONTACT)}
              className="bg-black hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-lg text-sm transition-all hover:shadow-lg"
            >
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300">
          {['Services', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-2xl font-black text-slate-400 hover:text-black uppercase tracking-tighter"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection(SectionId.CONTACT)}
            className="bg-black text-white font-bold px-10 py-4 rounded-lg text-lg"
          >
            Get Started
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section id={SectionId.HERO} className="relative pt-44 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-slate-300 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-200 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Shield size={12} />
                <span>Enterprise Security Engineering</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-black">
                Hardening <br /> Frontiers.
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
                Elite cybersecurity auditing, penetration testing, and software development for the next generation of digital infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection(SectionId.CONTACT)}
                  className="bg-black hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-xl"
                >
                  Start Your Audit <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => scrollToSection(SectionId.SERVICES)}
                  className="bg-white border-2 border-black text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-slate-50"
                >
                  View Services
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-black rounded-2xl border border-black shadow-2xl overflow-hidden">
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">System Monitor</span>
                  </div>
                  <Terminal size={14} className="text-slate-400" />
                </div>
                <div className="p-8 h-64 font-mono text-sm leading-relaxed whitespace-pre-wrap text-white">
                  <span className="text-slate-500">$</span> {terminalText}
                  <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-300/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id={SectionId.SERVICES} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Capabilities</h2>
              <p className="text-slate-500 text-lg font-medium">
                Offensive security research paired with defensive software architecture.
              </p>
            </div>
            <button className="text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b-2 border-black pb-1 hover:gap-4 transition-all">
              View All Systems <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                className="group p-10 rounded-2xl bg-slate-50 border border-slate-200 hover:border-black transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                  {getIcon(service.icon, 24)}
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8 font-medium">
                  {service.description}
                </p>
                <button className="text-black font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                  System Specs <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id={SectionId.ABOUT} className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                alt="Cyber Security Detail" 
                className="rounded-2xl shadow-2xl grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-8 -right-8 bg-black p-10 rounded-2xl border border-black shadow-2xl hidden md:block">
                <div className="text-5xl font-black text-white mb-2 tracking-tighter">0.0%</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Compromise <br /> Rate History</div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">Protocol Alpha</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                Security is not a plugin; it is the core architecture. We build digital fortresses from the ground up, ensuring every line of code is a defensive layer.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Active Threat Mitigation",
                  "Secure Source Auditing",
                  "Encrypted Workflows",
                  "Hardened Infrastructure"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => scrollToSection(SectionId.CONTACT)}
                className="mt-12 bg-black text-white font-black py-4 px-10 rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-sm"
              >
                Our Manifesto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id={SectionId.CONTACT} className="py-24 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl min-h-[600px]">
            <div className="grid lg:grid-cols-2 min-h-full">
              <div className="p-12 lg:p-20 flex flex-col justify-center">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase">Inquire</h2>
                    <p className="text-slate-500 mb-10 text-lg font-medium">
                      Connect with our lead analysts for a high-level briefing on your security posture.
                    </p>
                    
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ident</label>
                          <input 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder="NAME / ALIAS" 
                            className={`w-full bg-slate-50 border ${error && !formData.name ? 'border-red-500' : 'border-slate-200'} rounded-lg px-4 py-4 focus:outline-none focus:border-black transition-all font-mono text-sm`}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comms</label>
                          <input 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email" 
                            placeholder="EMAIL@SECURE.COM" 
                            className={`w-full bg-slate-50 border ${error && !formData.email ? 'border-red-500' : 'border-slate-200'} rounded-lg px-4 py-4 focus:outline-none focus:border-black transition-all font-mono text-sm`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requested Domain</label>
                        <select 
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-4 focus:outline-none focus:border-black transition-all appearance-none font-mono text-sm cursor-pointer"
                        >
                          {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title.toUpperCase()}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Payload</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4} 
                          placeholder="DESCRIBE YOUR CURRENT STACK..." 
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-4 focus:outline-none focus:border-black transition-all font-mono text-sm"
                        ></textarea>
                      </div>
                      
                      {error && (
                        <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest bg-red-50 p-3 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                          <AlertTriangle size={14} /> {error}
                        </div>
                      )}

                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-black hover:bg-slate-800 text-white font-black py-5 rounded-xl transition-all uppercase tracking-[0.3em] shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            TRANSMITTING...
                          </>
                        ) : (
                          <>
                            Transmit <Cpu className="group-hover:rotate-12 transition-transform" size={18} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white mb-8 shadow-xl">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">Transmission Received</h2>
                    <p className="text-slate-500 mb-8 max-w-sm font-medium">
                      Inquiry encrypted and routed to your secure terminal. You will receive a secure response within 24 hours.
                    </p>
                    
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[10px] w-full mb-8 text-left space-y-3">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-400 font-bold uppercase tracking-widest">Protocol</span>
                        <span className="text-black font-bold">HTTPS/TLS 1.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">IDENT:</span>
                        <span className="text-black">{formData.name.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">COMMS:</span>
                        <span className="text-black italic">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">DOMAIN:</span>
                        <span className="text-black">{formData.service.replace('-', ' ').toUpperCase()}</span>
                      </div>
                      <div className="pt-2 flex justify-between text-slate-400 border-t border-slate-100">
                        <span>TRACE_ID:</span>
                        <span className="text-black font-bold">BCL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                      </div>
                    </div>

                    <button 
                      onClick={resetForm}
                      className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-slate-400 hover:text-black transition-colors"
                    >
                      <RefreshCw size={14} /> New Transmission
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-black p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                   <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-white text-3xl font-black mb-12 leading-tight tracking-tight uppercase">
                    "BYTECODE LABS IS THE GOLD STANDARD FOR OFFENSIVE SECURITY AUDITING."
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded bg-slate-800 flex items-center justify-center font-black text-white text-2xl">MV</div>
                    <div>
                      <div className="font-black text-white text-xl uppercase tracking-tighter">Marcus Vane</div>
                      <div className="text-slate-500 font-bold text-xs uppercase tracking-widest">Nexus Dynamics Group</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-12 relative z-10 mt-16 pt-16 border-t border-slate-800">
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded border border-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-black transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-slate-500 font-black uppercase text-[10px] tracking-widest mb-1">Secure Channel</div>
                      <div className="text-white font-bold font-mono">ops@bytecodelabs.io</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded border border-slate-800 flex items-center justify-center text-slate-400">
                      <Lock size={20} />
                    </div>
                    <div>
                      <div className="text-slate-500 font-black uppercase text-[10px] tracking-widest mb-1">HQ Location</div>
                      <div className="text-white font-bold uppercase tracking-tighter">San Francisco // Tech District</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <Logo light className="mb-8" />
              <p className="text-slate-500 font-medium leading-relaxed">
                Premium digital fortification and high-performance software engineering. Build for security.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
              <div>
                <h4 className="font-black mb-8 text-white uppercase text-xs tracking-[0.3em]">Services</h4>
                <ul className="space-y-4 text-slate-500 text-sm font-bold uppercase tracking-tight">
                  <li><button className="hover:text-white transition-colors">Audit</button></li>
                  <li><button className="hover:text-white transition-colors">Development</button></li>
                  <li><button className="hover:text-white transition-colors">Hardening</button></li>
                  <li><button className="hover:text-white transition-colors">Consulting</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black mb-8 text-white uppercase text-xs tracking-[0.3em]">Company</h4>
                <ul className="space-y-4 text-slate-500 text-sm font-bold uppercase tracking-tight">
                  <li><button className="hover:text-white transition-colors">Team</button></li>
                  <li><button className="hover:text-white transition-colors">Nexus</button></li>
                  <li><button className="hover:text-white transition-colors">Intelligence</button></li>
                  <li><button className="hover:text-white transition-colors">Portal</button></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-black mb-8 text-white uppercase text-xs tracking-[0.3em]">Network</h4>
                <div className="flex gap-4">
                  {[Twitter, Linkedin, Github].map((Icon, idx) => (
                    <button key={idx} className="w-12 h-12 rounded border border-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <Icon size={20} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
            <p>© {new Date().getFullYear()} BYTECODE LABS // SYSTEMS ACTIVE</p>
            <div className="flex gap-12">
              <button className="hover:text-white">Privacy.p7s</button>
              <button className="hover:text-white">Terms.md</button>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <ChatWidget />
    </div>
  );
};

export default App;
