import React, { useState, useEffect, useRef } from 'react';
import * as Icon from 'lucide-react';
import emailjs from '@emailjs/browser';

// IMPORTACIÓN DE COMPONENTES
import QuienesSomos from './components/QuienesSomos';
import MisionVision from './components/MisionVision';
import GaleriaActividades from './components/GaleriaActividades';
import Mapa from './components/Mapa';

// ASSETS
import logoMB from './assets/images/logo_MB.jpg';

const App = () => {
  // --- REFERENCIAS Y ESTADOS ---
  const form = useRef();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [indiceFoto, setIndiceFoto] = useState(1);
  const [idioma, setIdioma] = useState('en'); 
  const [inputMessage, setInputMessage] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensajes, setMensajes] = useState([
    { role: "bot", text: "Welcome! I'm the MCACC virtual assistant. How can I help you?" }
  ]);

  // --- DICCIONARIO DE TRADUCCIÓN ---
  const t = {
    en: {
      nav: { home: "Home", about: "About Us", folk: "Folklore", gallery: "Gallery", contact: "Contact" },
      hero: { title: "Chilean Heart", city: "in Winnipeg", sub: "Preserving our culture since 1974.", btn: "Learn More" },
      folk: { title: "Folklore & Traditions", sub: "Gabriela Mistral Group", desc: "Representing our roots at Folklorama.", dancers: "Dancers", perf: "Performances", videoTitle: "Chile Lindo 2024" },
      contact: { title: "Get in Touch", name: "Full Name", email: "Email Address", msg: "Your Message", send: "Send Message", sending: "Sending...", success: "Message sent successfully!" },
      chat: { btn: "Chat AI", placeholder: "Type...", title: "Assistant" }
    },
    es: {
      nav: { home: "Inicio", about: "Nosotros", folk: "Folklore", gallery: "Galería", contact: "Contacto" },
      hero: { title: "Corazón Chileno", city: "en Winnipeg", sub: "Preservando nuestra cultura desde 1974.", btn: "Conócenos" },
      folk: { title: "Folklore y Tradiciones", sub: "Grupo Gabriela Mistral", desc: "Representando nuestras raíces en Folklorama.", dancers: "Bailarines", perf: "Presentaciones", videoTitle: "Chile Lindo 2024" },
      contact: { title: "Contáctenos", name: "Nombre Completo", email: "Correo Electrónico", msg: "Tu Mensaje", send: "Enviar Mensaje", sending: "Enviando...", success: "¡Mensaje enviado con éxito!" },
      chat: { btn: "Chat con IA", placeholder: "Escribe...", title: "Asistente Virtual" }
    }
  };

  // --- ENVÍO DE EMAIL (EMAILJS) ---
  const sendEmail = (e) => {
    e.preventDefault();
    setEnviando(true);

    emailjs.sendForm(
      'service_astmfqr', 
      'template_0pybe76', 
      form.current, 
      'MIOpTURvVjSppjp-P'
    )
    .then((result) => {
        alert(t[idioma].contact.success);
        setEnviando(false);
        e.target.reset();
    }, (error) => {
        alert("Error: " + error.text);
        setEnviando(false);
    });
  };

  // --- LÓGICA FONDO ROTATIVO ---
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceFoto(prev => (prev >= 36 ? 1 : prev + 1));
    }, 5000); 
    return () => clearInterval(intervalo);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMensajes([...mensajes, { role: "user", text: inputMessage }]);
    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans scroll-smooth">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logoMB} alt="Logo" className="w-10 h-10 object-contain" />
            <div className='flex flex-col text-left font-bold text-blue-900'>
                <span className="text-xl tracking-tighter leading-none">MCACC</span>
                <span className="text-[8px] uppercase tracking-widest text-gray-400">Winnipeg</span>
            </div>
          </div>
          
          {/* Menú de Navegación Visible */}
          <div className="hidden md:flex gap-8 font-bold text-[10px] text-gray-500 uppercase tracking-[0.2em]">
            <a href="#inicio" className="hover:text-red-600 transition-colors">{t[idioma].nav.home}</a>
            <a href="#nosotros" className="hover:text-red-600 transition-colors">{t[idioma].nav.about}</a>
            <a href="#folklore" className="hover:text-red-600 transition-colors">{t[idioma].nav.folk}</a>
            <a href="#contacto" className="hover:text-red-600 transition-colors">{t[idioma].nav.contact}</a>
          </div>

          <button 
            onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')}
            className="bg-blue-900 text-white px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-md"
          >
            {idioma === 'es' ? 'English' : 'Español'}
          </button>
        </div>
      </nav>

      {/* --- HERO --- */}
      <header id="inicio" className="relative h-[600px] flex items-center justify-center text-white bg-blue-900 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(assets/images/lugares-turisticos-${indiceFoto}.jpg)` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight drop-shadow-2xl">
            {t[idioma].hero.title} <br/> <span className="text-red-500 italic">{t[idioma].hero.city}</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 opacity-95">{t[idioma].hero.sub}</p>
          <a href="#nosotros" className="bg-red-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-sm inline-block">
            {t[idioma].hero.btn}
          </a>
        </div>
      </header>

      {/* --- NOSOTROS (ID para navegación) --- */}
      <div id="nosotros" className="scroll-mt-24">
        <QuienesSomos />
        <MisionVision />
      </div>

      {/* --- FOLKLORE --- */}
      <section id="folklore" className="py-24 bg-blue-900 text-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12 uppercase">{t[idioma].folk.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[ {id: "8czZ3Xcvgbk", t: "Part 1"}, {id: "eGCdWRllVcc", t: "Part 2"}, {id: "0bV9m9ax7uw", t: "Part 3"} ].map((vid) => (
              <div key={vid.id} className="bg-white/5 p-4 rounded-3xl border border-white/10">
                <div className="aspect-video mb-4 rounded-2xl overflow-hidden shadow-lg">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vid.id}`} title={vid.t} allowFullScreen></iframe>
                </div>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                  <Icon.PlayCircle size={14} className="text-red-500" /> Chile Lindo 2024 - {vid.t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALERÍA --- */}
      <div id="gallery" className="scroll-mt-24">
        <GaleriaActividades />
      </div>

      <Mapa />

      {/* --- CONTACTO --- */}
      <section id="contacto" className="py-24 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-blue-900 uppercase">{t[idioma].contact.title}</h2>
                <div className="h-1.5 w-20 bg-red-600 mx-auto mt-4 rounded-full"></div>
            </div>
            <form ref={form} onSubmit={sendEmail} className="grid md:grid-cols-2 gap-6 bg-white p-8 md:p-12 rounded-[40px] shadow-xl">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 ml-2 tracking-widest">{t[idioma].contact.name}</label>
                  <input name="user_name" type="text" required className="p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 ml-2 tracking-widest">{t[idioma].contact.email}</label>
                  <input name="user_email" type="email" required className="p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 ml-2 tracking-widest">{t[idioma].contact.msg}</label>
                  <textarea name="message" required className="p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-900 h-32"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={enviando}
                  className={`md:col-span-2 py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg transition-all ${enviando ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-red-600 text-white'}`}
                >
                    {enviando ? t[idioma].contact.sending : t[idioma].contact.send}
                </button>
            </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-blue-950 text-white pt-20 pb-10 border-t-8 border-red-600">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <img src={logoMB} alt="Logo" className="w-12 h-12 mb-6 mx-auto md:mx-0 brightness-200" />
            <p className="text-[10px] uppercase tracking-widest opacity-40">MCACC Winnipeg since 1974</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-red-500 font-bold uppercase text-[10px] tracking-widest">Connect</h4>
            <div className="flex justify-center md:justify-start gap-3 text-xs opacity-70"><Icon.MapPin size={14} /> 1761 Main St, Winnipeg</div>
            <div className="flex justify-center md:justify-start gap-3 text-xs opacity-70"><Icon.Mail size={14} /> mchacc@gmail.com</div>
          </div>
          <div className="flex flex-col items-center md:items-start">
             <a href="https://wa.me/" className="bg-green-600 px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                <Icon.MessageCircle size={16} /> WhatsApp Group
             </a>
          </div>
        </div>
      </footer>

      {/* --- CHATBOT --- */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="bg-white w-80 h-[450px] rounded-[32px] shadow-2xl mb-4 flex flex-col overflow-hidden border">
            <div className="bg-blue-900 p-4 text-white flex justify-between items-center">
              <span className="font-bold text-[10px] uppercase tracking-widest">{t[idioma].chat.title}</span>
              <button onClick={() => setIsChatOpen(false)}><Icon.X size={18} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {mensajes.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl text-xs ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white shadow-sm text-gray-700'}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
              <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-[10px] outline-none" placeholder="Type..." />
              <button type="submit" className="bg-blue-900 text-white p-2 rounded-xl"><Icon.Send size={16}/></button>
            </form>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-red-600 text-white p-5 rounded-[24px] shadow-2xl flex items-center gap-3">
          <Icon.MessageCircle size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{t[idioma].chat.btn}</span>
        </button>
      </div>

    </div>
  );
};

export default App;