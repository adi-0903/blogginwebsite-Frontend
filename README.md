# Mind Matrix — Client

A kinetic storytelling front-end built with React + Vite. The client delivers an atmospheric writing and reading experience with animated transitions and thoughtful UX for journals, blogs, and series.

## Quick start

1. **Prerequisites:** Node.js 18+ and npm.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the dev server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
5. **Preview the production build:**
   ```bash
   npm run preview
   ```

## App features

- **Cinematic landing + hero** with bold typography and motion.
- **Auth & profiles** powered by JWT tokens stored in `localStorage` (`authToken` + `refreshToken`).
- **Blogs, journals, and series** creation and browsing flows.
- **Reading journal** with bookmarks and notes for a personalized archive.
- **Animated UI** via Framer Motion and custom gradients for immersive storytelling.

## Tech stack

- React 18 + Vite 5
- React Router v6 for routing
- Framer Motion for motion design
- clsx for clean conditional classes
- Single CSS bundle (`src/styles.css`) for the visual system

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the built app |

## API & environment

- Base URL defaults to `http://localhost:8000/api` (see `src/api.js`). Update this constant for other environments.
- Auth tokens are added to requests automatically when present in `localStorage`.
- 401s clear tokens and redirect to `/signin`.

## Project structure (client)

```
client/
├─ src/
│  ├─ App.jsx           # Routes, layout, nav, splash
│  ├─ api.js            # API client and endpoints
│  ├─ components/       # UI building blocks (Hero, etc.)
│  ├─ pages/            # Home, About, Pricing, Journal, Blogs, Series, Auth, etc.
│  ├─ styles.css        # Global styles + theme
│  └─ main.jsx          # App bootstrap
├─ index.html
├─ package.json         # Scripts & dependencies
└─ vite.config.js       # Vite config
```

## Notes for customization

- Update imagery or branding in `src/components` and `src/styles.css`.
- Adjust navigation or add routes in `src/App.jsx`.
- Point the API client to a deployed backend by changing `API_BASE_URL` in `src/api.js`.

Happy writing!
