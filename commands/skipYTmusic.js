const { SlashCommandBuilder } = require('discord.js');
//para este comando necesitamos el modulo de distube
//importa distuba de index.js
const distube = require('../index.js').distube;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription('se salta la musica actual y reproduce la siguiente (si es que hay)'),
	async execute(interaction) {
        
		//skip the current song 
        distube.skip(interaction.member.voice.channel);
        
		await interaction.reply("Skippeando canción al a siguiente.");
	},
};