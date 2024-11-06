const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gemini',
  description: 'Interact with Google Gemini',
  usage: 'gemini [your prompt]',
  author: 'zishin',
  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: gemini <your prompt>" }, pageAccessToken);

    try {
      const { data: { response } } = await axios.get(`http://fred.hidencloud.com:25939/gemini?prompt=${encodeURIComponent(prompt)}&id=${senderId}`);
      sendMessage(senderId, { text: data.gemini }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Error generating response. Try again later.' }, pageAccessToken);
    }
  }
};