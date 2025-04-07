// app/head.tsx
export default function Head() {
    return (
      <>
        <title>SAGECORP</title>
        <meta name="description" content="AI-powered personalized meal plans" />
        <link rel="icon" href="/favicon.ico" />
  
        {/* ✅ Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-5sRFThP5zz7OAfBsfAiF3VWqumduWh8hEHa7ML1BlNsxg7XhXWrPkp+GzzHln8pMSMdpgWZc5MyDbG3zjLI8Fg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </>
    );
  }
  