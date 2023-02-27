const { DisTube } = require('distube');
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Collection, Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance GUILD REFERS TO A DISCORD SERVER.
//los gateway intents son los eventos que el bot va a escuchar, en este caso solo escucha los eventos de los servidores
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
] });

//aqui se crea el distube
const distube = new DisTube(client, { searchSongs: 1, emitNewSongOnly: true });
//exporta distube
module.exports.distube = distube;

client.commands = new Collection();

// lo siguiente : es para que lea todos los archivos de la carpeta commands y los guarde en una variable, esa variable es llamada commandFiles
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//export the client
module.exports.client = client;

// When the client is ready, run this code (only once) ESTE CODIGO CORRE SOLO UNA VEZ, CUANDO EL CLIENTE, ESTA READY
// We use 'c' for the event parameter to keep it separate from the already defined 'client' OSEA QUE c VIENE A SER EL CLIENTE
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

//esto es un evento que se dispara cuando el bot recibe un mensaje (pero solo los que son slashinputcommand, por eso el !interaction.isChatInputCommand() )
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}


});

// Log in to Discord with your client's token
client.login(token);