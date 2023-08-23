from django.urls import path

from . import views

urlpatterns = [
    path("btc/metrics", views.BitcoinMetrics.as_view(), name="btc-metrics"),
]
