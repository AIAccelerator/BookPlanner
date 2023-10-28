/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'accent': 'var(--accent)',
        'background': 'var(--background)',
      },
      textColor: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'accent': 'var(--accent)',
        'background': 'var(--background)',
      },
      borderColor: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'accent': 'var(--accent)',
        'background': 'var(--background)',
      },
      placeholderColor: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'accent': 'var(--accent)',
        'background': 'var(--background)',
      },
      gradientColorStops: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'accent': 'var(--accent)',
        'background': 'var(--background)',
      },
      ringColor: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'accent': 'var(--accent)',
        'background': 'var(--background)',
      }
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};