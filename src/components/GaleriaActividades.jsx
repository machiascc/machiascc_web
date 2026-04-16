import React, { useState } from 'react';
import * as Icon from 'lucide-react';

const GaleriaActividades = () => {
  // --- ESTADO PARA EL LIGHTBOX ---
  // Guardamos la URL de la imagen que se está ampliando. Si es null, el Lightbox está cerrado.
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  // Generamos el array de 22 fotos automáticamente, detectando la .webp
  const fotos = Array.from({ length: 22 }, (_, i) => {
    const numero = i + 1;
    const extension = numero === 16 ? '.webp' : '.jpg';
    return {
      id: numero,
      url: `assets/gallery/galeria_${numero}${extension}`,
      title: "Winnipeg, MB"
    };
  });

  // Funciones para abrir y cerrar el modal
  const abrirImagen = (url) => {
    setImagenSeleccionada(url);
    // Opcional: Bloquear el scroll del body al abrir
    document.body.style.overflow = 'hidden';
  };

  const cerrarImagen = () => {
    setImagenSeleccionada(null);
    // Restaurar el scroll del body al cerrar
    document.body.style.overflow = '';
  };

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-blue-900 uppercase">Winnipeg Gallery</h2>
            <div className="h-1.5 w-20 bg-red-600 mt-4 rounded-full"></div>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] hidden md:block">
            Click to enlarge
          </p>
        </div>

        {/* --- GRILLA DE FOTOS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fotos.map((foto) => (
            <div 
              key={foto.id} 
              className="group relative rounded-3xl overflow-hidden shadow-md h-64 bg-gray-100 border border-gray-100 cursor-pointer"
              onClick={() => abrirImagen(foto.url)} // Abrir modal al hacer clic
            >
              <img 
                src={foto.url} 
                alt={`Winnipeg landscape ${foto.id}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Winnipeg+Landscape'; }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-white font-bold uppercase tracking-widest text-[10px] bg-blue-900/50 px-5 py-3 rounded-full backdrop-blur-sm flex items-center gap-2">
                  <Icon.Maximize size={14} /> View Full
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://sites.google.com/view/mchacc/home" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-blue-900 font-black uppercase text-[10px] tracking-[0.3em] hover:text-red-600 transition-all"
          >
            Explore More in our Legacy Site <Icon.ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* --- EL MODAL / LIGHTBOX (Solo se muestra si imagenSeleccionada tiene valor) --- */}
      {imagenSeleccionada && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={cerrarImagen} // Cerrar si haces clic en el fondo
        >
          {/* Botón de cerrar (X) */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            onClick={cerrarImagen}
          >
            <Icon.X size={32} />
          </button>

          {/* Imagen Ampliada */}
          <img 
            src={imagenSeleccionada} 
            alt="Expanded Winnipeg Landscape" 
            className="max-w-full max-h-full rounded-2xl shadow-2xl animate-fade-in cursor-default"
            onClick={(e) => e.stopPropagation()} // Evitar que el clic en la imagen cierre el modal
          />

          {/* Pie de foto opcional */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[10px] uppercase tracking-widest font-bold">
            Winnipeg, MB
          </div>
        </div>
      )}
    </section>
  );
};

export default GaleriaActividades;