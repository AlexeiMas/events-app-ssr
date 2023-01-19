## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is an application with SSR pages, using of as static so dynamics pages. There is an improvising DB as json file.
All data are receiving from there and when user subscribe to certain event, his email pushing to necessary subscribers array of emails.

There are dynamic imports for some pages.

Also, it was realized switcher main theme of views (light/dark) with using of Material UI.

***

For building

```bash
npm run build

# after success executing

npm run start
```