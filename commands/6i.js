const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: '6i',
  description: 'Interact with 6i',
  usage: '6i [prompt]',
  author: 'zishin',

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: 6i <your prompt>" }, pageAccessToken);

    try {
      const { data: { response } } = await axios.get(`http://fred.hidencloud.com:25939/6i?prompt=${encodeURIComponent(prompt)}&id=${senderId}`);
      sendMessage(senderId, { text: result }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
