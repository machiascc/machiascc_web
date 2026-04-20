import React, { useState, useEffect, useRef } from 'react';
import Globe from 'lucide-react/dist/esm/icons/globe';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Send from 'lucide-react/dist/esm/icons/send';
import X from 'lucide-react/dist/esm/icons/x';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Menu from 'lucide-react/dist/esm/icons/menu'; // <- Agregado para el menú móvil

import emailjs from '@emailjs/browser';

// IMPORTACIÓN DE COMPONENTES
import QuienesSomos from './components/QuienesSomos';
import MisionVision from './components/MisionVision';
import GaleriaActividades from './components/GaleriaActividades';
import Mapa from './components/Mapa';
import Folklore from './components/Folklore';

// ASSETS
import logoMB from './assets/images/logo_MB.jpg';

const App = () => {
  const form = useRef();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <- Estado para controlar el menú en móviles
  const [indiceFoto, setIndiceFoto] = useState(1);
  const [idioma, setIdioma] = useState('es'); 
  const [inputMessage, setInputMessage] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensajes, setMensajes] = useState([
    { role: "bot", text: idioma === 'es' ? "¡Bienvenidos!" : "Welcome!" }
  ]);

  // --- DICCIONARIO DE TRADUCCIÓN AMPLIADO ---
  const t = {
    en: {
      nav: { home: "Home", about: "About Us", folk: "Traditions", gallery: "Gallery", contact: "Contact" },
      hero: { title: "Chilean Heart", city: "in Winnipeg", sub: "Preserving our culture since 1974.", btn: "Learn More" },
      folk: {
        mainTitle: "Culture & Traditions",
        rumelTitle: "Rumel Folk Group",
        rumelDesc: "Traditional dances and music that keep our spirit alive in Manitoba.",
        foodTitle: "Chilean Gastronomy",
        foodDesc: "Authentic flavors: empanadas, humitas, and the best of our traditional cuisine.",
        actTitle: "Events & Activities",
        actDesc: "Community meetings, cultural workshops, and celebrations throughout the year."
      },
      contact: { title: "Get in Touch", name: "Full Name", email: "Email Address", msg: "Your Message", send: "Send Message", sending: "Sending...", success: "Message sent!" },
      footer: { connect: "Connect", slogan: "Preserving Chilean Culture since 1974", rights: "Manitoba Chilean Association" },
      chat: { btn: "Chat AI", placeholder: "Type...", title: "Assistant" }
    },
    es: {
      nav: { home: "Inicio", about: "Nosotros", folk: "Tradiciones", gallery: "Galería", contact: "Contacto" },
      hero: { title: "Corazón Chileno", city: "en Winnipeg", sub: "Preservando nuestra cultura desde 1974.", btn: "Conócenos" },
      folk: {
        mainTitle: "Cultura y Tradiciones",
        rumelTitle: "Grupo Folclórico Rumel",
        rumelDesc: "Danzas y música tradicional que mantienen vivo nuestro espíritu en Manitoba.",
        foodTitle: "Comida Chilena",
        foodDesc: "Sabores auténticos: empanadas, humitas y lo mejor de nuestra gastronomía.",
        actTitle: "Eventos y Actividades",
        actDesc: "Encuentros comunitarios, talleres y celebraciones durante todo el año."
      },
      contact: { title: "Contáctenos", name: "Nombre Completo", email: "Correo Electrónico", msg: "Tu Mensaje", send: "Enviar Mensaje", sending: "Enviando...", success: "¡Mensaje enviado!" },
      footer: { connect: "Contacto", slogan: "Preservando la Cultura Chilena desde 1974", rights: "Asociación Chilena de Manitoba" },
      chat: { btn: "Chat con IA", placeholder: "Escribe...", title: "Asistente Virtual" }
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setEnviando(true);
    emailjs.sendForm('service_astmfqr', 'template_0pybe76', form.current, 'MIOpTURvVjSppjp-P')
    .then(() => {
        alert(t[idioma].contact.success);
        setEnviando(false);
        e.target.reset();
    }, () => setEnviando(false));
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceFoto(prev => (prev >= 36 ? 1 : prev + 1));
    }, 5000); 
    return () => clearInterval(intervalo);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMensajes([...mensajes, { role: "user", text: inputMessage }, { role: "bot", text: "..." }]);
    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans scroll-smooth">
      
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-[150] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img src={logoMB} alt="Logo" className="w-10 h-10 rounded-full" />
            <div className='flex flex-col text-left font-bold text-blue-900'>
              <span className="text-xl tracking-tighter leading-none">MCACC</span>
              <span className="text-[8px] uppercase tracking-widest text-gray-400">Winnipeg</span>
            </div>
          </div>

          {/* BOTÓN HAMBURGUESA Y MUNDO (Solo se ve en móviles) */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')}
              className="text-blue-900 p-2 bg-slate-100 rounded-full"
            >
              <Globe size={18} />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-900"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* MENÚ ESCRITORIO (Se oculta en móviles) */}
          <div className="hidden md:flex gap-8 font-bold text-[10px] text-gray-500 uppercase tracking-widest">
            <a href="#inicio" className="hover:text-red-600 transition-colors">{t[idioma].nav.home}</a>
            <a href="#nosotros" className="hover:text-red-600 transition-colors">{t[idioma].nav.about}</a>
            <a href="#folklore" className="hover:text-red-600 transition-colors">{t[idioma].nav.folk}</a>
            <a href="#gallery" className="hover:text-red-600 transition-colors">{t[idioma].nav.gallery}</a>
            <a href="#contacto" className="hover:text-red-600 transition-colors">{t[idioma].nav.contact}</a>
          </div>

          {/* BOTÓN IDIOMA ESCRITORIO (Se oculta en móviles) */}
          <button onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} className="hidden md:flex bg-slate-100 text-blue-900 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all items-center gap-2">
            <Globe size={14} /> {idioma === 'es' ? 'English' : 'Español'}
          </button>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL (Solo se activa cuando isMenuOpen es true) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 flex flex-col p-6 gap-4 font-bold text-sm text-gray-600 uppercase tracking-widest animate-in slide-in-from-top duration-300">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600">{t[idioma].nav.home}</a>
            <a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600">{t[idioma].nav.about}</a>
            <a href="#folklore" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600">{t[idioma].nav.folk}</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600">{t[idioma].nav.gallery}</a>
            <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600">{t[idioma].nav.contact}</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header id="inicio" className="relative h-[700px] flex items-center justify-center text-white bg-blue-900 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(assets/images/lugares-turisticos-${indiceFoto}.jpg)` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-20 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase italic">
            {t[idioma].hero.title} <br/> <span className="text-red-600 not-italic">{t[idioma].hero.city}</span>
          </h1>
          <p className="text-xl mb-10 opacity-90">{t[idioma].hero.sub}</p>
          <a href="#nosotros" className="bg-red-600 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl inline-block hover:scale-105 transition-all">
            {t[idioma].hero.btn}
          </a>
        </div>
      </header>

      {/* SECCIONES */}
      <div id="nosotros"><QuienesSomos /></div>
      <MisionVision />
      
      <Folklore t={t[idioma]} />

      <div id="gallery"><GaleriaActividades /></div>
      <Mapa />

      {/* CONTACTO */}
      <section id="contacto" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-black text-blue-900 uppercase italic text-center mb-12">{t[idioma].contact.title}</h2>
            <form ref={form} onSubmit={sendEmail} className="grid md:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-[40px] border border-gray-100">
                <input name="user_name" placeholder={t[idioma].contact.name} type="text" required className="p-4 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-red-600" />
                <input name="user_email" placeholder={t[idioma].contact.email} type="email" required className="p-4 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-red-600" />
                <textarea name="message" placeholder={t[idioma].contact.msg} required className="md:col-span-2 p-4 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-red-600 h-32"></textarea>
                <button type="submit" disabled={enviando} className="md:col-span-2 py-4 rounded-2xl font-black uppercase bg-blue-900 text-white hover:bg-red-600 transition-all">
                    {enviando ? t[idioma].contact.sending : t[idioma].contact.send}
                </button>
            </form>
        </div>
      </section>

      {/* FOOTER TOTALMENTE TRADUCIBLE */}
      <footer className="bg-blue-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-center">
          <div className="text-center md:text-left">
            <img src={logoMB} alt="Logo" className="w-16 h-16 mb-4 rounded-full border-2 border-red-600 mx-auto md:mx-0" />
            <p className="text-[10px] font-black uppercase text-red-500 tracking-widest">{t[idioma].footer.slogan}</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-4">{t[idioma].footer.connect}</h4>
            <div className="text-[10px] opacity-60 uppercase space-y-2">
              <p className="flex items-center justify-center md:justify-start gap-2"><MapPin size={14}/> 1761 Main St, Winnipeg</p>
              <p className="flex items-center justify-center md:justify-start gap-2"><Mail size={14}/> mchacc@gmail.com</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
             <a href="https://chat.whatsapp.com/CPDSTuUs9zO32r5u7j4BBv" className="bg-green-600 px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-green-700 transition-all">
                <MessageCircle size={18} /> WhatsApp Group
             </a>
          </div>
        </div>
        <p className="text-center text-[9px] opacity-20 font-black tracking-widest mt-12 uppercase">{t[idioma].footer.rights} © 2026</p>
      </footer>

      {/* CHATBOT */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
        {isChatOpen && (
          <div className="bg-white w-80 h-[480px] rounded-[32px] shadow-2xl mb-6 flex flex-col overflow-hidden border border-gray-100">
            <div className="bg-blue-900 p-5 text-white flex justify-between items-center">
              <span className="font-black text-[10px] uppercase tracking-widest">{t[idioma].chat.title}</span>
              <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gray-50">
              {mensajes.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-2xl text-[11px] font-medium shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
              <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-[11px] outline-none" placeholder={t[idioma].chat.placeholder} />
              <button type="submit" className="bg-blue-900 text-white p-2 rounded-xl"><Send size={18}/></button>
            </form>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-red-600 text-white p-5 rounded-[28px] shadow-2xl flex items-center gap-3 hover:scale-105 transition-all">
          <MessageCircle size={28} />
          <span className="text-[10px] font-black uppercase tracking-widest">{t[idioma].chat.btn}</span>
        </button>
      </div>
    </div>
  );
};

export default App;