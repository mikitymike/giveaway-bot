const delay = require('delay');

// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

const TRTLAddress = "TRTLuwXHrsG2mFQ7hGvicXCNRRJWit3JVPS5ArN5YrBsim4CWRADtEBaAUaVDRNNCrjTYHku4UuUCCt7AfuR8EJzezRoQkfZ97q";
//const TRTLAddress = "TRTLv24QwiYRWHcigukwuGaDrU6kKY7k13tDpAdAw5hCcdCAbZwmACTHRtzAQCfTYLRWYNrcVjpwkQ3LT4UCd81154t82nbVi1G";

const maxAddressSendDelay = 20000; //Milliseconds
const maxReactDelay = 5000; //Milliseconds

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    //    console.log(client.emojis.find("name", "ayy"));
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.
    
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if(!message.author.bot) return;

    //Got a message from bot named TurtleRainDance
    if((message.author.username == "TurtleBotRain")){
	console.log("got msg from trtlbotrain");
	console.log("msg content"+message.content);
    
	if((message.channel.type == "dm")){
	console.log("got dm from trtlbotrain");
	    
	    //Get the message contents
	    let msgContent = message.content
	    
	    //pull out the first custom emoji
	    var emojiStartPos = msgContent.indexOf(':')+1;
	    var emojiEndPos = msgContent.indexOf(':',emojiStartPos)
	    var emojiString = msgContent.substring(emojiStartPos,emojiEndPos)

	    // If this message has an emoji
	    if(emojiString){
		console.log("got dm: " + msgContent);
		console.log("got emoji: " + emojiString);
		
		// Get the channel we want
		let testGuild = client.guilds.find("name","TurtleCoin");
		let testChannel = testGuild.channels.find("name", "raindance");

		// Get the last message in that channel
		testChannel.fetchMessage(testChannel.lastMessageID)
		    .then(delay((Math.random()*maxReactDelay)+5000))
		    .then(fetchedMsg => {

			// If we got a message
			if(fetchedMsg){

			    // Send the reaction
			    fetchedMsg.react(testGuild.emojis.find("name",emojiString));
			    console.log("sent reac");
			}
		    });
	    }
	}
	return;
    }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    // This event will run on every single message received, from any channel or DM.
    var message = newMessage;

    //TODO change to bot
    //Got a message from bot named TurtleRainDance
    console.log("message updated");
    console.log("author"+message.author.username);
    console.log("bot?:"+message.author.bot);

    if((message.author.username == "TurtleBotRain") && (message.author.bot)){

	console.log(message.embeds[0].title);
	// Its a rain announcement
	// TODO check message contents

	var content = message.embeds[0].title;
	console.log("channel"+message.channel.name);
	if((message.channel.name == "raindance") && content.indexOf("QUICK") !== -1){
	    // send him our trtl key
	    console.log("sending key after delay");
	    //TODO wait a bit until bot is accepting keys
	    delay((Math.random()*maxAddressSendDelay)+5000)
		.then(() => {
		    message.author.send(TRTLAddress);
	    	    console.log("sent dm");
		});
	}	
	return;
    }
});


client.login(config.token);
