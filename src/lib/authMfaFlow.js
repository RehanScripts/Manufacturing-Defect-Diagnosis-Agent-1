
import { getAppParams } from '@/lib/app-params';

const appId = () => getAppParams().appId;

// The app's own MFA: sign-in challenge, enrollment and factor management, against the app's
// /api/apps/<id>/auth/mfa routes. Credentials stay in memory, never in the URL or storage.

const PKCE_KEY = () => `app-mfa-pkce:${appId()}`;
const encode = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export class MfaError extends Error {
  constructor(message, status, retryAfter) {
    super(message);
    this.status = status;
    this.retryAfter = retryAfter;
  }
  // The challenge or grant is gone (expired or used up): sign in again. A 409 is either a concurrent
  // change or the last-method guard; its message says which, so it gets no sign-in link.
  get mustSignInAgain() {
    return this.status === 401;
  }
}

function authPath(suffix) {
  if (!/^[a-f0-9]{24}$/i.test(appId())) throw new Error('Invalid app ID');
  return `/api/apps/${appId()}/auth/${suffix}`;
}

async function request(suffix, { method = 'POST', body, token, headers } = {}) {
  const response = await fetch(authPath(suffix), {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new MfaError(result.message || 'Authentication failed', response.status, response.headers.get('Retry-After'));
  return result;
}

export const loadSignInOptions = () => request('options', { method: 'GET' });
export const signInWithProvider = (provider, returnTo, options = {}) => {
  const params = new URLSearchParams({ provider, returnTo: returnTo || '/', ...(options.manage ? { manage: 'true' } : {}) });
  window.location.assign(`${authPath('provider')}?${params}`);
};
export const signInToManageMfa = (email, password) => request('sign-in', { body: { email, password, manage: true } });
export const resumeMfa = () => {
  const value = sessionStorage.getItem(PKCE_KEY());
  return value ? JSON.parse(value) : null;
};
export const mfaSession = (challenge) => ({
  challenge,
  verify: (code) => request('verify', { body: { challenge, code } }),
});
export const finishSignIn = async (token, returnTo = '/') => {
  const { saveAccessToken } = await import('@base44/sdk');
  saveAccessToken(token);
  window.location.assign(returnTo || '/');
};