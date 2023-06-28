const { AttachmentBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');
const imgaesFolder = './modules/ImageLibary/Banner/';

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${(fontSize -= 10)}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};

exports.run = async (client, message, args) => {
	console.log(message.attachments.length);
	if (message.attachments.length != 1) {
		return message.channel.send('Image Erro');
	}

	if (args.length > 1) {
		return message.channel.send('Batata Erro');
	}

	if (args.length == 1) {
		message.channel.send('batata 2');
	} else {
		message.channel.send('batata 1');
	}

	/* const image = message.attachments[0];
	const imageHeight = image.height;
	const imageWidth = image.width;
	const canvas = createCanvas(imageHeight, imageWidth);
	const context = canvas.getContext('2d');

	const background = await image.url;
	const backgroundImage = new Image();
	backgroundImage.src = background;
	context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

	const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), {
		name: 'profile-image.png',
	});

	return message.reply({ files: [attachment] }); */
};

exports.conf = {
	enabled: true,
	aliases: ['df', 'DF'],
};

exports.help = {
	name: 'deep-fry',
	category: 'Meme',
	description: '',
	usage: 'deep-fry',
};
