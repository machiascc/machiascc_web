import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Mapa = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <MapPin size={24} />
              <span className="font-bold uppercase tracking-widest">Ubícanos</span>
            </div>
            <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase">Nuestra Casa en Winnipeg</h2>
            <p className="text-gray-600 text-lg mb-8">
              Te esperamos en el corazón de la ciudad. Somos el punto de encuentro para todos los chilenos en Manitoba.
            </p>
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 inline-block">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-700">
                  <Navigation size={24} />
                </div>
                <div>
                  <p className="font-bold text-blue-900">Dirección Oficial</p>
                  <p className="text-gray-500 text-sm">1761 Main St, Winnipeg, MB R2V 1Z8</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              title="Ubicación MCACC"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2567.043513689445!2d-97.1199981234731!3d49.936328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea718174d40e69%3A0xbaca8ffcfcb44125!2s1761%20Main%20St%2C%20Winnipeg%2C%20MB%20R2V%201Z8!5e0!3m2!1sen!2sca!4v1710000000000!5m2!1sen!2sca" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mapa;