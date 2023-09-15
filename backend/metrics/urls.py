from django.urls import path
from metrics.views import BitcoinMetrics

urlpatterns = [
    path("main_metrics/", BitcoinMetrics.as_view(), name="btc-main-metrics"),
]
