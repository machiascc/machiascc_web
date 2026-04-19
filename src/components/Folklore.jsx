import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const Folklore = ({ t }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fotoActual, setFotoActual] = useState(0);

  // Generamos el array de las 28 imágenes de Rumel
  // Nota: Se asume que están en public/assets/images para facilitar el acceso dinámico
  const fotosRumel = Array.from({ length: 28 }, (_, i) => `assets/images/grupo_rumel_${i + 1}.jpg`);

  const abrirGaleria = () => {
    setFotoActual(0);
    setModalAbierto(true);
    document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
  };

  const cerrarGaleria = () => {
    setModalAbierto(false);
    document.body.style.overflow = ''; // Libera el scroll
  };

  const siguienteFoto = (e) => {
    e.stopPropagation();
    setFotoActual((prev) => (prev + 1) % fotosRumel.length);
  };

  const anteriorFoto = (e) => {
    e.stopPropagation();
    setFotoActual((prev) => (prev - 1 + fotosRumel.length) % fotosRumel.length);
  };

  const items = [
    {
      img: "assets/images/Grupo_Rumel_principal.jpg",
      title: t.folk.rumelTitle,
      desc: t.folk.rumelDesc,
      isGallery: true // Marcamos esta como la que abre la galería
    },
    {
      img: "assets/images/comida_chilena_1.jpg",
      title: t.folk.foodTitle,
      desc: t.folk.foodDesc,
      isGallery: false
    },
    {
      img: "assets/images/Actividades_1.jpg",
      title: t.folk.actTitle,
      desc: t.folk.actDesc,
      isGallery: false
    }
  ];

  return (
    <section id="folklore" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-blue-900 uppercase italic">
            {t.folk.mainTitle}
          </h2>
          <div className="h-1.5 w-24 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item, index) => (
            <div key={index} className="group">
              <div 
                onClick={item.isGallery ? abrirGaleria : null}
                className={`relative h-80 mb-8 overflow-hidden rounded-[40px] shadow-2xl transition-all duration-500 
                  ${item.isGallery ? 'cursor-pointer hover:-translate-y-4 hover:ring-4 ring-red-600' : ''}`}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay para la imagen con galería */}
                {item.isGallery && (
                  <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                    <Maximize2 size={48} className="mb-2 animate-bounce" />
                    <span className="font-black uppercase tracking-widest text-xs">Ver Galería</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-40"></div>
              </div>
              <h3 className="text-2xl font-black text-blue-900 uppercase italic mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL DE GALERÍA RUMEL --- */}
      {modalAbierto && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={cerrarGaleria}
        >
          {/* Botón Cerrar */}
          <button 
            onClick={cerrarGaleria}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[210]"
          >
            <X size={40} />
          </button>

          {/* Flecha Izquierda */}
          <button 
            onClick={anteriorFoto}
            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-all p-2 bg-white/10 rounded-full hover:bg-white/20 z-[210]"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Imagen Principal */}
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center">
            <img 
              src={fotosRumel[fotoActual]} 
              alt={`Rumel ${fotoActual + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()} 
            />
            
            {/* Contador de Fotos */}
            <div className="mt-6 px-6 py-2 bg-white/10 rounded-full text-white font-bold tracking-[0.3em] text-[10px] uppercase">
              Foto {fotoActual + 1} / {fotosRumel.length}
            </div>
          </div>

          {/* Flecha Derecha */}
          <button 
            onClick={siguienteFoto}
            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-all p-2 bg-white/10 rounded-full hover:bg-white/20 z-[210]"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Folklore;