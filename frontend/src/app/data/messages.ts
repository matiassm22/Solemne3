export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export const mockMessages: ContactMessage[] = [
  { id: "1", name: "María González", email: "maria.g@ejemplo.com", message: "¿Tienen pensado plantar ruda en el huerto pronto?", date: "12 May 2026", read: false },
  { id: "2", name: "Carlos Soto", email: "csoto@ejemplo.com", message: "Me gustaría participar como voluntario en el mantenimiento de las plantas.", date: "10 May 2026", read: true },
  { id: "3", name: "Ana Silva", email: "ana.silva@ejemplo.com", message: "Excelente iniciativa, la manzanilla que saqué me sirvió mucho.", date: "08 May 2026", read: true }
];
