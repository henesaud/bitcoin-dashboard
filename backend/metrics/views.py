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
            chart_data_json = chart_data.json()

            prices = chart_data_json["prices"]
            for price in prices:
                timestamp = price[0]
                date_from_timestamp = datetime.datetime.fromtimestamp(timestamp / 1e3)
                price[0] = date_from_timestamp.strftime("%m/%d")
                price[1] = round(price[1], 2)

            last_total_volume = (
                chart_data_json["total_volumes"].pop()
                if chart_data_json["total_volumes"]
                else None
            )
            last_market_cap = (
                chart_data_json["market_caps"].pop()
                if chart_data_json["market_caps"]
                else None
            )
            return Response(
                data={
                    "prices": prices,
                    "total_volume": last_total_volume[1],
                    "market_cap": last_market_cap[1],
                },
                status=drf_status.HTTP_200_OK,
            )

        return Response(status=drf_status.HTTP_400_BAD_REQUEST)
