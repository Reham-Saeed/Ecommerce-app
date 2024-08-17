/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      container:{
        center:true,
         padding: {
          DEFAULT: '1rem',
          sm: '2rem', 
          lg: '3rem',
          xl: '4rem',
        }
      }
    },
  },
  plugins: [],
}

