import React from 'react';
import { BookUser, Award, Presentation, PenTool, HeartPulse } from 'lucide-react';

// IMPORTACIÓN DE FOTOS (Asegúrate de que estén en src/assets/images/)
import fotoHistoria from '../assets/images/historia_local.jpg';
import fotoJohana from '../assets/images/johana_quintana.jpg';
import fotoRene from '../assets/images/Rene_juaerez.jpg';
import fotoTamara from '../assets/images/Tamara_Medina.jpg';
import fotoReinaldo from '../assets/images/Reynaldo_ulloa.jpg';
import fotoElda from '../assets/images/Elda_Juarez.jpg';

const QuienesSomos = () => {
  const directiva = [
    { 
      nombre: 'Johana Quintana', 
      cargo: 'Presidenta', 
      foto: fotoJohana, 
      icono: BookUser 
    },
    { 
      nombre: 'René Juárez', 
      cargo: 'Tesorero', 
      foto: fotoRene, 
      icono: Presentation 
    },
    { 
      nombre: 'Tamara Medina', 
      cargo: 'Secretaria', 
      foto: fotoTamara, 
      icono: PenTool 
    },
    { 
      nombre: 'Reinaldo Ulloa', 
      cargo: 'Encargado de Cultura', 
      foto: fotoReinaldo, 
      icono: Award 
    },
    { 
      nombre: 'Elda Juárez', 
      cargo: 'Bienestar Social', 
      foto: fotoElda, 
      icono: HeartPulse 
    }
  ];

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Historia */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <img 
            src={fotoHistoria} 
            alt="Historia MCACC" 
            className="rounded-[40px] shadow-2xl h-[450px] w-full object-cover" 
          />
          <div>
            <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase italic">Nuestra Historia</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Fundada hace más de 20 años, la Manitoba Chilean Association (MCACC) es una organización sin fines de lucro 
              que une a los chilenos en Winnipeg desde los años 70. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hoy, nos enfocamos en el crecimiento y en apoyar a los nuevos compatriotas que llegan a la provincia, 
              manteniendo siempre vivo el orgullo de nuestras raíces.
            </p>
          </div>
        </div>

        {/* Título Directiva */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-blue-900 uppercase italic">Nuestra Directiva</h2>
          <div className="h-1 w-20 bg-red-600 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Tarjetas de la Directiva - Ajustado para que las 5 luzcan bien */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {directiva.map((miembro, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-[32px] text-center shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative mb-4 inline-block">
                <img 
                  src={miembro.foto} 
                  alt={miembro.nombre} 
                  className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white shadow-md" 
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-900 text-white p-2 rounded-full shadow-lg">
                  <miembro.icono size={14} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-blue-900 leading-tight mb-1">{miembro.nombre}</h3>
              <p className="text-red-600 font-black text-[9px] uppercase tracking-widest">{miembro.cargo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;