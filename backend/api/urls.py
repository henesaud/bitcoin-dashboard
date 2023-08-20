from django.urls import path

from . import views

urlpatterns = [
    path("btc/30d_chart", views.BitcoinView.as_view({'get':'get_30d_chart'}), name="btc-30d-chart"),
]
