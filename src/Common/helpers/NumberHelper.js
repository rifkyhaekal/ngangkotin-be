function parsePhoneNumber(phoneNumber) {
  // Remove all spaces in the phone number
  const formattedNumber = phoneNumber.replace(/\s/g, '');
  // Check if the phone number has a '+' sign, if not add it
  if (!formattedNumber.startsWith('+')) {
    return `+${formattedNumber}`;
  }
  return formattedNumber;
}

module.exports = { parsePhoneNumber };
