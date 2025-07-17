export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};

export const validateLength = (value, min = 0, max = Infinity) => {
  if (typeof value !== 'string') return false;
  return value.length >= min && value.length <= max;
};