export function getApiErrorMessage(
  err: unknown,
  fallback = 'Something went wrong'
): string {
  if (err instanceof Error && err.message && !('response' in err)) {
    return err.message;
  }

  if (!err || typeof err !== 'object' || !('response' in err)) {
    return fallback;
  }

  const response = (err as { response?: { status?: number; data?: unknown } })
    .response;

  if (!response) {
    return 'Cannot reach the API server. Check that the backend is running and VITE_API_URL is correct.';
  }

  const data = response.data;
  if (data && typeof data === 'object') {
    const payload = data as {
      detail?: string | { msg: string }[];
      message?: string;
      error?: string;
    };

    if (typeof payload.detail === 'string') {
      return payload.detail;
    }

    if (Array.isArray(payload.detail)) {
      return payload.detail.map((item) => item.msg).join(', ');
    }

    if (payload.message) return payload.message;
    if (payload.error) return payload.error;
  }

  if (response.status === 404) {
    return 'API endpoint not found. Point VITE_API_URL to your updated local backend (http://127.0.0.1:5000) or deploy the latest API.';
  }

  return fallback;
}
