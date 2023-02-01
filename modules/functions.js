const path = require('path');
const fs = require('fs');
const logger = require('./logger.js');

// ------------------
//  Util funtion!!!!
// ------------------

// Funão que espera da resposta do cliente
async function awaitReply(msg, question, limit = 60000) {
	const filter = (m) => m.author.id === msg.author.id;
	await msg.channel.send(question);
	try {
		const collected = await msg.channel.awaitMessages({
			filter,
			max: 1,
			time: limit,
			errors: ['time'],
		});
		return collected.first().content;
	} catch (e) {
		return false;
	}
}

// Função que junta elementos de uma pasta numa array e devolve o array
function getDir(dir, array) {
	const folder = path.join(__dirname, dir);

	return new Promise((resolve, rejects) => {
		fs.readdir(folder, (err, filesFolder) => {
			if (err) {
				console.log(`Unable to scan directory: ${err}`);
				rejects();
			}

			if (!filesFolder.length) {
				resolve();
			} else {
				for (const file of filesFolder) {
					array.push(path.join(folder, file));
					resolve();
				}
			}
		});
	});
}

// Faz → 10:50:30 - 05:10:15 = 05:40:15
function subtractTimeString(strSmall, strBig) {
	const a = strSmall.split(':');
	const b = strBig.split(':');

	const sec1 = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
	const sec2 = +b[0] * 60 * 60 + +b[1] * 60 + +b[2];

	const sec_num = sec2 - sec1;

	let hours = Math.floor(sec_num / 3600);
	let minutes = Math.floor((sec_num - hours * 3600) / 60);
	let seconds = sec_num - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = `0${hours}`;
	}
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}

	return `${hours}:${minutes}:${seconds}`;
}

// ------------------
//  Funny fuction
// ------------------

// Mary had a little lamb → Mary Had A Little Lamb
function toProperCase(string) {
	return string.replace(
		/([^\W_]+[^\s-]*) */g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	);
}

// Gerador de números entre dois valores (ambos incluidos)
function numberGenerator(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// ------------------
//  Tracking cache (Debug detector)
// ------------------
process.on('uncaughtException', (err) => {
	const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
	logger.error(`Uncaught Exception: ${errorMsg}`);
	console.error(err);

	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	logger.error(`Unhandled rejection: ${err}`);
	console.error(err);
});

module.exports = {
	awaitReply,
	getDir,
	subtractTimeString,
	toProperCase,
	numberGenerator,
};
