import datetime

import requests
from rest_framework import status as drf_status
from rest_framework.response import Response
from rest_framework.views import APIView


class BitcoinMetrics(APIView):
    def get(self, *args, **kwargs):
        query_params = self.request.GET.dict()
        days = query_params["days"]
        currency = query_params.get("currency") or "usd"
        chart_end_point = f"https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency={currency}&days={days}&interval=daily"

        chart_data = requests.get(
            chart_end_point, headers={"accept": "application/json"}, timeout=2000
        )
        if chart_data.ok:
            prices = chart_data.json()["prices"]
            for price in prices:
                timestamp = price[0]
                date_from_timestamp = datetime.datetime.fromtimestamp(timestamp / 1e3)
                price[0] = date_from_timestamp.strftime("%m/%d")
                price[1] = round(price[1], 2)

            return Response(data=prices, status=drf_status.HTTP_200_OK)

        return Response(status=drf_status.HTTP_400_BAD_REQUEST)
