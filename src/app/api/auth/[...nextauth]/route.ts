import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Create handler for GET and POST methods for NextAuth API route
const handler = NextAuth(authOptions);

// Export as GET and POST for Next.js API routing
export { handler as GET, handler as POST };
