import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, Filter, Loader2 } from "lucide-react";
import { Plant } from "../data";
import { fetchPlants } from "../api";
import { MaterialCard } from "../components/MaterialCard";
import { Mensaje } from "../components/Mensaje";

export function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todas");

  useEffect(() => {
    document.title = "Catálogo de Plantas | Huerto Medicinal CESFAM";
    
    fetchPlants()
      .then(data => {
        setPlants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Mostrando catálogo en modo local/desconectado.");
        import("../data").then(module => {
          setPlants(module.plantsData);
          setLoading(false);
        });
      });
  }, []);

  const categories = ["Todas", ...new Set(plants.map(p => p.category))];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Todas" || plant.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
        <p className="text-slate-500 font-medium">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <section className="space-y-8 animate-in fade-in duration-500">
      {error && (
        <Mensaje tipo="error" texto={error} />
      )}

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-800">Catálogo de Plantas Medicinales</h1>
        <p className="text-lg text-slate-600">
          Explora las plantas medicinales disponibles en nuestro huerto comunitario. Encuentra información detallada sobre los beneficios, cuidados y estado de cada una.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>

          <label htmlFor="busqueda-catalogo" className="sr-only">
            Buscar planta por nombre o nombre científico
          </label>
          
          <input 
            id="busqueda-catalogo"
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <Filter className="h-5 w-5 text-slate-400 hidden md:block" />
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category 
                    ? "bg-emerald-600 text-white shadow-sm" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredPlants.length > 0 ? (
        <div className="grilla-tarjetas">
          {filteredPlants.map(plant => (
            <Link 
              key={plant.id} 
              to={`/plantas/${plant.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MaterialCard 
                nombre={plant.name}
                codigo={plant.codigo || `PL-${Math.floor(Math.random()*1000)}`}
                estado={plant.estado || 'Bueno'}
                cantidad={plant.cantidad || Math.floor(Math.random()*50)}
                imagen={plant.image}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No se encontraron plantas</h3>
          <p className="text-slate-500 mt-2">Intenta con otros términos de búsqueda o filtros.</p>
          <button 
            onClick={() => { setSearchTerm(""); setActiveCategory("Todas"); }}
            className="mt-6 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </section>
  );
}
