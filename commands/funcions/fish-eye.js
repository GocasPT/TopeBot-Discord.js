const { Client, Message, MessageEmbed } = require('discord.js');
const {loadImage, createCanvas} = require("canvas");
const request = require("node-superfetch");

module.exports = {
    name: 'fish-eye',
    aliases: ['fe'], 
    categories : 'funcions', 
    permissions : ' ', 
    description: 'Olho de peixe na imagem',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let attachments = message.attachments;

        if (attachments.size === 0) {
            message.reply(" please upload some images!")
            return 
        }

        else if (attachments.size > 1) {
            message.reply("I only can process one image at one time!")
            return
        }

        if(!args[0]) {
            level = 50;
        } else{
            level = args[0]
        }

        try {
            const {body} = await request.get(attachments.first().url);
            const data = await loadImage(body);
            const canvas = createCanvas(data.width, data.height);
            const ctx = canvas.getContext("2d");

            await ctx.drawImage(data, 0, 0);
            await fishEye(ctx, level, 0, 0, data.width, data.height);

            const attachment = canvas.toBuffer();

            if (Buffer.byteLength(attachment) > 8e+6) {
                message.channel.send("The file is way too big for me to upload it.")
                return 
            }

            return message.channel.send({files: [{attachment, name: "fish-eye.png"}] });

        } catch (error) {

            return console.log(`An error occured: \`${error.message}\`.`); 

        }
    }
}

async function fishEye(ctx, level, x, y, width, height) {

    const frame = ctx.getImageData(x, y, width, height);
    const source = new Uint8Array(frame.data);

    for (let i = 0; i < frame.data.length; i += 4) {
        const sx = (i / 4) % frame.width;
        const sy = Math.floor(i / 4 / frame.width);

        const dx = Math.floor(frame.width / 2) - sx;
        const dy = Math.floor(frame.height / 2) - sy;

        const dist = Math.sqrt((dx * dx) + (dy * dy));

        const x2 = Math.round((frame.width / 2) - (dx * Math.sin(dist / (level * Math.PI) / 2)));
        const y2 = Math.round((frame.height / 2) - (dy * Math.sin(dist / (level * Math.PI) / 2)));
        const i2 = ((y2 * frame.width) + x2) * 4;

        frame.data[i] = source[i2];
        frame.data[i + 1] = source[i2 + 1];
        frame.data[i + 2] = source[i2 + 2];
        frame.data[i + 3] = source[i2 + 3];
    }

    ctx.putImageData(frame, x, y);

    return ctx;

}