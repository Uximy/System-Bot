let config = require('../Config/config.json');
let servers = require('../Config/servers.json');
const { client } = require("../System_start");

client.on("guildMemberUpdate", (oldMember, newMember) => {
    const oldStatus = oldMember.roles.find(role => role.name === 'Server Booster');
    const newStatus = newMember.roles.find(role => role.name === 'Server Booster');

    const oldStatus_old = oldMember.premiumSince;
    const newStatus_old = newMember.premiumSince;

    if (!oldStatus_old && newStatus_old) {
        client.channels.cache.get("1144105272986579024").send(`${newStatus_old.user.displayName} забустил сервер!! (старый метод проверки буста)`);
    }

    if (oldStatus_old && !newStatus_old) {
        client.channels.cache.get("1144105272986579024").send(`${newStatus_old.user.displayName} закончился буст (старый метод проверки буста)`);
    }


    if (!oldStatus && newStatus) {
        client.channels.cache.get("1144105272986579024").send(`${newMember.user.displayName} забустил сервер!! (новый метод проверки буста)`);
    }

    if (oldStatus && !newStatus) {
        client.channels.cache.get("1144105272986579024").send(`${newMember.user.displayName} закончился буст (новый метод проверки буста)`);
    }
});