const { SlashCommandBuilder } = require('discord.js');
//para este comando necesitamos el modulo de distube
//importa distuba de index.js
const distube = require('../index.js').distube;



module.exports = {
	data: new SlashCommandBuilder()
		.setName('cola')
		.setDescription('muestra el estado de la cola'),
	async execute(interaction) {
        const link = interaction.options.getString('link');
        
		//get the current state of the music queue
		const queue = distube.getQueue(interaction.guildId);
		//iterate through the queue
		
		if(queue && queue.songs){
			replyString = 'reproduciendo en el canal de voz ' + interaction.member.voice.channel.name +'\n' + 'el estado del la cola es: \n';	
			for(let i = 0; i < queue.songs.length; i++){
				replyString += queue.songs[i].name + '\n';
			}
			// console.log(queue.songs);
		}else{  //FALTA ACOMODAR ESTO DE ACA ABAJO QUE IMPRIMA LO QUE SE ESTA PREPRODUCIENDO CUANDO LA COLA ES NULL (NO ESTÁ DEPLOYADO ESTE COMANDO)
			//make reply string what is playing right now 
            replyString = 'reproduciendo en el canal de voz ' + interaction.member.voice.channel.name +'\n' + 'el estado del la cola es: \n';
		}
        
		await interaction.reply(replyString);
	},
};



