from django.contrib import admin
from .models import Planta, MensajeContacto

@admin.register(Planta)
class PlantaAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'name', 'scientificName', 'cantidad', 'estado', 'category')
    search_fields = ('name', 'codigo', 'scientificName')
    list_filter = ('estado', 'category')

@admin.register(MensajeContacto)
class MensajeContactoAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'date', 'read')
    search_fields = ('name', 'email', 'subject')
    list_filter = ('read', 'date')
