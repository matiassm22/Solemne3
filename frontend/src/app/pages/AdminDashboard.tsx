import { useState, useEffect } from "react";
import { LogOut, Plus, Edit, Trash2, MessageSquare, LayoutDashboard, Leaf, X, Save, Eye, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { Plant } from "../data";
import { fetchPlants, createPlant, updatePlant, deletePlant, fetchMessages, updateMessage, ContactMessage } from "../api";
import { ConfirmModal } from "../components/ConfirmModal";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'plants' | 'messages'>('plants');
  const [plants, setPlants] = useState<Plant[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [plantIdToDelete, setPlantIdToDelete] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Plant>>({});

  useEffect(() => {
    fetchPlants()
      .then(data => setPlants(data))
      .catch(err => {
        console.error("Error al cargar plantas de la API", err);
        // Fallback local
        import("../data").then(m => setPlants(m.plantsData));
      });

    fetchMessages()
      .then(data => setMessages(data))
      .catch(err => {
        console.error("Error al cargar mensajes de la API", err);
      });
  }, []);

  const openDeleteConfirm = (id: string) => {
    setPlantIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!plantIdToDelete) return;
    deletePlant(plantIdToDelete)
      .then(() => {
        setPlants(plants.filter(p => p.id !== plantIdToDelete));
        setIsDeleteModalOpen(false);
        setPlantIdToDelete(null);
      })
      .catch(err => {
        alert("Error al eliminar planta: " + err.message);
        setIsDeleteModalOpen(false);
        setPlantIdToDelete(null);
      });
  };

  const handleLogout = () => {
    navigate("/");
  };

  const openAddModal = () => {
    setEditingPlant(null);
    setFormData({
      id: "", codigo: "", name: "", scientificName: "", category: "", image: "", estado: "Abundante", cantidad: 0, benefits: [], usage: "", activePrinciples: "", care: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (plant: Plant) => {
    setEditingPlant(plant);
    setFormData(plant);
    setIsModalOpen(true);
  };

  const handleSavePlant = (e: React.FormEvent) => {
    e.preventDefault();

    const preparedBenefits = typeof formData.benefits === 'string' 
      ? (formData.benefits as string).split(',').map(b => b.trim()) 
      : formData.benefits || [];

    if (editingPlant) {
      const updated = {
        ...formData,
        benefits: preparedBenefits
      } as Plant;

      updatePlant(editingPlant.id, updated)
        .then(saved => {
          setPlants(plants.map(p => p.id === editingPlant.id ? saved : p));
          setIsModalOpen(false);
        })
        .catch(err => alert("Error al actualizar: " + err.message));
    } else {
      const newPlantId = formData.name?.toLowerCase().trim().replace(/\s+/g, '-') || Math.random().toString();
      const newPlant = {
        ...formData,
        id: newPlantId,
        benefits: preparedBenefits
      } as Plant;

      createPlant(newPlant)
        .then(saved => {
          setPlants([saved, ...plants]);
          setIsModalOpen(false);
        })
        .catch(err => alert("Error al crear: " + err.message));
    }
  };

  const handleMarkAsRead = (id: string) => {
    updateMessage(id, { read: true })
      .then(updated => {
        setMessages(messages.map(m => m.id === id ? updated : m));
      })
      .catch(err => alert("Error al actualizar mensaje: " + err.message));
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;


  return (
    <div className="max-w-7xl mx-auto pb-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 space-y-2">
        <div className="bg-slate-900 text-white rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-6">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Panel Admin</h2>
              <p className="text-slate-400 text-xs">Gestión del Huerto</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('plants')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                activeTab === 'plants' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Inventario Plantas
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                activeTab === 'messages' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />
                Mensajes
              </div>
              {unreadMessagesCount > 0 && (
                <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadMessagesCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white text-rose-600 hover:bg-rose-50 border border-slate-200 px-4 py-3 rounded-2xl font-bold transition-colors shadow-sm"
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <section className="flex-1 min-w-0" aria-label="Panel administrativo">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          
          {activeTab === 'plants' && (
            <div>
              <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Inventario de Plantas</h1>
                  <p className="text-slate-500">Gestiona las especies registradas en el sistema</p>
                </div>
                <button 
                  onClick={openAddModal}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="h-5 w-5" />
                  Agregar Planta
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-4 px-6 font-bold">Código</th>
                      <th className="py-4 px-6 font-bold">Planta</th>
                      <th className="py-4 px-6 font-bold">Estado / Stock</th>
                      <th className="py-4 px-6 font-bold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {plants.map(plant => (
                      <tr key={plant.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            {plant.codigo}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img src={plant.image} alt={plant.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="font-semibold text-slate-800">{plant.name}</p>
                              <p className="text-xs text-slate-500">{plant.scientificName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex w-fit items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                              plant.estado === 'Crítico' ? 'bg-red-50 text-red-700 border-red-200' :
                              plant.estado === 'Estable' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                              {plant.estado === 'Crítico' && <AlertTriangle className="w-3 h-3" />}
                              {plant.estado}
                            </span>
                            <span className="text-sm font-medium text-slate-600 pl-1">{plant.cantidad} un.</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => openEditModal(plant)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button onClick={() => openDeleteConfirm(plant.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <div className="p-6 md:p-8 border-b border-slate-100">
                <h1 className="text-2xl font-bold text-slate-800">Mensajes Recibidos</h1>
                <p className="text-slate-500">Consultas y sugerencias de la comunidad</p>
              </div>
              
              <div className="divide-y divide-slate-100">
                {messages.map(msg => (
                  <div key={msg.id} className={`p-6 hover:bg-slate-50 transition-colors flex gap-4 ${!msg.read ? 'bg-emerald-50/30' : ''}`}>
                    <div className="shrink-0 pt-1">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        !msg.read ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {msg.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className={`font-medium ${!msg.read ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                            {msg.name}
                          </h3>
                          <p className="text-sm text-slate-500">{msg.email}</p>
                        </div>
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{msg.date}</span>
                      </div>
                      <p className={`mt-2 text-sm leading-relaxed ${!msg.read ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                        {msg.message}
                      </p>
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          disabled
                          title="Funcionalidad planificada para una futura versión"
                          className="text-xs text-slate-400 font-medium flex items-center gap-1 cursor-not-allowed"
                        >
                          <MessageSquare className="h-3 w-3" /> Responder próximamente
                        </button>
                        {!msg.read && (
                          <button 
                            onClick={() => handleMarkAsRead(msg.id)}
                            className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" /> Marcar leído
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Modal Agregar/Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {editingPlant ? 'Editar Planta' : 'Nueva Planta'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 hide-scrollbar">
              <form id="plant-form" onSubmit={handleSavePlant} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div>
                    <label htmlFor="f-codigo" className="block text-sm font-semibold text-slate-700 mb-1">Código</label>
                    <input id="f-codigo" required type="text" value={formData.codigo || ''} onChange={e => setFormData({...formData, codigo: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="PL-001" />
                  </div>
                  <div>
                    <label htmlFor="f-cantidad" className="block text-sm font-semibold text-slate-700 mb-1">Cantidad (Stock)</label>
                    <input id="f-cantidad" required type="number" min="0" value={formData.cantidad || 0} onChange={e => setFormData({...formData, cantidad: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label htmlFor="f-estado" className="block text-sm font-semibold text-slate-700 mb-1">Estado del Stock</label>
                    <select id="f-estado" required value={formData.estado || 'Abundante'} onChange={e => setFormData({...formData, estado: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                      <option value="Abundante">Abundante</option>
                      <option value="Estable">Estable</option>
                      <option value="Crítico">Crítico</option>
                    </select>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-name" className="block text-sm font-semibold text-slate-700 mb-1">Nombre Común</label>
                    <input id="f-name" required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label htmlFor="f-scientific" className="block text-sm font-semibold text-slate-700 mb-1">Nombre Científico</label>
                    <input id="f-scientific" required type="text" value={formData.scientificName || ''} onChange={e => setFormData({...formData, scientificName: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label htmlFor="f-category" className="block text-sm font-semibold text-slate-700 mb-1">Categoría</label>
                    <input id="f-category" required type="text" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ej. Digestivo, Relajante" />
                  </div>
                  <div>
                    <label htmlFor="f-image" className="block text-sm font-semibold text-slate-700 mb-1">URL de Imagen</label>
                    <input id="f-image" required type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="https://..." />
                  </div>
                </div>

                {/* Textareas */}
                <div className="space-y-5">
                  <div>
                    <label htmlFor="f-benefits" className="block text-sm font-semibold text-slate-700 mb-1">Beneficios (separados por coma)</label>
                    <textarea id="f-benefits" required rows={2} value={Array.isArray(formData.benefits) ? formData.benefits.join(', ') : formData.benefits || ''} onChange={e => setFormData({...formData, benefits: e.target.value.split(',')})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none" placeholder="Cicatrizante, Antiinflamatorio..." />
                  </div>
                  <div>
                    <label htmlFor="f-usage" className="block text-sm font-semibold text-slate-700 mb-1">Forma de Uso</label>
                    <textarea id="f-usage" required rows={2} value={formData.usage || ''} onChange={e => setFormData({...formData, usage: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
                  </div>
                  <div>
                    <label htmlFor="f-principles" className="block text-sm font-semibold text-slate-700 mb-1">Principios Activos</label>
                    <textarea id="f-principles" required rows={2} value={formData.activePrinciples || ''} onChange={e => setFormData({...formData, activePrinciples: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
                  </div>
                  <div>
                    <label htmlFor="f-care" className="block text-sm font-semibold text-slate-700 mb-1">Cuidados y Mantención</label>
                    <textarea id="f-care" required rows={2} value={formData.care || ''} onChange={e => setFormData({...formData, care: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors">
                Cancelar
              </button>
              <button type="submit" form="plant-form" className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-2">
                <Save className="h-4 w-4" /> Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => { setIsDeleteModalOpen(false); setPlantIdToDelete(null); }}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar esta planta del inventario? Esta acción no se puede deshacer."
      />
    </div>
  );
}