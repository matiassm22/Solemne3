from rest_framework import serializers
from .models import Planta, MensajeContacto

class PlantaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planta
        fields = '__all__'

class MensajeContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeContacto
        fields = '__all__'
