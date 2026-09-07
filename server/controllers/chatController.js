const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

let openai;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-' && !process.env.OPENAI_API_KEY.includes('your_openai_key')) {
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  } catch (e) {
    console.warn('OpenAI client initialization skipped:', e.message);
  }
}

// Built-in intelligent medical assistant fallback responses
const getFallbackReply = (message) => {
  const msg = (message || '').toLowerCase();
  if (msg.includes('doctor') || msg.includes('appointment') || msg.includes('book') || msg.includes('schedule')) {
    return "You can view available doctors and schedule an appointment by navigating to our 'Doctors' section. Choose your specialist and select a convenient date and time slot.";
  }
  if (msg.includes('medicine') || msg.includes('pharmacy') || msg.includes('order') || msg.includes('tablet') || msg.includes('pill')) {
    return "You can explore our 'Pharmacy' section to browse medicines, pain relief tablets, multivitamins, and place orders with express home delivery.";
  }
  if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('ambulance')) {
    return "For medical emergencies, please call emergency services immediately (112 or 108) or visit the nearest hospital emergency room.";
  }
  if (msg.includes('test') || msg.includes('lab') || msg.includes('report') || msg.includes('blood')) {
    return "You can check our 'Lab Tests' page to book home sample collections for complete blood counts, lipid profiles, thyroid tests, and more.";
  }
  if (msg.includes('admin') || msg.includes('login') || msg.includes('account') || msg.includes('sign in')) {
    return "Use our Login page to sign in to your Patient, Doctor, or Admin account. Demo credentials are provided directly on the login screen.";
  }
  return "Hello! I am your MediCare health assistant. How can I help you today? You can ask me about doctor appointments, medicines & pharmacy orders, lab tests, or health services.";
};

const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string.' });
    }

    if (!openai) {
      return res.json({ reply: getFallbackReply(message) });
    }

    const prompt = `You are a helpful medical assistant for a hospital web app called MediCare. Answer user questions politely and accurately. If the user asks for appointments, doctors, pharmacy, lab tests, or support, provide short actionable guidance. Do not provide medical diagnoses.`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 250
      });

      const botReply = response.choices?.[0]?.message?.content?.trim() || getFallbackReply(message);
      res.json({ reply: botReply });
    } catch (apiError) {
      console.warn('OpenAI API call failed, using fallback assistant response:', apiError.message);
      res.json({ reply: getFallbackReply(message) });
    }
  } catch (error) {
    console.error('Chatbot error:', error.message || error);
    res.json({ reply: getFallbackReply(req.body?.message || '') });
  }
};

module.exports = { getChatResponse };
