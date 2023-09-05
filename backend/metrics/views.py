import datetime

import requests
from rest_framework import status as drf_status
from rest_framework.response import Response
from rest_framework.views import APIView

MAYER_MULTIPLE_DAYS = 200


def generate_price_chart_data(prices_data, params):
    mayer_days = params["mayer_multiple_days"]
    days = int(params["days"])
    selected_period_prices = []
    for price in prices_data[mayer_days - days :]:
        timestamp = price[0]
        date_from_timestamp = datetime.datetime.fromtimestamp(timestamp / 1e3)
        x_axix = date_from_timestamp.strftime("%m/%d")
        y_axix = round(price[1], 2)
        selected_period_prices.append([x_axix, y_axix])
    return selected_period_prices

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

            prices_chart_data = generate_price_chart_data(
                prices_data=prices,
                params={**query_params, "mayer_multiple_days": MAYER_MULTIPLE_DAYS},
            )
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
                    "prices": prices_chart_data,
                    "total_volume": last_total_volume[1],
                    "market_cap": last_market_cap[1],
                },
                status=drf_status.HTTP_200_OK,
            )

        return Response(status=drf_status.HTTP_400_BAD_REQUEST)
