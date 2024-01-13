# Group-Up: a Full-stack Next.js 13 Application
<img src="https://github.com/Triv2/group-up/assets/126743500/e7485ebd-28ea-4954-9369-e08585e4095a" alt="projectimage" width="800" height="400" />

>This repository is for an open-source social grouping application.

**Technologies**: *Next.js 13, Prisma, MongoDB, Clerk, Uploadthing*\
**Styling**: *Shadcn-ui, Next-ui,TailwindCSS, Tailwind-Animated, Particle Effects*

## Features 

1. Create as many groups as you want
2. Join as many groups as you want
3. Add as many friends as you can
4. 1:1 Conversations with friends
5. Create threads for forum style communication.
6. Edit your profile or group at any time.

**Requirements**\
	*Node version 18+*\
	*Next.js version 13+*

**Clone Repository**

```
git clone https://github.com/Triv2/group-up.git 
```

## Third Party Services
  *MongoDB*\
	*Clerk*\
	*Uploadthing*

## .env File
```coffeescript

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/setup/profile
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/setup/profile
```

## After Project Cloning
```npm install
npx prisma generate
npx prisma db push
```

## To Start
```
npm run dev
```

## Questions or Inquiries
 Please message me if you have any questions or inquiries regarding this project.
