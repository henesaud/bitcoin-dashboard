from django.urls import path
from metrics.views import BitcoinMetrics

urlpatterns = [
    path("btc/metrics", BitcoinMetrics.as_view(), name="btc-metrics"),
]
