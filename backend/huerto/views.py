from rest_framework import viewsets
from .models import Planta, MensajeContacto
from .serializers import PlantaSerializer, MensajeContactoSerializer

class PlantaViewSet(viewsets.ModelViewSet):
    queryset = Planta.objects.all()
    serializer_class = PlantaSerializer

class MensajeContactoViewSet(viewsets.ModelViewSet):
    queryset = MensajeContacto.objects.all().order_by('-date')
    serializer_class = MensajeContactoSerializer
