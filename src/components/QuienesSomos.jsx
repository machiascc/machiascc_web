import React from 'react';
import { Users, History, Award, BookUser, Presentation } from 'lucide-react';
import fotoHistoria from '../assets/images/historia_local.jpg';
import fotoJohana from '../assets/images/johana_quintana.jpg';
import fotoElda from '../assets/images/Elda_Juarez.jpg';
import fotoRene from '../assets/images/Rene_juaerez.jpg';

const QuienesSomos = () => {
  const directiva = [
    { nombre: 'Johana Quintana', cargo: 'Presidenta', foto: fotoJohana, icono: BookUser },
    { nombre: 'Elda Juárez', cargo: 'Encargado de Cultura', foto: fotoElda, icono: Award },
    { nombre: 'René Juárez', cargo: 'Tesorera ', foto: fotoRene, icono: Presentation }
  ];

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Historia con foto real */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <img src={fotoHistoria} alt="Historia" className="rounded-3xl shadow-xl h-[400px] object-cover" />
          <div>
            <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase">Nuestra Historia</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              En el corazón del barrio Kildonan Norte, se encuentra nuestro hogar. En Main 1761, encontrarás un lugar de encuentro para todos los chilenos. Aquí vive la gran familia de Chile: la Manitoba Chilean Association., 
              Fundada hace más de 20 años, esta asociación sin fines de lucro agrupa a diversas personas que llegaron a Winnipeg desde los años 70 hasta la fecha. Durante muchos años, la MCHA ha participado en diferentes actividades culturales y sociales, comprometida con la difusión de la cultura chilena.
              Hoy en día, la organización está en un proceso de crecimiento, entendiendo que los tiempos cambian y hay diferentes necesidades para los recién llegados. Siempre se enfoca en ayudar a nuestros compatriotas que vienen llegando.
            </p>
          </div>
        </div>

        {/* Tarjetas de la Directiva */}
        <div className="grid md:grid-cols-3 gap-8">
          {directiva.map((miembro, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-3xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img src={miembro.foto} alt={miembro.nombre} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md" />
              <h3 className="text-xl font-bold text-blue-900">{miembro.nombre}</h3>
              <p className="text-red-600 font-bold text-sm uppercase mb-3">{miembro.cargo}</p>
              <miembro.icono className="mx-auto text-gray-400" size={24} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;