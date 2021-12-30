const client = require("..");

client.on("ready", () => {
    console.log(`${client.user.tag} is Online!`.bgRed)
    client.user.setActivity('._.', { type: 'COMPETING' })

    
});
