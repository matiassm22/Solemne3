from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlantaViewSet, MensajeContactoViewSet

router = DefaultRouter()
router.register(r'plantas', PlantaViewSet, basename='planta')
router.register(r'mensajes', MensajeContactoViewSet, basename='mensaje')

urlpatterns = [
    path('', include(router.urls)),
]
