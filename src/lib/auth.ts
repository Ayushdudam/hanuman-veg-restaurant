import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hanuman@sion';
const AUTH_COOKIE_NAME = 'hvr_admin_session';
const SECRET_KEY = process.env.ADMIN_SECRET || 'hanuman-veg-secret-sion-400022';

// Simple HMAC based session token
export function createSessionToken(username: string): string {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64')}.${hmac}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return false;

    const payload = Buffer.from(payloadB64, 'base64').toString('utf-8');
    const [username, timestampStr] = payload.split(':');
    const timestamp = parseInt(timestampStr, 10);

    // 7 days expiration
    if (isNaN(timestamp) || Date.now() - timestamp > 7 * 24 * 3600 * 1000) {
      return false;
    }

    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}

export function authenticateCredentials(user: string, pass: string): boolean {
  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    return true;
  }
  return false;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export function getAuthCookieName(): string {
  return AUTH_COOKIE_NAME;
}
