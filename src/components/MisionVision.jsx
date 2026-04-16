import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

const MisionVision = () => {
  return (
    <section id="mision" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Tarjeta de Misión */}
          <div className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-blue-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Nuestra Misión</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Fortalecer los lazos de la comunidad chilena en Manitoba, promoviendo nuestra cultura y tradiciones, 
              mientras brindamos un espacio de apoyo y acogida para todos nuestros miembros.
            </p>
          </div>

          {/* Tarjeta de Visión */}
          <div className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-red-600">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Nuestra Visión</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ser el punto de referencia y apoyo principal para los chilenos en la provincia, integrando a las 
              nuevas generaciones y manteniendo vivo el orgullo de nuestras raíces en el corazón de Canadá.
            </p>
          </div>

        </div>

        {/* Frase de Cierre */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
            <Heart size={16} className="fill-red-500 stroke-red-500" />
            Comunidad Chilena en Manitoba
          </div>
        </div>
      </div>
    </section>
  );
};

export default MisionVision;