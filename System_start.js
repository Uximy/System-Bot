const fs = require('fs');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
let config = require('./Config/config.json');

var connectModules = function (dir = './modules', files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            connectModules(name, files_);
        } else {
            files_.push(name);
        }
    }
    var modules = [];
    for (let i = 0; i < files_.length; i++) {
        modules.push(require(files_[i]))
    }
    return modules;
};


// (async () => {
//     try {
        
//     } catch (error) {
//         console.error(error);
//     }
// })();

client.on('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}!`);
    connectModules()[0].servers;
    client.user.setPresence({ activities: [{ 
        name: `Играет на SDK | version ${require('./package.json').version}`,
        type: ActivityType.Custom
    }], status: 'dnd' });
});

function Rewriting(newJson, fileName = 'config')
{
    fs.writeFileSync(`./Config/${fileName}.json`, JSON.stringify(newJson, null, " "), "utf8");
}

client.login(config.Token);

module.exports = { client, Rewriting }