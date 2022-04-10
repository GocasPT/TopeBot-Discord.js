const path = require('path');

function emojiFolder(folder){
    let emoji = '';
    let dir = path.basename(folder);

    switch (dir){
        case 'admin':
            emoji = '👨‍💻'
            break

        case 'fun':
            emoji = '🃏'
            break

        case 'games':
            emoji = '🕹'
            break

        case 'info':
            emoji = '❔'
            break

        case 'music':
            emoji = '🎶'
            break

        case 'test':
            emoji = '⚙️'
            break
    }
    
    return emoji
}

module.exports = { emojiFolder }