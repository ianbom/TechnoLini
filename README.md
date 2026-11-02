# TechNova recreation

A standalone Next.js App Router frontend based on the public TechNova Framer template.

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:3000`. The app has no backend; the contact form validates locally and reports that no message was sent.

Routes include the home, about, project, service, blog, contact, pricing and career pages, collection detail pages, legal pages and template-information pages. Project and blog listings reveal their remaining entries with Load More.

```sh
npm run lint
npm run typecheck
npm run build
npm test
```

Playwright tests use an installed Chrome browser and expect the app to be running. See [visual validation](docs/VISUAL-VALIDATION.md) for screenshot capture and [asset provenance](docs/ASSETS.md) for reference images and licensing information.
