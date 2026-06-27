from django.db import models

class Planta(models.Model):
    """
    Modelo que representa una especie de planta medicinal cultivada en el huerto.
    Permite gestionar el stock y almacenar la información técnica medicinal de cada especie.
    """
    id = models.CharField(max_length=100, primary_key=True)  # Identificador basado en el nombre (slug)
    name = models.CharField(max_length=100)                  # Nombre común de la planta
    scientificName = models.CharField(max_length=200)         # Nombre científico en latín
    benefits = models.JSONField(default=list)                # Lista de beneficios terapéuticos principales
    usage = models.TextField()                               # Modo de uso y preparación (ej: infusión, tintura)
    activePrinciples = models.TextField()                   # Componentes químicos activos principales
    care = models.TextField()                                # Requerimientos de cuidado y cultivo
    image = models.TextField()                               # URL de la imagen representativa de la planta
    category = models.CharField(max_length=100)              # Categoría principal para el filtrado
    codigo = models.CharField(max_length=50, unique=True)    # Código de inventario único (ej: PL-001)
    estado = models.CharField(max_length=50)                 # Estado físico actual (Bueno, Estable, Crítico)
    cantidad = models.IntegerField(default=0)                # Cantidad disponible en el inventario físico

    def __str__(self):
        return self.name

class MensajeContacto(models.Model):
    """
    Modelo para almacenar consultas, sugerencias y postulaciones de voluntariado 
    enviadas desde el formulario de contacto por la comunidad.
    """
    name = models.CharField(max_length=100)                  # Nombre del remitente
    email = models.EmailField()                              # Correo electrónico de contacto
    subject = models.CharField(max_length=200)               # Asunto de la consulta
    message = models.TextField()                             # Contenido detallado del mensaje
    date = models.DateTimeField(auto_now_add=True)           # Fecha y hora de recepción (automática)
    read = models.BooleanField(default=False)                # Estado de lectura para el panel de administración

    def __str__(self):
        return f"{self.name} - {self.subject}"

