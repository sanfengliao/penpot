/**
 * A collection of math utils.
 * 数学工具函数集合
 */

export const PI = Math.PI

/**
 * Check if value is NaN
 * 检查值是否为NaN
 */
export function isNaN(v: any): boolean {
  return Number.isNaN(v)
}

/**
 * Check if value is a finite number
 * 检查值是否为有限数字
 */
export function isFinite(v: any): boolean {
  return v !== null && v !== undefined && Number.isFinite(v)
}

/**
 * Returns a finite value or a default value
 * 返回有限值或默认值
 */
export function finite(v: number, defaultValue: number): number {
  return isFinite(v) ? v : defaultValue
}

/**
 * Returns the absolute value of a number
 * 返回数字的绝对值
 */
export function abs(v: number): number {
  return Math.abs(v)
}

/**
 * Returns the sine of a number
 * 返回数字的正弦值
 */
export function sin(v: number): number {
  return Math.sin(v)
}

/**
 * Returns the cosine of a number
 * 返回数字的余弦值
 */
export function cos(v: number): number {
  return Math.cos(v)
}

/**
 * Returns the arccosine of a number
 * 返回数字的反余弦值
 */
export function acos(v: number): number {
  return Math.acos(v)
}

/**
 * Returns the tangent of a number
 * 返回数字的正切值
 */
export function tan(v: number): number {
  return Math.tan(v)
}

/**
 * Returns the arctangent of the quotient of its arguments
 * 返回参数商的反正切值
 */
export function atan2(x: number, y: number): number {
  return Math.atan2(x, y)
}

/**
 * Negate the number
 * 否定数字（取反）
 */
export function neg(v: number): number {
  return -v
}

/**
 * Calculates the square of a number
 * 计算数字的平方
 */
export function sq(v: number): number {
  return v * v
}

/**
 * Returns the base to the exponent power
 * 返回基数的指数次幂
 */
export function pow(base: number, exponent: number): number {
  return base ** exponent
}

/**
 * Returns the square root of a number
 * 返回数字的平方根
 */
export function sqrt(v: number): number {
  return Math.sqrt(v)
}

/**
 * Returns the cubic root of a number
 * 返回数字的立方根
 */
export function cubicroot(v: number): number {
  if (v > 0) {
    return pow(v, 1 / 3)
  }
  return -pow(-v, 1 / 3)
}

/**
 * Returns the largest integer less than or equal to a given number
 * 返回小于或等于给定数字的最大整数
 */
export function floor(v: number): number {
  return Math.floor(v)
}

/**
 * Returns the value of a number rounded to the nearest integer.
 * If given step, rounds to the next closest step.
 * Example: round(13.4, 0.5) => 13.5, round(13.4, 0.3) => 13.3
 * 将数字四舍五入到最近的整数
 * 如果给定了步长，则四舍五入到最接近的步长
 */
export function round(v: number, step?: number): number {
  if (step !== undefined) {
    return round(v / step) * step
  }
  return Math.round(v)
}

/**
 * Returns the smallest integer greater than or equal to a given number
 * 返回大于或等于给定数字的最小整数
 */
export function ceil(v: number): number {
  return Math.ceil(v)
}

/**
 * Round number to specified decimal places
 * 将数字四舍五入到指定的小数位数
 */
export function precision(v: number, n: number): number {
  if (typeof v !== 'number' || !Number.isInteger(n)) {
    return v
  }
  const d = pow(10, n)
  return round(v * d) / d
}

/**
 * Returns a string representing the given number, using fixed precision
 * 返回表示给定数字的字符串，使用固定精度
 */
export function toFixed(v: number, n: number): string {
  return v.toFixed(n)
}

/**
 * Converts degrees to radians
 * 将度数转换为弧度
 */
export function radians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/**
 * Converts radians to degrees
 * 将弧度转换为度数
 */
export function degrees(radians: number): number {
  return (radians * 180) / Math.PI
}

/**
 * Square root of the sum of squares (Euclidean norm)
 * 平方和的平方根（欧几里得范数）
 */
export function hypot(a: number, b: number): number {
  return Math.hypot(a, b)
}

/**
 * Calculate the distance between two points
 * 计算两点之间的距离
 */
export function distance(p1: [number, number], p2: [number, number]): number {
  const [x1, y1] = p1
  const [x2, y2] = p2
  const dx = x1 - x2
  const dy = y1 - y2
  return precision(hypot(dx, dy), 2)
}

/**
 * Logarithm base 10
 * 以10为底的对数
 */
export function log10(x: number): number {
  return Math.log10(x)
}

/**
 * Clamp number between from and to values
 * 将数字限制在from和to值之间
 */
export function clamp(num: number, from: number, to: number): number {
  if (num < from) {
    return from
  }
  if (num > to) {
    return to
  }
  return num
}

/**
 * Check if number is almost zero (within 1e-4 tolerance)
 * 检查数字是否接近零（容差1e-4内）
 */
export function almostZero(num: number): boolean {
  return abs(num) < 1e-4
}

/**
 * Given a number, if it's close enough to zero, round it to zero to avoid precision problems
 * 如果数字足够接近零，将其四舍五入为零以避免精度问题
 */
export function roundToZero(num: number): number {
  if (abs(num) < 1e-4) {
    return 0
  }
  return num
}

/**
 * Default precision for float equality comparisons
 * 浮点数相等比较的默认精度
 */
export const FLOAT_EQUAL_PRECISION = 0.001

/**
 * Equality for float numbers. Check if the difference is within a range.
 * 浮点数相等性。检查差值是否在范围内
 */
export function close(num1: number, num2: number, precision?: number): boolean {
  const p = precision ?? FLOAT_EQUAL_PRECISION
  return abs(num1 - num2) <= p
}

/**
 * Calculates a linear interpolation between two values and a given percent
 * 计算两个值之间的线性插值和给定百分比
 */
export function lerp(v0: number, v1: number, t: number): number {
  return (1 - t) * v0 + t * v1
}

/**
 * Returns the maximum absolute value of two numbers
 * 返回两个数字的最大绝对值
 */
export function maxAbs(a: number, b: number): number {
  return Math.max(abs(a), abs(b))
}

/**
 * Get the sign (+1 / -1) for the number
 * 获取数字的符号（+1 / -1）
 */
export function sign(n: number): number {
  return n < 0 ? -1 : 1
}

/**
 * Returns the minimum of two or more values
 * 返回两个或多个值的最小值
 */
export function min(...values: number[]): number {
  return Math.min(...values)
}

/**
 * Returns the maximum of two or more values
 * 返回两个或多个值的最大值
 */
export function max(...values: number[]): number {
  return Math.max(...values)
}
