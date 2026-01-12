export function parseApiError(err: any, defaultMessage = 'Произошла ошибка'): string {
  const detail = err.response?.data?.detail

  if (Array.isArray(detail)) {
    return detail.map((e: any) => e.msg || e.message || String(e)).join(', ')
  }

  if (typeof detail === 'string') {
    return detail
  }

  if (detail && typeof detail === 'object') {
    return detail.msg || detail.message || defaultMessage
  }

  return defaultMessage
}