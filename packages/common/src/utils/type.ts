export function isValidObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isSafeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isSafeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value)
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}
