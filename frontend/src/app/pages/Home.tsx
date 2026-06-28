import { useEffect } from "react";
import { Link } from "react-router";
import { Search, ArrowRight, Mail, BarChart3, AlertTriangle, Leaf } from "lucide-react";
import { plantsData } from "../data";
import { MaterialCard } from "../components/MaterialCard";

export function Home() {
  useEffect(() => {
    document.title = "Inicio | Huerto Medicinal CESFAM";
  }, []);

  const totalPlantas = plantsData.length;
  const plantasCriticas = plantsData.filter(p => p.estado === 'Crítico').length;
  const totalStock = plantsData.reduce((acc, curr) => acc + (curr.cantidad || 0), 0);
  const featuredPlants = plantsData.slice(0, 3);

  return (
    <div className="space-y-12 pb-8">
     
      <section className="relative rounded-3xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-emerald-900/60 z-10 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1632232812783-c774e55bbbe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luYWwlMjBnYXJkZW58ZW58MXx8fHwxNzc4NDUzOTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
          alt="Huerto Medicinal" 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/80 text-xs font-semibold uppercase tracking-wider mb-4">
            CESFAM Las Condes
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-3xl leading-tight">
            Gestor de Plantas del Huerto
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-emerald-50 mb-8">
            Sistema de gestión de plantas y recursos de nuestro huerto medicinal comunitario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/plantas"
              className="bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>

     
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-emerald-600" />
          Resumen del Inventario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Tipos de Plantas</p>
              <p className="text-3xl font-bold text-slate-800">{totalPlantas}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <Search className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Unidades</p>
              <p className="text-3xl font-bold text-slate-800">{totalStock}</p>
            </div>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full text-red-600">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-red-500 font-medium">Estado Crítico</p>
              <p className="text-3xl font-bold text-red-800">{plantasCriticas}</p>
            </div>
          </div>
        </div>
      </section>

   
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Últimos Ingresos</h2>
            <p className="text-slate-500 mt-1">Plantas recientemente añadidas al inventario</p>
          </div>
          <Link to="/plantas" className="hidden sm:flex items-center text-emerald-600 font-medium hover:text-emerald-700">
            Ver catálogo completo <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grilla-tarjetas">
          {featuredPlants.map(plant => (
            <Link 
              key={plant.id} 
              to={`/plantas/${plant.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MaterialCard 
                nombre={plant.name}
                codigo={plant.codigo}
                estado={plant.estado}
                cantidad={plant.cantidad}
                imagen={plant.image}
              />
            </Link>
          ))}
        </div>
        <div className="sm:hidden text-center mt-6">
          <Link to="/plantas" className="inline-flex items-center justify-center w-full bg-emerald-100 text-emerald-700 font-medium py-3 rounded-xl">
            Ver todo el catálogo
          </Link>
        </div>
      </section>

  
      <section className="bg-emerald-800 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas plantas o insumos?</h2>
          <p className="text-emerald-100 text-lg mb-0">
            Si eres parte del equipo médico o voluntario del CESFAM y necesitas solicitar plantas o coordinar insumos del huerto, por favor contáctanos mediante el formulario.
          </p>
        </div>
        <Link 
          to="/contacto" 
          className="shrink-0 bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2 text-lg"
        >
          <Mail className="h-6 w-6" />
          Formulario de Solicitud
        </Link>
      </section>
    </div>
  );
}