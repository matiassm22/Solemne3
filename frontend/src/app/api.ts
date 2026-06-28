import { Plant } from "./data";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
  read: boolean;
}

const API_BASE_URL = "http://localhost:8000/api";

export async function fetchPlants(): Promise<Plant[]> {
  const response = await fetch(`${API_BASE_URL}/plantas/`);
  if (!response.ok) throw new Error("Error al obtener plantas");
  return response.json();
}

export async function fetchPlant(id: string): Promise<Plant> {
  const response = await fetch(`${API_BASE_URL}/plantas/${id}/`);
  if (!response.ok) throw new Error("Error al obtener detalles de la planta");
  return response.json();
}

export async function createPlant(plant: Plant): Promise<Plant> {
  const response = await fetch(`${API_BASE_URL}/plantas/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });
  if (!response.ok) throw new Error("Error al crear planta");
  return response.json();
}

export async function updatePlant(id: string, plant: Plant): Promise<Plant> {
  const response = await fetch(`${API_BASE_URL}/plantas/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });
  if (!response.ok) throw new Error("Error al actualizar planta");
  return response.json();
}

export async function deletePlant(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/plantas/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar planta");
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  const response = await fetch(`${API_BASE_URL}/mensajes/`);
  if (!response.ok) throw new Error("Error al obtener mensajes");
  return response.json();
}

export async function createMessage(msg: { name: string; email: string; subject: string; message: string }): Promise<ContactMessage> {
  const response = await fetch(`${API_BASE_URL}/mensajes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msg),
  });
  if (!response.ok) throw new Error("Error al enviar mensaje");
  return response.json();
}

export async function updateMessage(id: string, partialMsg: Partial<ContactMessage>): Promise<ContactMessage> {
  const response = await fetch(`${API_BASE_URL}/mensajes/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partialMsg),
  });
  if (!response.ok) throw new Error("Error al actualizar mensaje");
  return response.json();
}
