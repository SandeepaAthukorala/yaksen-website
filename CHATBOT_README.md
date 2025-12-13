# AI Chatbot Integration - Setup Guide

## Overview

This chatbot uses Google Gemini API to answer questions about Yaksen Creative Studio based on the `content_guide.md` knowledge base. It features session-based memory, security verification, and a clean React UI.

## Features

- ✅ **Knowledge-Based Responses**: Uses `content_guide.md` as primary knowledge source
- ✅ **Gemini AI**: Powered by Google Gemini 1.5 Flash model
- ✅ **Session Memory**: Keeps last 5 Q/A pairs per session (cookie-based)
- ✅ **Security Gate**: "I'm not a robot" verification required
- ✅ **Rate Limiting**: 10 requests per minute per IP
- ✅ **Source Citations**: Shows which MD chunks were used
- ✅ **Responsive UI**: Tailwind-styled with dark mode

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the project root (if it doesn't exist):

```bash
# f:\projects\websites\web\.env.local
GEMINI_API_KEY=your_gemini_api_key_here
```

> **⚠️ IMPORTANT**: Never commit `.env.local` to version control. Ensure it's in `.gitignore`.

### 2. Install Dependencies

All required dependencies should already be installed. If you encounter issues, run:

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The chatbot will be available at `http://localhost:3000`

## Usage

### User Flow

1. **Open Chat**: Click the red floating button in the bottom-right corner
2. **Verify**: Click "I'm not a robot" to enable chat
3. **Ask Questions**: Type questions about Yaksen Creative Studio
4. **View Sources**: Toggle "Sources" to see which knowledge chunks were used
5. **View Memory**: Toggle "Memory" to see conversation history (last 5 items)

### Sample Questions

Try asking:
- "What is the Yaksen Framework?"
- "What services does Yaksen offer?"
- "What colors does Yaksen use?"
- "How do I contact Yaksen?"
- "What technologies do you use?"

## Architecture

### Backend Components

#### `src/lib/ai-chatbot-service.ts`
- Ingests and chunks `content_guide.md`
- Retrieves relevant context using keyword matching
- Builds prompts for Gemini API
- Manages conversation memory
- Handles API calls with retry logic

#### `src/app/api/chat/route.ts`
- Next.js API route for `/api/chat`
- Validates security gate (cookie check)
- Implements rate limiting (10 req/min)
- Processes chat requests
- Returns responses with source citations

### Frontend Components

#### `src/components/ChatWidget.tsx`
- Floating chat button (bottom-right)
- Modal interface with Tailwind styling
- Message history display
- "I'm not a robot" verification UI
- Source and memory toggles

#### `src/hooks/useChatbot.ts`
- React hook for chat state management
- API communication
- Cookie handling
- Error management

### Security Features

1. **API Key Protection**: Never exposed to client
2. **Rate Limiting**: Prevents abuse (10 req/min per IP)
3. **Verification Gate**: "I'm not a robot" check
4. **Cookie Security**: Non-sensitive data only
5. **Input Validation**: Max message length (1000 chars)

## Testing

### Automated Tests

Run the test suite:

```bash
node scripts/test-runner.js
```

**Prerequisites**: Development server must be running on `http://localhost:3000`

**Tests Include:**
1. ✅ Gate Test - Verify chat blocked without verification
2. ✅ Verification Test - Cookie-based auth works
3. ✅ Knowledge Test - Responses use MD chunks
4. ✅ Security Test - No API keys leaked
5. ✅ Memory Test - Cookie persistence works
6. ✅ Rate Limit Test - Throttling enforced
7. ✅ Error Handling - Malformed requests handled
8. ✅ Context Relevance - Relevant chunks selected
9. ✅ Out-of-Scope - Handles unknown queries gracefully
10. ✅ End-to-End - Full conversation flow

### Manual Testing

1. Open browser to `http://localhost:3000`
2. Open DevTools (F12):
   - **Console**: Check for errors
   - **Network**: Monitor `/api/chat` requests
   - **Application → Cookies**: Verify `chat_allowed` and `chat_memory` cookies
3. Test the user flow (see Usage section)
4. Verify UI responsiveness (resize browser window)

## Troubleshooting

### Issue: "Please verify you are not a robot"

**Solution**: Click the "I'm not a robot" button. If it persists, clear cookies and try again.

### Issue: "Rate limit exceeded"

**Solution**: Wait 1 minute before sending more messages.

### Issue: Chatbot not responding

**Checks**:
1. Verify dev server is running (`npm run dev`)
2. Check browser console for errors
3. Verify `GEMINI_API_KEY` is set in `.env.local`
4. Check Network tab for failed API requests

### Issue: Responses don't match knowledge base

**Solution**: 
- Check if `content_guide.md` exists in project root
- Restart dev server to re-ingest MD file
- Verify chunk IDs in response (toggle "Sources")

### Issue: TypeScript errors

**Solution**:
```bash
npm install tsx @types/node --save-dev
```

## File Structure

```
f:\projects\websites\web\
├── content_guide.md                    # Knowledge base
├── .env.local                          # API key (gitignored)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts           # API endpoint
│   │   └── layout.tsx                 # ChatWidget integration
│   ├── components/
│   │   └── ChatWidget.tsx             # UI component
│   ├── hooks/
│   │   └── useChatbot.ts              # React hook
│   └── lib/
│       └── ai-chatbot-service.ts      # Backend service
├── tests/
│   └── chatbot.test.ts                # Test suite
└── scripts/
    └── test-runner.js                 # Test runner
```

## Deployment

### Production Checklist

- [ ] Set `GEMINI_API_KEY` in production environment variables
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Run `npm run build` to test production build
- [ ] Test in production environment
- [ ] Monitor API usage (Gemini quotas)
- [ ] Consider implementing HTTPS (required for secure cookies)

### Environment Variables (Production)

Set these in your hosting platform (Vercel, Netlify, etc.):

```
GEMINI_API_KEY=your_actual_api_key_here
```

## API Usage & Costs

**Model**: Gemini 1.5 Flash (free tier available)

**Limits**:
- Free tier: 15 requests per minute
- Rate limiting: 10 requests per minute (configurable in `route.ts`)

**Monitoring**: Check Google AI Studio for API usage

## Maintenance

### Updating Knowledge Base

1. Edit `content_guide.md`
2. Restart dev server (auto-reingest on startup)
3. Test with relevant queries
4. Verify correct chunks are used (toggle "Sources")

### Adjusting Chunk Size

Edit `ai-chatbot-service.ts`:
```typescript
// Change maxChunkSize (default: 2000 characters ≈ 500 tokens)
const maxChunkSize = 2000;
```

### Adjusting Memory Size

Edit `ai-chatbot-service.ts`:
```typescript
// Change slice value (default: last 5 items)
.slice(-5);
```

### Adjusting Rate Limit

Edit `route.ts`:
```typescript
const RATE_LIMIT = 10; // requests per minute
```

## Support

For issues or questions:
- Check the Troubleshooting section above
- Review test results: `node scripts/test-runner.js`
- Check browser console and Network tab
- Verify API key is valid and has quota

---

**Version**: 1.0
**Last Updated**: 2025-12-06
**Author**: Yaksen Creative Studio
