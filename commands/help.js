const fs = require('fs');
const path = require('path');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'help',
  description: "Beginner's guide",
  usage: 'help\nhelp [command name]',
  author: 'System',
  execute(senderId, args, pageAccessToken) {
    const commandsDir = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const commandFile = commandFiles.find(file => {
        const command = require(path.join(commandsDir, file));
        return command.name.toLowerCase() === commandName;
      });

      if (commandFile) {
        const command = require(path.join(commandsDir, commandFile));
        const commandDetails = `
「 COMMAND DETAILS 」

➛ Name: ${command.name}
➛ Description: ${command.description}
➛ Usage: ${command.usage}`;

        sendMessage(senderId, { text: commandDetails }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: `Command "${commandName}" not found.` }, pageAccessToken);
      }
      return;
    }

    const commands = commandFiles.map((file, index) => {
      const command = require(path.join(commandsDir, file));
      return `\t${index + 1}. 「 ${command.name} 」`;
    });

    const helpMessage = `
「 COMMAND LIST 」

${commands.join('\n')}

Type "help [command]" to view command details.`;

    sendMessage(senderId, { text: helpMessage }, pageAccessToken);
  }
};