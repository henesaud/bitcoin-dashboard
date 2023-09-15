import base58
from rest_framework import status as drf_status
from rest_framework.response import Response
from rest_framework.views import APIView

BTC_KEY_PREFIXES = {
    "xpub": "0488b21e",  # Mainnet - P2PKH or P2SH  - m/44'/0'
    "ypub": "049d7cb2",  # Mainnet - P2WPKH in P2SH - m/49'/0'
    "zpub": "04b24746",  # Mainnet - P2WPKH 	     - m/84'/0'
    "Ypub": "0295b43f",  # Mainnet - Multi-signature P2WSH in P2SH
    "Zpub": "02aa7ed3",  # Mainnet - Multi-signature P2WSH
    "tpub": "043587cf",  # Testnet - P2PKH or P2SH  - m/44'/1'
    "upub": "044a5262",  # Testnet - P2WPKH in P2SH - m/49'/1'
    "vpub": "045f1cf6",  # Testnet - P2WPKH         - m/84'/1'
    "Upub": "024289ef",  # Testnet - Multi-signature P2WSH in P2SH
    "Vpub": "02575483",  # Testnet - Multi-signature P2WSH
}


def convert_key(key, target_prefix):
    decoded_key_bytes = base58.b58decode_check(key)
    target_key_bytes = (
        bytes.fromhex(BTC_KEY_PREFIXES[target_prefix]) + decoded_key_bytes[4:]
    )
    return base58.b58encode_check(target_key_bytes)


class ConvertPublicKey(APIView):
    def get(self, *args, **kwargs):
        query_params = self.request.GET.dict()
        key = query_params["key"]
        target_prefix = query_params["target_prefix"]

        if key[1:4] != target_prefix[1:4]:
            return Response(
                data={
                    "detail": "The key and the target prefix must be both public or both private."
                },
                status=drf_status.HTTP_400_BAD_REQUEST,
            )

        converted_key = convert_key(key=key, target_prefix=target_prefix)
        return Response(data=converted_key, status=drf_status.HTTP_200_OK)


# For tests:
# zpub6qwqZGWt6Gqm9i2bY2ErmJcTfRHHYX4LeUeszP33bSH3zgNdGiD7LEg57BQp2k5EQ4Qr5UAhgG1DMRSMZSA44UTNy1rLTqa3qaSnT9GmdsF
# xpub6CHJwwB3nukoT7eMsJfcM8RTKUzPfH5LpFcSRbFGqRXHtUkAmPsz67Mo4mVe2vmPanBEaWyakwJ7arDE83L2U16BELTVJ1w5J8KVfyMqtzE
# ypub6X7aFbqxwbJHJQqUhfTEZDWxVT8qbu4qjN8fCz9ADRuAwaZQ243YiB1w5yTE2qRJzRJ3Kza9DbefU8pnqjk3GEmn6g9usvkZZrP94VcBVdz

# yprvAJ8Dr6K57Djz5vm1bdvEC5aDwRJMCSLzN9D4QbjYf6NC4nEFUWjJANhTEghL3npior1TjTXW8vcuiaXoRGH8ZrEBn62qzPxbVKn6x5oY5vq
# xprv9yHxYRe9xYCWEdZtmH8byzUimT9uFpMVT2gqdCqfH5zK1gR2DrZjYK3KDUjk3tAoQCteyyvwgGGMqHvEhZs7mcYaukLRQV97DbiTZSJRaKC
# zprvAcxV9kyzFuHTwDx8RzhrQAfj7PSo94LVHFjHBzdS36k57t3UjAtrnSMbFtev3hUeDV8GUw84bayTbs9N8xh9N5uneRjGaJn5m3qkLdQwiaZ

# python key_converter.py zpub6qwqZGWt6Gqm9i2bY2ErmJcTfRHHYX4LeUeszP33bSH3zgNdGiD7LEg57BQp2k5EQ4Qr5UAhgG1DMRSMZSA44UTNy1rLTqa3qaSnT9GmdsF ypub
# python key_converter.py ypub6X7aFbqxwbJHJQqUhfTEZDWxVT8qbu4qjN8fCz9ADRuAwaZQ243YiB1w5yTE2qRJzRJ3Kza9DbefU8pnqjk3GEmn6g9usvkZZrP94VcBVdz xpub
# python key_converter.py xpub6CHJwwB3nukoT7eMsJfcM8RTKUzPfH5LpFcSRbFGqRXHtUkAmPsz67Mo4mVe2vmPanBEaWyakwJ7arDE83L2U16BELTVJ1w5J8KVfyMqtzE zpub

# python key_converter.py yprvAJ8Dr6K57Djz5vm1bdvEC5aDwRJMCSLzN9D4QbjYf6NC4nEFUWjJANhTEghL3npior1TjTXW8vcuiaXoRGH8ZrEBn62qzPxbVKn6x5oY5vq xprv
# python key_converter.py xprv9yHxYRe9xYCWEdZtmH8byzUimT9uFpMVT2gqdCqfH5zK1gR2DrZjYK3KDUjk3tAoQCteyyvwgGGMqHvEhZs7mcYaukLRQV97DbiTZSJRaKC zprv
# python key_converter.py zprvAcxV9kyzFuHTwDx8RzhrQAfj7PSo94LVHFjHBzdS36k57t3UjAtrnSMbFtev3hUeDV8GUw84bayTbs9N8xh9N5uneRjGaJn5m3qkLdQwiaZ yprv
