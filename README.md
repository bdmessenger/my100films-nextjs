# My 100 Films (Next.js)
Next.js application showcasing a list of hundred films and have the ability to view a film's release information by using <a href="https://www.themoviedb.org/documentation/api">TMDb's API</a>.

### Demo: https://my100films.vercel.app

### API Routes:
*/film/:id* -- To view a film's release information. The id can be obtained by searching a film at <a href="https://www.themoviedb.org">TMDb</a>.  
**Example**: https://www.themoviedb.org/movie/157336-interstellar => .../film/157336  

/list/:id -- To view a list of movies that a user has created on TMDb.  
**Example**: https://www.themoviedb.org/list/5802933 => .../list/5802933  

### Installation

``` bash
$ npm install
$ npm install -D
```

### TMDb's API Key is required!
To get their API key, you first need to register an account at https://themoviedb.org/. Once you registered and logged in, then you need to go to https://www.themoviedb.org/settings/api, and under "API Key (v3 auth)" is your API key.

### .env:
```
API_KEY=<<INSERT API KEY>>
LIST_ID='5802933' <-- My list id (you can create a list on TMDb's website and add films to it) for the homepage. You can modify the id to your list's id.
```

##

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
