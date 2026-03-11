export type MetadataType = 'datetime' | 'time' | 'url' | 'phone' | 'location' | 'text'

export function detectMetadataType(key: string, value: string): MetadataType {
  const k = key.toLowerCase()

  if (k.includes('date') || k.includes('time')) {
    if (!isNaN(Date.parse(value))) {
      return 'datetime'
    }

    if (/^\d{2}:\d{2}/.test(value)) {
      return 'time'
    }
  }

  if (value.startsWith('http')) {
    return 'url'
  }

  if (/^\+?[0-9 ]+$/.test(value)) {
    return 'phone'
  }

  if (k.includes('city') || k.includes('place') || k.includes('location')) {
    return 'location'
  }

  return 'text'
}
