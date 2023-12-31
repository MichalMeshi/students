const fs = require('fs');
const path = require('path');

const getEmailTemplate = () => {
    const filePath = path.join(__dirname, '../email.html'); // Assuming the email.html is in the same directory
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (error) {
        console.error('Error reading email template:', error);
        return null;
    }
};
module.exports = getEmailTemplate;
