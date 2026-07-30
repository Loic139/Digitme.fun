/**
 * Replaces the runtime CDN build (cdn.tailwindcss.com), which shipped 120 KB of
 * blocking JS on every page and compiled the CSS in the browser.
 *
 * Pages used to declare their own palette inline, and several of them reused the
 * same class name for a different colour (`bg-dark` is #0a0a0a on the homepage,
 * #060b16 on the apiconsulting mockup...). A single stylesheet cannot hold both,
 * so every custom colour resolves to a CSS variable holding "R G B" channels,
 * and each page defines the palette it needs in a small `:root` block.
 * Channels (not hex) so that Tailwind's opacity modifiers keep working:
 * `bg-dark-card/50` -> rgb(var(--c-dark-card) / 0.5).
 */
const channel = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: [
    './*.html',
    './fr/**/*.html',
    './avant-apres/**/*.html',
    './friendping/**/*.html',
    './reversegame/**/*.html',
    './mentions-legales/**/*.html',
    './privacy-policy/**/*.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        dark: channel('dark'),
        'dark-light': channel('dark-light'),
        'dark-card': channel('dark-card'),
        warm: channel('warm'),
        brand: {
          DEFAULT: channel('brand'),
          dark: channel('brand-dark'),
          light: channel('brand-light'),
          50: channel('brand-50'),
          100: channel('brand-100'),
          200: channel('brand-200'),
          300: channel('brand-300'),
          400: channel('brand-400'),
          500: channel('brand-500'),
          600: channel('brand-600'),
          700: channel('brand-700'),
          800: channel('brand-800'),
          900: channel('brand-900'),
        },
        // Only the jr-sarl mockup uses these, with fixed values.
        slate: {
          850: '#1a2332',
          950: '#0a1120',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
