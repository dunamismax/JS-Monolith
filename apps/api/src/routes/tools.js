import crypto from 'crypto';

export async function toolsRoutes(fastify, _options) {
  
  fastify.post('/tools/analyze-text', async (request, reply) => {
    try {
      const { text } = request.body;
      
      if (!text || typeof text !== 'string') {
        reply.code(400).send({ error: 'Text is required' });
        return;
      }
      
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;
      const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
      const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
      const readingTime = Math.ceil(words.length / 200);
      
      return {
        analysis: {
          words: words.length,
          characters,
          charactersNoSpaces,
          sentences,
          paragraphs,
          readingTime: `${readingTime} min`
        }
      };
    } catch (error) {
      reply.code(500).send({ error: 'Failed to analyze text' });
    }
  });

  fastify.get('/tools/random-number', async (request, reply) => {
    try {
      const { min = 1, max = 100 } = request.query;
      const minNum = parseInt(min);
      const maxNum = parseInt(max);
      
      if (minNum >= maxNum) {
        reply.code(400).send({ error: 'Min must be less than max' });
        return;
      }
      
      const randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      
      return {
        number: randomNumber,
        min: minNum,
        max: maxNum
      };
    } catch (error) {
      reply.code(500).send({ error: 'Failed to generate random number' });
    }
  });

  fastify.post('/tools/roll-dice', async (request, reply) => {
    try {
      const { sides = 6, count = 1 } = request.body;
      
      if (sides < 2 || sides > 100) {
        reply.code(400).send({ error: 'Sides must be between 2 and 100' });
        return;
      }
      
      if (count < 1 || count > 10) {
        reply.code(400).send({ error: 'Count must be between 1 and 10' });
        return;
      }
      
      const rolls = [];
      for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
      }
      
      return {
        rolls,
        total: rolls.reduce((sum, roll) => sum + roll, 0),
        sides,
        count
      };
    } catch (error) {
      reply.code(500).send({ error: 'Failed to roll dice' });
    }
  });

  fastify.post('/tools/generate-password', async (request, reply) => {
    try {
      const { length = 12, includeNumbers = true, includeSymbols = true, includeUppercase = true } = request.body;
      
      if (length < 4 || length > 64) {
        reply.code(400).send({ error: 'Length must be between 4 and 64' });
        return;
      }
      
      let charset = 'abcdefghijklmnopqrstuvwxyz';
      if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (includeNumbers) charset += '0123456789';
      if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      let password = '';
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      
      return {
        password,
        length,
        strength: length >= 16 ? 'strong' : length >= 12 ? 'medium' : 'weak'
      };
    } catch (error) {
      reply.code(500).send({ error: 'Failed to generate password' });
    }
  });

  fastify.post('/tools/color-palette', async (request, reply) => {
    try {
      const { baseColor, count = 5 } = request.body;
      
      if (count < 2 || count > 10) {
        reply.code(400).send({ error: 'Count must be between 2 and 10' });
        return;
      }
      
      const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      
      const colors = [];
      for (let i = 0; i < count; i++) {
        colors.push(generateRandomColor());
      }
      
      return {
        colors,
        baseColor,
        count
      };
    } catch (error) {
      reply.code(500).send({ error: 'Failed to generate color palette' });
    }
  });

  fastify.post('/tools/qr-code', async (request, reply) => {
    try {
      const { text, size = 200 } = request.body;
      
      if (!text || typeof text !== 'string') {
        reply.code(400).send({ error: 'Text is required' });
        return;
      }
      
      if (text.length > 500) {
        reply.code(400).send({ error: 'Text must be less than 500 characters' });
        return;
      }
      
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
      
      return {
        qrUrl,
        text,
        size
      };
    } catch (error) {
      reply.code(500).send({ error: 'Failed to generate QR code' });
    }
  });

  fastify.post('/tools/hash-text', async (request, reply) => {
    try {
      const { text, algorithm = 'sha256' } = request.body;
      
      if (!text || typeof text !== 'string') {
        reply.code(400).send({ error: 'Text is required' });
        return;
      }
      
      const supportedAlgorithms = ['md5', 'sha1', 'sha256', 'sha512'];
      if (!supportedAlgorithms.includes(algorithm)) {
        reply.code(400).send({ error: 'Unsupported algorithm' });
        return;
      }
      
      const hash = crypto.createHash(algorithm).update(text).digest('hex');
      
      return {
        hash,
        algorithm,
        originalText: text.substring(0, 50) + (text.length > 50 ? '...' : '')
      };
    } catch (error) {
      reply.code(500).send({ error: 'Failed to hash text' });
    }
  });
}