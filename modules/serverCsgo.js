const { queryGameServerInfo, REGIONS } = require("steam-server-query");
let config = require('../Config/config.json');
let servers = require('../Config/servers.json');
const { client, Rewriting } = require("../System_start");
const fs = require('fs');
let lambda = "`";

const guild = client.guilds.cache.get(config.Guild_id);
const channel = guild.channels.cache.get(config.id_channelMonitor);


function getInfoServers(servers) {
    for (const key in servers) {
        if (servers[key].ip != undefined) {
            let server = queryGameServerInfo(servers[key].ip, REGIONS.ALL);
            server.then((res) => {
                servers[key].minPlayer = res.players;
                servers[key].maxPlayers = res.maxPlayers;
                servers[key].map = res.map;
                
                Rewriting(servers, 'servers');
            });
        }
    }
}

channel.messages.fetch(servers.lastMessagesId).then((mess) => {
        getInfoServers(servers);
        mess.edit({content: `
        **IP адреса наших серверов: **
        >>> **Classic MIrage**: ${lambda}play.sdkcs.ru:27015${lambda} или ${lambda}92.53.64.19:27015${lambda} , карта ${lambda}${servers.server1.map}${lambda}, онлайн ${lambda}${servers.server1.minPlayer}/${servers.server1.maxPlayers}${lambda}\n**Classic Public**: ${lambda}play.sdkcs.ru:27017${lambda} или ${lambda}92.53.64.19:27017${lambda}, карта ${lambda}${servers.server2.map}${lambda}, онлайн ${lambda}${servers.server2.minPlayer}/${servers.server2.maxPlayers}${lambda}\n**Classic Retake**: ${lambda}play.sdkcs.ru:27023${lambda} или ${lambda}92.53.64.19:27023${lambda}, карта ${lambda}${servers.server3.map}${lambda}, онлайн ${lambda}${servers.server3.minPlayer}/${servers.server3.maxPlayers}${lambda}
        \r\n__обновляется каждые 2 минуты__
        `});
    setInterval(() => {
        getInfoServers(servers);
        mess.edit({content: `
        **IP адреса наших серверов: **
        >>> **Classic MIrage**: ${lambda}play.sdkcs.ru:27015${lambda} или ${lambda}92.53.64.19:27015${lambda} , карта ${lambda}${servers.server1.map}${lambda}, онлайн ${lambda}${servers.server1.minPlayer}/${servers.server1.maxPlayers}${lambda}\n**Classic Public**: ${lambda}play.sdkcs.ru:27017${lambda} или ${lambda}92.53.64.19:27017${lambda}, карта ${lambda}${servers.server2.map}${lambda}, онлайн ${lambda}${servers.server2.minPlayer}/${servers.server2.maxPlayers}${lambda}\n**Classic Retake**: ${lambda}play.sdkcs.ru:27023${lambda} или ${lambda}92.53.64.19:27023${lambda}, карта ${lambda}${servers.server3.map}${lambda}, онлайн ${lambda}${servers.server3.minPlayer}/${servers.server3.maxPlayers}${lambda}
        \r__обновляется каждые 2 минуты__
        `});
    }, 120000);
})
.catch((error) => {
    if (error.code == "10008") {
        getInfoServers(servers);
        channel.send({content: `
        **IP адреса наших серверов: **
        >>> **Classic MIrage**: ${lambda}play.sdkcs.ru:27015${lambda} или ${lambda}92.53.64.19:27015${lambda} , карта ${lambda}${servers.server1.map}${lambda}, онлайн ${lambda}${servers.server1.minPlayer}/${servers.server1.maxPlayers}${lambda}\n**Classic Public**: ${lambda}play.sdkcs.ru:27017${lambda} или ${lambda}92.53.64.19:27017${lambda}, карта ${lambda}${servers.server2.map}${lambda}, онлайн ${lambda}${servers.server2.minPlayer}/${servers.server2.maxPlayers}${lambda}
        \r__обновляется каждые 2 минуты__
        `}).then((messages) => {
            servers.lastMessagesId = messages.id;
            Rewriting(servers, 'servers');
        });
    }
})

// module.exports = {server};

// exports.server = server;

