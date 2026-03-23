# Admin Panel Setup Guide

## Step 1: Generate Admin Password

Run this command to generate your password hash:

```bash
node scripts/generate-password-hash.js yourpassword
```

Replace `yourpassword` with your desired password. This will output a hash and complete `.env.local` template.

## Step 2: Create .env.local

Create a file called `.env.local` in the root directory and add:

```env
# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<paste_hash_from_step_1>
SESSION_SECRET=<paste_secret_from_step_1>

# Cloudinary (optional - for media uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Step 3: Start Development Server

```bash
npm run dev
```

## Step 4: Access Admin Panel

Navigate to: http://localhost:3000/admin

Login with:
- Username: `admin` (or whatever you set in ADMIN_USERNAME)
- Password: (the password you used in step 1)

## Features

- **Projects Management**: Add/edit/delete projects
- **Team Management**: Manage team members
- **Blog Management**: Create and manage blog posts
- **Analytics**: View site statistics
- **Media Library**: Cloudinary integration (requires credentials)

## Important Notes

- ✅ Admin panel only works on localhost
- ✅ All changes edit JSON files in `src/data/`
- ✅ Commit and push changes to GitHub to deploy
- ✅ Admin routes are protected by middleware
- ✅ Session lasts 30 days

## Workflow

1. Make changes in admin panel
2. Run `git status` to see modified files
3. Commit the changes: `git add . && git commit -m "Update content"`
4. Push to GitHub: `git push`
5. Your deployment service will rebuild with new content

## Troubleshooting

**Can't login?**
- Make sure .env.local exists with correct credentials
- Restart dev server after creating .env.local
- Check console for errors

**Changes not saving?**
- Check file permissions in src/data/
- Look at terminal for error messages
- Make sure you're on localhost

**Want to add Cloudinary?**
1. Sign up at cloudinary.com (free tier available)
2. Get your credentials from dashboard
3. Add them to .env.local
4. Restart dev server
