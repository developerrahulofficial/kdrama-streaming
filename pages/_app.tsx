// Import the global CSS styles. These styles will be applied to all pages.
import '../styles/globals.css'

// Import the types for the app properties from Next.js.
// 'AppProps' includes the Component to render and the pageProps to pass to that component.
import type { AppProps } from 'next/app'

// Define the custom App component, which receives the Component and pageProps as props.
function MyApp({ Component, pageProps }: AppProps) {
  // Render the Component with the provided pageProps.
  // Component represents the page that is currently being rendered.
  return <Component {...pageProps} />
}

// Export the MyApp component as the default export.
// This ensures Next.js uses this custom App component to initialize pages.
export default MyApp
