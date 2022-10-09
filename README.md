# uptime-bot

Open-source bot which will notify about status of yours Uptimerobot's monitors

Licensed under [MIT](/LICENSE) license

### Configuration

1. Rename .env.example to .env
2. Go to uptimerobot.com dashboard
3. Go to tab "My Settings"
4. In API Settings create Main/Read-only API Key
5. Put your API Key in .env > UPTIMEROBOT_KEY
6. Create application at discord.com/developers/applications > Bot > Create Bot Account
7. Copy token into .env > DISCORD_TOKEN
8. Setup NOTIFICATIONS_CHANNEL & STATUS_CHANNEL (explained in Channels section)
9. Install packages via yarn (just run `yarn install` in directory)
10. Run your bot with `yarn start`

NOTIFICATIONS_CHANNEL - Channel where all notifications about monitors will be sent
<br/>
STATUS_CHANNEL - Channel where status message of all your monitors will be sent
