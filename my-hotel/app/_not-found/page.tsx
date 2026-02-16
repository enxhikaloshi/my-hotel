// PA 'use client' - KY ESHTE SERVER COMPONENT
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#f9fafb',
          margin: 0,
          padding: '1rem'
        }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0'
          }}>404</h1>
          
          <h2 style={{
            fontSize: '1.5rem',
            color: '#374151',
            margin: '1rem 0'
          }}>Page Not Found</h2>
          
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}