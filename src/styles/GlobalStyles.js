import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  
  /* Light Mode */
  &, &.light-mode {  
    
    /* Grey */
    --color-grey-0: #f8f8f8;
    --color-grey-50: #f4f3f1;
    --color-grey-100: #e9e7e2;
    --color-grey-200: #d3cec5;
    --color-grey-300: #bcb6a9;
    --color-grey-400: #a69d8c;
    --color-grey-500: #90856f;
    --color-grey-600: #736a59;
    --color-grey-700: #565043;
    --color-grey-800: #3a352c;
    --color-grey-900: #1d1b16;
    --color-grey-950: #0e0d0b;

    --color-blue-100: #e0f2fe;
    --color-blue-700: #0369a1;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;
    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;
    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(255, 255, 255, 0.1);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
    --image-grayscale: 0;
    --image-opacity: 100%;
  }

  /* Dark Mode */

  /* Base Dark Color: #0b1826
  #1a191f 
  
  
  */
  &.dark-mode {
    --color-grey-950: #f8f8f8;
    --color-grey-900: #f4f3f1;
    --color-grey-800: #e9e7e2;
    --color-grey-700: #d3cec5;
    --color-grey-600: #bcb6a9;
    --color-grey-500: #a69d8c;
    --color-grey-400: #90856f;
    --color-grey-300: #736a59;
    --color-grey-200: #565043;
    --color-grey-100: #3a352c;
    --color-grey-50: #1d1b16;
    --color-grey-0: #0e0d0b;

    --color-blue-100: #075985;
    --color-blue-700: #e0f2fe;
    --color-green-100: #166534;
    --color-green-700: #dcfce7;
    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;
    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;
    --color-indigo-100: #3730a3;
    --color-indigo-700: #e0e7ff;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }

  /* Brand Color */
  --color-brand-50: #fff9f1;
  --color-brand-100: #fff1dc;
  --color-brand-200: #ffe7c4;
  --color-brand-500: #eebf79;
  --color-brand-600: #dda654;
  --color-brand-700: #c48d3b;
  --color-brand-800: #9f7434;
  --color-brand-900: #7c5c2c;


  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-800);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity))
}

`;

export default GlobalStyles;

/*
  Grey for dark
  --color-grey-950: #f8f8f8;
  --color-grey-900: #f4f3f1;
  --color-grey-800: #e9e7e2;
  --color-grey-700: #d3cec5;
  --color-grey-600: #bcb6a9;
  --color-grey-500: #a69d8c;
  --color-grey-400: #90856f;
  --color-grey-300: #736a59;
  --color-grey-200: #565043;
  --color-grey-100: #3a352c;
  --color-grey-50: #1d1b16;
  --color-grey-0: #0e0d0b;

  --color-blue-100: #075985;
  --color-blue-700: #e0f2fe;
  --color-green-100: #166534;
  --color-green-700: #dcfce7;
  --color-yellow-100: #854d0e;
  --color-yellow-700: #fef9c3;
  --color-silver-100: #374151;
  --color-silver-700: #f3f4f6;
  --color-indigo-100: #3730a3;
  --color-indigo-700: #e0e7ff;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(0, 0, 0, 0.3);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

  --image-grayscale: 10%;
  --image-opacity: 90%;




  Original :
  --color-grey-0: #18212f;
  --color-grey-50: #111827;
  --color-grey-100: #1f2937;
  --color-grey-200: #374151;
  --color-grey-300: #4b5563;
  --color-grey-400: #6b7280;
  --color-grey-500: #9ca3af;
  --color-grey-600: #d1d5db;
  --color-grey-700: #e5e7eb;
  --color-grey-800: #f3f4f6;
  --color-grey-900: #f9fafb;
*/
