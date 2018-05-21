# CryptoButler

[![Status](https://discordbots.org/api/widget/status/395189067719114752.svg?noavatar=true)](https://discordbots.org/bot/395189067719114752)
[![Servers](https://discordbots.org/api/widget/servers/395189067719114752.svg?noavatar=true)](https://discordbots.org/bot/395189067719114752)

A general purpose Cryptocurrency Discord Bot.

## Commands

Commands must be prefixed with `!butler`. See below for examples.

### `price`

Use the `price` command to fetch stats from CoinMarketCap.

```
!butler price btc
!butler price stellar
!butler price nano
```

### `convert`

Converts `to` in to `from`. Supports FIAT currencies.

```
!butler convert 10 btc nano
!butler convert 10 usd eth
!butler convert 50 nano usd
```

### `balance`

Returns the balance of the given Wallet. Currently supported currencies:

- `btc`
- `eth`
- `tokens` (Returns all ERC-20 Tokens)

```
!butler balance btc 15urYnyeJe3gwbGJ74wcX89Tz7ZtsFDVew
!butler balance token 0x57d90b64a1a57749b0f932f1a3395792e12e7055
```

### `help`

Prints out Help & Usage text for the Butler. E.g.

```
!butler help
```

## Donations

NANO: xrb_1oyed1fzw688ahrg8yy73tya5fnj7xqigttkwmdh36edk5hfknbd6uu548h8
