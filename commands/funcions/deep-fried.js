const { Client, Message, MessageEmbed } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');

module.exports = {
    name: 'deep-fried',
    aliases: ['Fritar', 'fritar', 'df'], 
    categories : 'funcions', 
    permissions : ' ', 
    description: 'Deep Fried a Image',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let attachments = message.attachments;
        
        if (attachments.size === 0) {
            message.reply("Please upload some images!")
            return 
        }

        else if (attachments.size > 1) {
            message.reply("I only can process one image at one time!")
            return
        }

        try {
            const {body} = await request.get(attachments.first().url);
            const data = await loadImage(body);
            const canvas = createCanvas(data.width, data.height);
            const ctx = canvas.getContext("2d");

            ctx.drawImage(data, 0, 0);
            desaturate(ctx, -20, 0, 0, data.width, data.height);
            contrast(ctx, 0, 0, data.width, data.height);

            const attachment = canvas.toBuffer('image/jpeg', {quality: 0.2});

            if (Buffer.byteLength(attachment) > 8e+6) {
                message.channel.send('The image was too big.')
                return
            };
            
            return message.channel.send({files: [{ attachment, name: 'deep-fry.jpeg'}] });

        } catch (error) {
            return console.log(`An error ocurred: **${error.message}**`);
        }
    }
}

function contrast(ctx, x, y, width, height) {

    const data = ctx.getImageData(x, y, width, height);
    const factor = (259 / 100) + 1;
    const intercept = 128 * (1 - factor);

    for (let i = 0; i < data.data.length; i += 4 ) {
        data.data[i] = (data.data[i] * factor) + intercept;
        data.data[i + 1] = (data.data[i + 1] * factor) + intercept;
        data.data[i + 2] = (data.data[i + 2] * factor) + intercept;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}

function desaturate(ctx, level, x, y, width, height) {

    const data = ctx.getImageData(x, y, width, height);

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const dest = ((i * width) + j) * 4;
            const grey = Number.parseInt( (0.2125 * data.data[dest]) + (0.7154 * data.data[dest + 2]), 10 );

            data.data[dest] += level * (grey - data.data[dest]);
            data.data[dest + 1] += level * (grey - data.data[dest + 1]);
            data.data[dest + 2] += level * (grey - data.data[dest + 2]);
        }
    }
    ctx.putImageData(data, x, y);
    return ctx;
}