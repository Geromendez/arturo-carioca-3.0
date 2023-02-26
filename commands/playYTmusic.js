const { SlashCommandBuilder } = require('discord.js');
//para este comando necesitamos el modulo de distube
//importa distuba de index.js
const distube = require('../index.js').distube;



module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('encola la canción de youtube')
        .addStringOption(option => option.setName('link').setDescription('link de youtube')),
	async execute(interaction) {
        const link = interaction.options.getString('link');
        
		distube.play(interaction.member.voice.channel, link, {
			member: interaction.member,
			textChannel: interaction.channel,
			interaction
		})

		replyString = 'Encolado ' + link + 'en el canal de voz' + interaction.member.voice.channel.name;
        
		await interaction.reply(replyString);
	},
};