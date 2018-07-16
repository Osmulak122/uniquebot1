const Discord = require('discord.js');
var bot = new Discord.Client();
const prefix = "!";
var request = require('request');
 

bot.on("guildMemberAdd", function(member) {
    var role_rules = member.guild.roles.find('name', 'Unaccepted Rules');
    member.addRole(role_rules)
});



bot.on("ready", function() {
    bot.user.setActivity('!help');
    console.log("Im Ready!");
    global = bot.channels.find("name", "welcome").fetchMessage("468465894105022464");
});

bot.on('messageReactionAdd', function(reaction, users) {
    console.log("kebab")
    var Welcome = bot.channels.find("name", "welcome");
    var messageid = global;
    var Emoji = "✅";
    var rolenews = reaction.message.guild.roles.find("name", "Unaccepted Rules");
    if (!reaction.message == global) return;
    if (!reaction.emoji.name == Emoji) return;
    reaction.message.guild.members.get(users.id).removeRole(rolenews);
});

bot.on('messageReactionRemove', function(reaction, users) {
    console.log("no kebab")
    var Welcome = bot.channels.find("name", "welcome");
    var messageid = global;
    var Emoji = "✅";
    var rolenews = reaction.message.guild.roles.find("name", "Unaccepted Rules");
    if (!reaction.message == global) return;
    if (!reaction.emoji.name == Emoji) return;
    reaction.message.guild.members.get(users.id).addRole(rolenews);
});


bot.on("message", function(message) {

    var msg = message.content.toLowerCase();
    var cont = message.content.slice(prefix.length).split(" ");
    var args = cont.slice(1);
    var msgauthor = message.author;
    var rcchanel = bot.channels.find("name", "recruitments");


    //recruitments
    if (message.channel == rcchanel) {
        message.delete();
    }
    if(msg.startsWith(prefix + "apply")) {
        if(!args[0]) {
            message.author.send("*Please provide a role u want to apply as!*");
            message.author.send("**Player, Designer or Editor**")
        }
        var role = args[0];
        var link1 = args[1];
        var link2 = args[2] || "Not provided";
        var link3 = args[3] || "Not provided";

        let rcembed = new Discord.RichEmbed()
        .setTitle(`New application as ${role}`)
        .setAuthor(message.author.id)
        .addField("Link #1",`<${link1}>`)
        .addField("Link #2",`<${link2}>`)
        .addField("Link #3",`<${link2}>`)
        .setColor(0xFF2017)
        .setThumbnail(message.author.avatarURL)

        bot.channels.find("name", "applications").send(rcembed);
        message.author.send("Preview of message sent to leaders");
        message.author.send(rcembed);
    }

   
    if (msg == prefix + "help") {
        message.channel.send("__**Commands :**__\n\n**!youtube**\n**!leaders**\n**!botcode**\n\n__**Music:**__\n**!musicbot** *Some music commands*");
    }
    if (msg == prefix + "leaders") {
        message.channel.send("**Leaders:**\nKrKs");
    }                    
     if(msg == prefix + "youtube") {
        message.channel.send("**Our Youtube! -** https://www.youtube.com/AethelFortnite");
    }
    if(message.isMentioned("160669529507233792")) {
        message.react("⚜️")
    }

    if(msg.startsWith(prefix + "clear")) {


        var channelID = message.channel;

        async function clear() {
            message.delete();

            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                message.channel("You don't have permissions to use this command!");
                return;
            }

            if (isNaN(args[0])) {
                message.channel.send("**Please include amount of messages you want to delete**");
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send("Can't clear the chat!"));

                bot.channels.find("name", "bot-logs").send(`**${msgauthor.username}**` + " cleared : " + `**${fetched.size}**` + "** messages in channel :** " + (channelID));

 }
        clear();
    }
            
        

});      
bot.login(process.env.BOT_TOKEN);