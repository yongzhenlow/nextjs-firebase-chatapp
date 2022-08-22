![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

# NextJS + Firebase Chat App

Alternative demo app created for the article [Building a Chat App with NextJS + Supabase](https://www.yzlow.com/build-a-chat-app-with-nextjs-supabase/), due to Supabase's Realtime having issues with NextJS (React 18).

This app uses Firebase's V9 Modular Web SDK.

## Firebase Project settings

- Enable Anonymous auth, see [here](https://firebase.google.com/docs/auth/web/anonymous-auth#before-you-begin)
- Enable Firestore, and create a collection `messages`

## Setup env

Create a file `.env.local` with your Firebase project configuration for web. See [instructions](https://support.google.com/firebase/answer/7015592?hl=en#web) here on where to get them.

Optionally, if you want to enable AppCheck, follow the instructions [here](https://firebase.google.com/docs/app-check/web/recaptcha-provider) to set up the services required, the add your reCaptcha site key to the env file.

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
