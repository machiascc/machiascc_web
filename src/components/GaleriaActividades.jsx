import React, { useState } from 'react';
import * as Icon from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GaleriaActividades = () => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  // Generamos el array de 22 fotos apuntando a la carpeta public
  const fotos = Array.from({ length: 22 }, (_, i) => {
    const numero = i + 1;
    const extension = numero === 16 ? '.webp' : '.jpg';
    return {
      id: numero,
      url: `assets/gallery/galeria_${numero}${extension}`,
      title: "Winnipeg, MB"
    };
  });

  const abrirImagen = (url) => {
    setImagenSeleccionada(url);
    document.body.style.overflow = 'hidden';
  };

  const cerrarImagen = () => {
    setImagenSeleccionada(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-blue-900 uppercase tracking-tight">Winnipeg Gallery</h2>
          <div className="h-1.5 w-20 bg-red-600 mt-4 rounded-full"></div>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">
            <span className="md:hidden">Swipe to explore our landscapes</span>
            <span className="hidden md:inline">Use arrows, scroll or click to enlarge</span>
          </p>
        </div>

        {/* --- CARRUSEL (SWIPER) --- */}
        <Swiper
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          mousewheel={true}
          keyboard={true}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, centeredSlides: false },
            1024: { slidesPerView: 3, centeredSlides: false },
            1280: { slidesPerView: 4, centeredSlides: false },
          }}
          className="pb-12"
        >
          {fotos.map((foto) => (
            <SwiperSlide key={foto.id}>
              <div 
                className="group relative rounded-[40px] overflow-hidden shadow-lg h-96 bg-gray-100 cursor-pointer border border-gray-100"
                onClick={() => abrirImagen(foto.url)}
              >
                <img 
                  src={foto.url} 
                  alt={foto.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Winnipeg+Image'; }}
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                     <Icon.Maximize className="text-white" size={28} />
                   </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- LIGHTBOX (MODAL) --- */}
      {imagenSeleccionada && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out" 
          onClick={cerrarImagen}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" 
            onClick={cerrarImagen}
          >
            <Icon.X size={40} />
          </button>
          
          <img 
            src={imagenSeleccionada} 
            alt="Winnipeg Full View" 
            className="max-w-full max-h-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} 
          />
          
          <div className="absolute bottom-8 text-white/40 text-[10px] uppercase font-bold tracking-[0.4em]">
            Winnipeg, MB - Landscape View
          </div>
        </div>
      )}
    </section>
  );
};

export default GaleriaActividades;