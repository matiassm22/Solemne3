import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Leaf, Droplets, Sun, Beaker, ShieldPlus, BarChart3, Loader2 } from "lucide-react";
import { Plant } from "../data";
import { fetchPlant } from "../api";
import { Mensaje } from "../components/Mensaje";

export function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    fetchPlant(id)
      .then(data => {
        setPlant(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Mostrando detalles en modo local/desconectado.");
        import("../data").then(module => {
          const found = module.plantsData.find(p => p.id === id) || null;
          setPlant(found);
          setLoading(false);
        });
      });
  }, [id]);

  useEffect(() => {
    if (plant) {
      document.title = `${plant.name} | Huerto Medicinal CESFAM`;
    }
    return () => { document.title = "Huerto Medicinal CESFAM"; };
  }, [plant]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
        <p className="text-slate-500 font-medium">Cargando detalles...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Planta no encontrada</h2>
        <Link to="/plantas" className="text-emerald-600 hover:underline mt-4 inline-block">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {error && (
        <Mensaje tipo="error" texto={error} />
      )}

      <Link to="/plantas" className="inline-flex items-center text-slate-500 hover:text-emerald-600 transition-colors mb-2 font-medium">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver al catálogo
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
        <div className="h-64 md:h-96 relative">
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full flex justify-between items-end">
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-500/80 backdrop-blur-sm rounded-full text-sm font-semibold mb-3">
                {plant.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{plant.name}</h1>
              <p className="text-lg md:text-xl text-emerald-100 italic">{plant.scientificName}</p>
            </div>
            
            <div className="hidden md:flex flex-col items-end text-right bg-black/40 p-4 rounded-xl backdrop-blur-sm">
                <span className="text-emerald-200 text-sm font-medium">Stock Disponible</span>
                <span className="text-3xl font-bold">{plant.cantidad || 0}</span>
                <span className={`text-sm mt-1 px-2 py-0.5 rounded font-medium ${plant.estado === 'Crítico' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                  Estado: {plant.estado || 'Bueno'}
                </span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-10">
          {/* Ficha Técnica del Material */}
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
             <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-2">
              <div className="p-2 bg-slate-200 rounded-lg text-slate-700">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Ficha del Material</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div>
                  <p className="text-sm text-slate-500 font-medium">Código</p>
                  <p className="font-semibold text-slate-800">{plant.codigo || 'N/A'}</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500 font-medium">Stock</p>
                  <p className="font-semibold text-slate-800">{plant.cantidad || 0} unidades</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500 font-medium">Estado</p>
                  <p className={`font-semibold ${plant.estado === 'Crítico' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {plant.estado || 'Bueno'}
                  </p>
               </div>
               <div>
                  <p className="text-sm text-slate-500 font-medium">Categoría</p>
                  <p className="font-semibold text-slate-800">{plant.category}</p>
               </div>
            </div>
          </section>

          {/* Beneficios */}
          <section>
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <ShieldPlus className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Beneficios Principales</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plant.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <Leaf className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Forma de uso */}
            <section>
              <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Droplets className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Forma de Uso</h2>
              </div>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {plant.usage}
              </p>
            </section>

            {/* Principios Activos */}
            <section>
              <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <Beaker className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Principios Activos</h2>
              </div>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {plant.activePrinciples}
              </p>
            </section>
          </div>

          {/* Cuidados y Mantención */}
          <section>
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Sun className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Cuidados y Mantención</h2>
            </div>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {plant.care}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}