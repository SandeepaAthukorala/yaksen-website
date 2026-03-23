import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
    console.error('Usage: node generate-password-hash.js <PASSWORD your-password>');
    process.exit(1);
}

async function generateHash() {
    const hash = await bcrypt.hash(password, 10);
    console.log('\n=== Admin Credentials Setup ===\n');
    console.log('Copy this hash to your .env.local file:\n');
    console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
    console.log('Complete .env.local example:\n');
    console.log(`# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH="${hash}"
SESSION_SECRET=${generateRandomSecret()}

# Cloudinary (get from cloudinary.com dashboard)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
`);
}

function generateRandomSecret() {
    return Array.from({ length: 32 }, () =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
            Math.floor(Math.random() * 62)
        )
    ).join('');
}

generateHash();
