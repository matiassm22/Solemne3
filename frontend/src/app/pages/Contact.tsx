import { useState } from "react";
import { Send, Mail, User, MessageSquare, Tag } from "lucide-react";
import { Mensaje } from "../components/Mensaje";
import { createMessage } from "../api";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitted(false);
      setErrorMessage("Por favor, completa todos los campos del formulario.");
      return;
    }
    
    createMessage(formData)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(err => {
        console.error(err);
        setSubmitted(false);
        setErrorMessage("Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <section className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Contáctanos</h1>
        <p className="text-lg text-slate-600">
          ¿Tienes alguna duda específica, quieres participar en el huerto o sugerir una nueva planta? Escríbenos.
        </p>
      </header>

      {submitted === true && (
        <Mensaje tipo="exito" texto="¡Mensaje enviado con éxito! Hemos recibido tu consulta. El administrador del huerto la revisará y te contactará a la brevedad." />
      )}
      
      {submitted === false && (
        <Mensaje tipo="error" texto={errorMessage} />
      )}


      {submitted !== true && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Nombre completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                id="name"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Ej. María Pérez"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Correo electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                id="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="maria@ejemplo.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Asunto</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                id="subject"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Asunto de tu consulta"
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Mensaje</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare className="h-5 w-5 text-slate-400" />
              </div>
              <textarea
                id="message"
                required
                rows={5}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                placeholder="Escribe tu consulta o sugerencia aquí..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Send className="h-5 w-5" />
            Enviar Mensaje
          </button>
        </form>
      )}

      {submitted === true && (
        <div className="mt-6 flex justify-center">
            <button 
              onClick={() => setSubmitted(null)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-6 rounded-full transition-colors"
            >
              Enviar otro mensaje
            </button>
        </div>
      )}
    </section>
  );
}