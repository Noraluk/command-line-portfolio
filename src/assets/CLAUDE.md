# assets/

Static imports: images, icons, fonts.

Rules:
- Import through JS so Vite fingerprints them; don't hardcode `/public` paths for hashed assets.
- SVG icons as components go in `components/`, raw image files stay here.
