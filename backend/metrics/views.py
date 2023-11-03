import datetime
from statistics import mean

import requests
from rest_framework import status as drf_status
from rest_framework.response import Response
from rest_framework.views import APIView

MAYER_MULTIPLE_DAYS = 200


class BitcoinMetrics(APIView):
    def get(self, *args, **kwargs):
        query_params = self.request.GET.dict()
        days = int(query_params["days"])
        currency = query_params.get("currency") or "usd"
        chart_endpoint = f"https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency={currency}&days={max(days, MAYER_MULTIPLE_DAYS)}&interval=daily"
        chart_data = requests.get(
            chart_endpoint, headers={"accept": "application/json"}, timeout=2000
        )
        if chart_data.ok:
            chart_data_json = chart_data.json()
            prices = chart_data_json["prices"]

            prices_chart_data = generate_price_chart_data(prices_data=prices, days=days)

            mayer_multiple = generate_mayer_multiple(prices_data=prices)

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
                    "mayer_multiple": mayer_multiple,
                },
                status=drf_status.HTTP_200_OK,
            )

        return Response(status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR)


def generate_price_chart_data(prices_data, days):
    selected_period_prices = []

    for price in prices_data[MAYER_MULTIPLE_DAYS - days :]:
        timestamp = price[0]
        date_from_timestamp = datetime.datetime.fromtimestamp(timestamp / 1e3)
        x_axis = date_from_timestamp.strftime("%d/%m" if days < 356 else "%d/%m/%y")
        y_axis = round(price[1], 2)
        selected_period_prices.append([x_axis, y_axis])
    return selected_period_prices


def generate_mayer_multiple(prices_data):
    last_price_value = prices_data[-1][1]
    avg_price = mean([x[1] for x in prices_data[-MAYER_MULTIPLE_DAYS:]])
    mayer_multiple = last_price_value / avg_price
    return round(mayer_multiple, 2)
