import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export function formatDate(date: string | null): string {
  if (!date) return ''
  try {
    return format(parseISO(date), 'dd.MM.yyyy', { locale: ru })
  } catch {
    return ''
  }
}

export function formatDateTime(date: string | null): string {
  if (!date) return ''
  try {
    return format(parseISO(date), 'dd.MM.yyyy HH:mm', { locale: ru })
  } catch {
    return ''
  }
}

export function dateToLocalISOString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

export function localISOStringToDate(isoString: string): Date {
  const withoutTimezone = isoString.replace(/Z|[+-]\d{2}:\d{2}$/g, '')
  const [datePart, timePart = '00:00:00'] = withoutTimezone.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const timeComponents = timePart.split(':')
  const hours = Number(timeComponents[0] || 0)
  const minutes = Number(timeComponents[1] || 0)
  const seconds = Number((timeComponents[2] || '0').split('.')[0])

  return new Date(year, month - 1, day, hours, minutes, seconds)
}
