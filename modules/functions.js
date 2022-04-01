const logger = require("./logger.js");

//------------------
//  Util funtion!!!!
//------------------
async function awaitReply(msg, question, limit = 60000) {
  const filter = m => m.author.id === msg.author.id;
  await msg.channel.send(question);
  try {
    const collected = await msg.channel.awaitMessages({ filter, max: 1, time: limit, errors: ["time"] });
    return collected.first().content;
  } catch (e) {
    return false;
  }
}

//------------------
//  Funny fuction
//------------------
// Mary had a little lamb → Mary Had A Little Lamb
function toProperCase(string) {
  return string.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

//Gerador de números entre dois valores (ambos incluidos)
function numberGenerator(min, max){
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

//------------------
//  Tracking cache (Debug detector)
//------------------
process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  logger.error(`Uncaught Exception: ${errorMsg}`);
  console.error(err);

  process.exit(1);
});

process.on("unhandledRejection", err => {
  logger.error(`Unhandled rejection: ${err}`);
  console.error(err);
});

module.exports = { awaitReply, toProperCase,  numberGenerator};