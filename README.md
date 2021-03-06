# Butler

[![Status](https://discordbots.org/api/widget/status/395189067719114752.svg?noavatar=true)](https://discordbots.org/bot/395189067719114752)
[![Servers](https://discordbots.org/api/widget/servers/395189067719114752.svg?noavatar=true)](https://discordbots.org/bot/395189067719114752)
[![Discord](https://img.shields.io/discord/451786133156790275.svg?style=flat-square)](https://discord.gg/2VBKbEH)
[![License](https://img.shields.io/github/license/oyed/butler.svg?style=flat-square)](https://github.com/oyed/butler/blob/master/LICENSE)

A general purpose Cryptocurrency & Polls Discord Bot.

Feel free to [vote for the Bot on DiscordBots](https://discordbots.org/bot/395189067719114752/vote) if you enjoy using it.

Need help? Found an issue? [Join us on Discord.](https://discord.gg/2VBKbEH)

This Bot adheres to the [Discord Bot Best Practises](https://github.com/meew0/discord-bot-best-practices).

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

Converts `to` in to `from`.

```
!butler convert 10 btc nano
!butler convert 10 ada eth
```

### `balance`

Returns the balance of the given Wallet. Currently supported currencies:

- `btc`
- `eth`
- `tokens` (Returns all ERC-20 Tokens)

```
!butler balance btc 15urYnyeJe3gwbGJ74wcX89Tz7ZtsFDVew
!butler balance tokens 0x57d90b64a1a57749b0f932f1a3395792e12e7055
```

### `top`

Returns the top `gainers`/`losers` for the given period. Valid periods:

- `1h`
- `24h`
- `7d`

```
!butler top gainers 1h
!butler top losers 7d
```

### `poll`

Creates a new Poll for people to vote on. Has very configurable options.

Specifying a Poll that has no options will add the 👍 and 👎 reactions for people to use:

```
!butler poll Is the sky blue?
```

You can specify up to 10 options on new lines:

```
!butler poll Which is your favourite animal?
Dog
Cat
Mouse
```

The above will give each option a letter of the alphabet, e.g. `A`, `B` and `C`, for the reactions. If you want to specify your own emojis for each option, you can do so:

```
!butler poll Which is your favourite animal?
🐶) Dog
🐱) Cat
🐭) Mouse
```

You can also negate the text altogether and use just emojis:

```
!butler poll Which is your favourite animal?
🐶
🐱
🐭
```

It is also possible to mix-and-max these options:

```
!butler poll Which is your favourite animal?
Dog
🐱) Cat
🐭
```

**Note:** Whilst you can use custom emojis, please only use custom emojis from the server you're posting the poll in, otherwise it's unlikely the Bot will find them.

### `prefix`

Changes the Bot Prefix for this Server.

**Note:** Only the Server Owner can do this.

For example, using the following:

```
!butler prefix .
```

Would mean that instead of `!butler price btc` you would use `.price btc`.

If you want to end your prefix with a blank space (Such as the default `!butler ` prefix), replace the space with `[space]`. E.g.:

```
!butler prefix !butler[space]
```

### `stats`

Print out statistical information about the current Server.

```
!butler stats
```

### `flip`

Flips a coin. That's all.

```
!butler flip
```

### `dice`

Rolls a 6-sided dice.

```
!butler dice
```

### `ping`

Returns the latency between Discord and the Bot.

```
!butler ping
```

### `info`

Prints out Info text for the Bot. E.g.

```
!butler info
```

### `help`

Prints out Usage text for the Butler. E.g.

```
!butler help
!butler help price
```

## Development

### Requirements

- PostgreSQL
- NodeJS (8+)

### Environment Variables

Butler uses `dotenv` for Env Var management. Copy the `.env.example` file to `.env` and use the guide below to fill out the variables:

- `DISCORD_TOKEN` - Your Discord Bot Token, found [here](https://discordapp.com/developers/applications/me).
- `DISCORDBOTS_TOKEN` [Optional] - Your DiscordBots.org API Key, used to inform DiscordBots of the Server Count.
- `ETHPLORER_TOKEN` - Your Ethplorer.io API Key. This can be left as `freekey`.
- `BUGSNAG_API_KEY` [Optional] - Your Bugsnag API Key for error reporting.
- `COMMAND_PREFIX` - The prefix that all Commands must be prefixed with.
- `CRYPTO_UPDATE_INTERVAL` - The milliseconds between querying CMC for new Cryptocurrencies.
- `INFO_UPDATE_INTERVAL` - The milliseconds between querying CMC for all market data.
- `STATS_PERSIST_INTERVAL` - The milliseconds between persisting the collected Statistical data.
- `POSTGRESQL_*` - Your PostgreSQL config.

### Migrations

Butler uses Migrations to make sure Database Integrity is maintained. Before developing with Butler, you'll want to make sure you run the migrations via the following command:

```
npm run migrate
```

Additionally, this command should be run after every deployment to make sure your Database is up-to-date.

### Seeders

If it is your first time setting up Butler, you'll need to run the Database Seeders to populate the Database with the initial data.

```
npm run seed
```

## Donations

NANO: xrb_1oyed1fzw688ahrg8yy73tya5fnj7xqigttkwmdh36edk5hfknbd6uu548h8
