from django.urls import include, path
from metrics.views import BitcoinMetrics

urlpatterns = [
    path("metrics/", include("metrics.urls")),
]
