import { useState } from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { MotionProvider } from '../motion';
import "../styles/motion.css";

export const Route = createRootRoute({
  component: RootDocument,
});

function RootDocument() {
  // Temporarily bypass loader for testing
  const loaderComplete = true;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>mydiio - GPS-verified ad plays on Colombo's roads</title>
      </head>
      <body>
        <MotionProvider>
          <div className="opacity-100">
            <Outlet />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
