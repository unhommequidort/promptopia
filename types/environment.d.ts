export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      MONGODB_URI: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_URL_INTERNAL: string;
      NEXT_AUTH_SECRET: string;
    }
  }
}
