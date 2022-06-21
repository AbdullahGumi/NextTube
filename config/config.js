const dev = process.env.NODE_ENV !== "production";

export const NEXT_URL = dev
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_FRONTEND_URL;
