const { SlashCommandBuilder } = require('discord.js');
//para este comando necesitamos el modulo de distube
//importa distuba de index.js
const distube = require('../index.js').distube;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('frena la reproducçión del link de youtube'),
	async execute(interaction) {
        
		//stop the music
        distube.stop(interaction.member.voice.channel);
        
		await interaction.reply("Deteniendo la musica.");
	},
};