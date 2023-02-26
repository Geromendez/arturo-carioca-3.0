const { SlashCommandBuilder } = require('discord.js');
//para este comando necesitamos el modulo de distube
//importa distuba de index.js
const distube = require('../index.js').distube;


// const { createConnection } = require('./voiceConnection.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('reproduce pegando el link de youtube')
        .addStringOption(option => option.setName('link').setDescription('link de youtube')),
	async execute(interaction) {
        const link = interaction.options.getString('link');
        const replyString = `Reproduciendo ${link}`;
        
        // const newConection = await createConnection(interaction.member.voice.channel);
        // if(!newConection) return interaction.reply('No estas en un canal de voz');
		distube.play(interaction.member.voice.channel, replyString, {
			member: interaction.member,
			textChannel: interaction.channel,
			interaction
		})
        
		await interaction.reply(replyString);
	},
};