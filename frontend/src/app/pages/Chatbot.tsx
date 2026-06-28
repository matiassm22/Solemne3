import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, HelpCircle, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router";

export function Chatbot() {
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: '¡Hola! Soy el asistente virtual del Huerto Medicinal CESFAM Las Condes. ¿En qué te puedo ayudar hoy? Puedes preguntarme sobre beneficios de plantas, cuidados, o cómo ubicar el huerto.' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput("");

  
    setTimeout(() => {
      let botResponse = "";
      const lowerInput = userMessage.toLowerCase();
      
      const containsAny = (keywords: string[]) => keywords.some(kw => lowerInput.includes(kw));

      if (containsAny(["estomago", "estómago", "guata", "digestiv", "colon", "acidez", "gases", "carminativ", "digestión", "digestion", "pesadez", "colico", "cólico", "higado", "hígado"])) {
        botResponse = "Para problemas digestivos o molestias estomacales, te sugiero consultar en nuestro catálogo sobre:\n\n" +
          "• Menta: Excelente antiespasmódica y digestiva ideal para después de comer.\n" +
          "• Hinojo: Ayuda a combatir la acumulación de gases y digestiones pesadas.\n" +
          "• Manzanilla: Reduce espasmos, calma la acidez y actúa como un tónico estomacal suave.\n" +
          "• Toronjil Cuyano: Estimula la digestión y actúa como un protector hepático.";
      } else if (containsAny(["resfriad", "gripe", "tos", "respirator", "asma", "bronquiti", "garganta", "congestion", "congestión", "flema", "expectorante", "pecho"])) {
        botResponse = "Si tienes molestias respiratorias o resfriado, en el huerto cultivamos plantas con propiedades expectorantes y antitusivas:\n\n" +
          "• Cebolla: Un expectorante y antiséptico natural muy potente.\n" +
          "• Borraja: Excelente sudorífica para aliviar la fiebre y despejar las vías respiratorias.\n" +
          "• Radal: Actúa como antiasmático y antitusivo para calmar la tos persistente.\n" +
          "• Hierba del Paño: Alivia la garganta irritada y facilita la expulsión de flemas.";
      } else if (containsAny(["dormir", "insomnio", "relajar", "ansiedad", "estres", "estrés", "nervios", "cabeza", "jaqueca", "migraña", "migrañas", "pena", "calmar", "sedante"])) {
        botResponse = "Para calmar estados de nerviosismo, dolor de cabeza o dificultades para dormir, te recomendamos:\n\n" +
          "• Melissa (Toronjil para la pena): Reconfortante, calmante y excelente para la tensión nerviosa.\n" +
          "• Lavanda: Alivia el insomnio y promueve la relajación mediante infusión o aceite.\n" +
          "• Flor de la Pasión (Pasiflora): Actúa como sedante natural y analgésico contra dolores neurálgicos.\n" +
          "• Hierba de San Juan o Artemisa: Auxiliares para el ánimo y para mitigar migrañas de origen nervioso.";
      } else if (containsAny(["cicatriz", "herida", "quemadura", "piel", "grano", "golpe", "cataplasma", "cutan"])) {
        botResponse = "Para el cuidado de la piel, heridas menores, quemaduras o inflamaciones externas, busca estas especies en el catálogo:\n\n" +
          "• Aloe Vera: Su gel directo cicatriza, hidrata y alivia quemaduras de forma inmediata.\n" +
          "• Matico: Un potente antiséptico y cicatrizante local de amplio uso tradicional.\n" +
          "• Caléndula: Ideal en compresas o pomadas contra eccemas y rozaduras de la piel.\n" +
          "• Llantén: Desinfecta heridas y reduce la inflamación externa.";
      } else if (containsAny(["artriti", "reuma", "articulacio", "hueso", "dolor muscular", "muscular", "inflamacio", "inflamació"])) {
        botResponse = "Para aliviar dolores musculares, articulares o afecciones reumáticas, te recomendamos consultar:\n\n" +
          "• Ortiga: Depurativa e antiartrítica, ayuda a reducir la inflamación interna.\n" +
          "• Uña de Gato: Un poderoso antiinflamatorio sistémico ideal para artritis y reumatismo.\n" +
          "• Ruda: En compresas externas al 5%, es excelente para desinflamar luxaciones y torceduras.";
      } else if (containsAny(["diuretico", "diurético", "orinar", "liquido", "retencion", "riñon", "riñones", "urinaria", "cistitis"])) {
        botResponse = "Para estimular la eliminación de líquidos o depurar los riñones, te sugiero buscar:\n\n" +
          "• Limpia Plata (Cola de Caballo): Excelente diurético y remineralizante rico en silicio.\n" +
          "• Diente de León: Estimula el correcto funcionamiento renal y hepático de forma natural.\n" +
          "• Romero: Actúa como antioxidante, estimulante circulatorio y diurético suave.";
      } else if (containsAny(["horario", "ubicacion", "ubicación", "donde", "dónde", "abierto", "cesfam", "direccion", "dirección"])) {
        botResponse = "El Huerto Medicinal Comunitario está ubicado en el patio central del CESFAM Las Condes.\n\n" +
          "• Horario de atención: Lunes a viernes de 08:00 a 17:00 hrs.\n" +
          "• Las visitas son gratuitas y contamos con entrega de folletos informativos sobre plantas medicinales.";
      } else if (containsAny(["cebolla", "ajo", "aloe", "cedron", "cedrón", "borraja", "matico", "calendula", "caléndula", "manzanilla", "hinojo", "lavanda", "radal", "melissa", "menta", "llanten", "llantén", "romero", "ruda", "ortiga"])) {
        botResponse = "¡Excelente consulta! Puedes revisar la ficha detallada de esa planta (incluyendo su modo de preparación, principios activos, stock físico y cuidados) ingresando al enlace '🌿 Catálogo de plantas' de la sección de accesos rápidos o directamente desde el menú principal.";
      } else {
        botResponse = "Entiendo. Para ese síntoma o pregunta en particular, te recomiendo consultar nuestro catálogo de plantas o dejarnos un mensaje directo a través del Formulario de Contacto para que el encargado del huerto pueda guiarte con mayor detalle.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center gap-3">
          <Bot className="h-8 w-8 text-emerald-600" />
          Asistente del Huerto
        </h1>
        <p className="text-slate-600 mt-2">Resuelve tus dudas rápidas sobre las plantas y el CESFAM</p>
      </div>

      <div className="flex-1 bg-white rounded-t-2xl border-t border-l border-r border-slate-200 shadow-sm overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] md:max-w-[70%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-emerald-600 border border-slate-200'
              }`}>
                {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-6 w-6" />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-700 border border-slate-200 rounded-tl-none'
              }`}>
                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                
                {msg.role === 'bot' && msg.text.includes('envíes un mensaje') && (
                  <Link to="/contacto" className="mt-3 inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-100/50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors">
                    <LinkIcon className="h-3 w-3 mr-1.5" />
                    Ir al Formulario de Contacto
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-4 border border-slate-200 rounded-b-2xl shadow-sm">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 text-slate-800 placeholder-slate-400"
            placeholder="Escribe tu pregunta aquí..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3 transition-colors flex items-center justify-center font-medium"
          >
            <Send className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Enviar</span>
          </button>
        </div>
        <p className="text-xs text-center text-slate-400 mt-3 flex items-center justify-center gap-1">
          <HelpCircle className="h-3 w-3" />
          Respuestas automáticas. Para consultas de salud, siempre consulta a un profesional.
        </p>
      </div>
    </div>
  );
}