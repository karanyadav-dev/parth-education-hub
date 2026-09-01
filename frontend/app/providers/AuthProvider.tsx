'use client';

import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}

// ✅ अगर आपको AuthProvider भी चाहिए (NextAuth के लिए)
export function AuthProvider({ children }: ProvidersProps) {
  return <>{children}</>;
}
