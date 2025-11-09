import type { Matrix } from './matrix'
import * as mth from '../math'
import { isNonEmptyString, isSafeNumber, isValidObject } from '../utils/type'

/**
 * Point class - Represents a 2D point in the coordinate system
 */
export class Point {
  readonly x: number
  readonly y: number

  /**
   * Create a Point instance.
   * Overloads:
   * - new Point() -> new Point(0, 0)
   * - new Point(n) -> new Point(n, n)
   * - new Point({x, y}) -> new Point(x, y)
   * - new Point(Point) -> returns the same point
   * - new Point(x, y) -> new Point(x, y)
   */
  constructor()
  constructor(v: number)
  constructor(v: { x: number, y: number })
  constructor(x: number, y: number)
  constructor(x?: number | { x: number, y: number }, y?: number) {
    if (x === undefined) {
      this.x = 0
      this.y = 0
    } else if (isSafeNumber(x) && isSafeNumber(y)) {
      this.x = x
      this.y = y
    } else if (Point.isPointLike(x)) {
      this.x = x.x
      this.y = x.y
    } else if (isSafeNumber(x)) {
      this.x = x
      this.y = x
    } else {
      throw new Error('Invalid parameters to create Point')
    }
  }

  /**
   * Return true if `v` is Point instance.
   */
  static isPoint(v: unknown): v is Point {
    return v instanceof Point
  }

  /**
   * Validator for point attributes (x and y must be safe numbers)
   */
  static isValidPointAttrs(v: unknown): boolean {
    if (typeof v !== 'object' || v === null)
      return false
    const obj = v as Record<string, unknown>
    return (
      isSafeNumber(obj.x)
      && isSafeNumber(obj.y)
    )
  }

  /**
   * Validator for complete valid point (must be Point instance with valid attrs)
   */
  static isValidPoint(v: unknown): v is Point {
    return Point.isPoint(v) && Point.isValidPointAttrs(v)
  }

  /**
   * Decode a point from various formats (map, string, or Point instance)
   */
  static decodePoint(p: unknown): Point | unknown {
    // If it's a plain object with x and y properties, convert to Point
    if (isValidObject(p) && !Array.isArray(p)) {
      const obj = p as Record<string, unknown>
      if (isSafeNumber(obj.x) && isSafeNumber(obj.y)) {
        return new Point(obj.x, obj.y)
      }
    }
    // If it's a string in "x,y" format, parse it
    if (isNonEmptyString(p)) {
      const [x, y] = p.split(',').map(parseFloat)
      return new Point(x, y)
    }
    return p
  }

  /**
   * Convert point to string format "x,y"
   */
  static pointToStr(p: unknown): string | unknown {
    if (Point.isPoint(p)) {
      return p.toString()
    }
    return p
  }

  /**
   * Convert point to JSON object
   */
  static pointToJson(p: unknown): { x: number, y: number } | unknown {
    if (Point.isPoint(p)) {
      return { x: p.x, y: p.y }
    }
    return p
  }

  /**
   * Check if an object is point-like (has numeric x and y)
   */
  static isPointLike(v: unknown): v is { x: number, y: number } {
    if (!isValidObject(v)) {
      return false
    }
    const obj = v as Record<string, unknown>
    return isSafeNumber(obj.x) && isSafeNumber(obj.y)
  }

  /**
   * Check if two points are close to each other (considering floating-point precision)
   */
  close(p: Point, epsilon: number = 1e-10): boolean {
    return (
      mth.abs(this.x - p.x) < epsilon && mth.abs(this.y - p.y) < epsilon
    )
  }

  /**
   * Create a new point from an angle and distance
   * Angle is in radians
   */
  angleToPoint(angle: number, distance: number): Point {
    return new Point(
      this.x + distance * mth.cos(angle),
      this.y - distance * mth.sin(angle),
    )
  }

  /**
   * Returns the addition of the supplied point to this point as a new point.
   */
  add(p: Point): Point {
    if (!Point.isPointLike(p)) {
      throw new Error('arguments should be point instance')
    }
    return new Point(this.x + p.x, this.y + p.y)
  }

  /**
   * Returns the subtraction of the supplied point from this point as a new point.
   */
  subtract(p: Point): Point {
    if (!Point.isPointLike(p)) {
      throw new Error('arguments should be pointer instance')
    }
    return new Point(this.x - p.x, this.y - p.y)
  }

  /**
   * Returns the element-wise multiplication of this point and another point.
   */
  multiply(p: Point): Point {
    if (!Point.isPointLike(p)) {
      throw new Error('arguments should be pointer instance')
    }
    return new Point(this.x * p.x, this.y * p.y)
  }

  /**
   * Returns the element-wise division of this point by another point.
   */
  divide(p: Point): Point {
    if (!Point.isPointLike(p)) {
      throw new Error('arguments should be pointer instance')
    }
    return new Point(this.x / p.x, this.y / p.y)
  }

  /**
   * Take the minimum of two points (element-wise minimum)
   */
  static min(): undefined
  static min(p1: Point): Point
  static min(p1: undefined, p2: Point): Point
  static min(p1: Point, p2: Point): Point
  static min(
    p1?: Point,
    p2?: Point,
  ): Point | undefined {
    if (p1 === undefined) {
      return p2
    }
    if (p2 === undefined) {
      return p1
    }
    return new Point(mth.min(p1.x, p2.x), mth.min(p1.y, p2.y))
  }

  /**
   * Take the maximum of two points (element-wise maximum)
   */
  static max(): undefined
  static max(p1: Point): Point
  static max(p1: undefined, p2: Point): Point
  static max(p1: Point, p2: Point): Point
  static max(
    p1?: Point,
    p2?: Point,
  ): Point | undefined {
    if (p1 === undefined) {
      return p2
    }
    if (p2 === undefined) {
      return p1
    }

    return new Point(mth.max(p1.x, p2.x), mth.max(p1.y, p2.y))
  }

  /**
   * Returns the inverse of this point (1/x, 1/y)
   */

  inverse(): Point {
    return new Point(1 / this.x, 1 / this.y)
  }

  /**
   * Returns the negation of this point
   */
  negate(): Point {
    return new Point(-this.x, -this.y)
  }

  /**
   * Calculate the distance between two points.
   */
  distance(p: Point): number {
    if (!Point.isPointLike(p)) {
      throw new Error('arguments should be point instances')
    }
    const dx = this.x - p.x
    const dy = this.y - p.y
    return mth.hypot(dx, dy)
  }

  /**
   * Get the length (distance to origin) of this point.
   */
  length(): number {
    return mth.hypot(this.x, this.y)
  }

  /**
   * Calculate the distance vector (separated x and y absolute differences)
   */
  distanceVector(p: Point): Point {
    if (!Point.isPoint(p)) {
      throw new Error('arguments should be point instances')
    }
    const dx = this.x - p.x
    const dy = this.y - p.y
    return new Point(mth.abs(dx), mth.abs(dy))
  }

  /**
   * Returns the smaller angle between two vectors (in degrees).
   * If center is not provided, the angle will be measured from x-axis.
   */
  angle(): number
  angle(center: Point): number
  angle(center?: Point): number {
    let x = this.x
    let y = this.y

    if (center !== undefined) {
      if (!Point.isPoint(center)) {
        throw new Error('point instance expected')
      }
      x = x - center.x
      y = y - center.y
    }

    return (mth.atan2(y, x) * 180) / mth.PI
  }

  /**
   * Consider this point as a vector and calculate the angle with another vector.
   */
  angleWithOther(p: Point): number {
    if (!Point.isPoint(p)) {
      throw new Error('arguments should be point instances')
    }

    const len1 = this.length()
    const len2 = p.length()

    if (mth.abs(len1) < 1e-10 || mth.abs(len2) < 1e-10) {
      return 0
    }

    let a = (this.x * p.x + this.y * p.y) / (len1 * len2)
    a = a < -1 ? -1 : a > 1 ? 1 : a

    const angleRad = mth.acos(a)
    const degrees = (angleRad * 180) / mth.PI

    return isNaN(degrees) ? 0 : degrees
  }

  /**
   * Calculate the sign of the cross product (for signed angle calculation)
   */
  angleSign(p: Point): number {
    return this.y * p.x > this.x * p.y ? -1 : 1
  }

  /**
   * Calculate the signed angle with another vector
   */
  signedAngleWithOther(v: Point): number {
    return this.angleSign(v) * this.angleWithOther(v)
  }

  /**
   * Update the angle of this point (in degrees) while preserving its length
   */
  updateAngle(angle: number): Point {
    if (typeof angle !== 'number') {
      throw new TypeError('expected number')
    }
    const len = this.length()
    const angleRad = (angle * mth.PI) / 180
    return new Point(len * mth.cos(angleRad), len * mth.sin(angleRad))
  }

  /**
   * Return the quadrant of the angle of this point (1-4)
   */
  quadrant(): number {
    if (this.x >= 0) {
      return this.y >= 0 ? 1 : 4
    } else {
      return this.y >= 0 ? 2 : 3
    }
  }

  /**
   * Round the coordinates of this point to a given precision
   */
  round(decimals: number = 0): Point {
    if (typeof decimals !== 'number') {
      throw new TypeError('expected number instance')
    }
    const factor = 10 ** decimals
    return new Point(
      mth.round(this.x * factor) / factor,
      mth.round(this.y * factor) / factor,
    )
  }

  /**
   * Round the coordinates to the closest step value
   */
  roundStep(step: number): Point {
    return new Point(
      mth.round(this.x / step) * step,
      mth.round(this.y / step) * step,
    )
  }

  /**
   * Transform a point applying a matrix transformation.
   */
  transform(m?: Matrix): Point {
    if (!isValidObject(m)) {
      return new Point(this)
    }
    const x = this.x * m.a + this.y * m.c + m.e
    const y = this.x * m.b + this.y * m.d + m.f
    return new Point(x, y)
  }

  /**
   * In-place transform (in JS, still returns new instance, matches CLJS behavior)
   */
  transformMut(m: Matrix): Point {
    const x = this.x * m.a + this.y * m.c + m.e
    const y = this.x * m.b + this.y * m.d + m.f
    return new Point(x, y)
  }

  /**
   * Returns a result of transforming an identity point with the provided matrix instance
   */
  static matrixToPoint(m: Matrix): Point {
    return new Point(m.e, m.f)
  }

  /**
   * Calculate the vector from p1 to p2
   */

  static toVec(p1: Point, p2: Point): Point {
    return p2.subtract(p1)
  }

  toVec(p2: Point): Point {
    return p2.subtract(this)
  }

  /**
   * Scale this point by a scalar value
   */
  scale(scalar: number): Point {
    return new Point(this.x * scalar, this.y * scalar)
  }

  /**
   * Calculate the dot product with another point
   */
  dot(p: Point): number {
    return this.x * p.x + this.y * p.y
  }

  /**
   * Return the unit vector in the direction of this point
   */
  unit(): Point {
    const len = this.length()
    if (mth.abs(len) < 1e-10) {
      return new Point(0, 0)
    }
    return new Point(this.x / len, this.y / len)
  }

  /**
   * Returns the perpendicular vector (rotated 90 degrees counter-clockwise)
   */
  perpendicular(): Point {
    return new Point(-this.y, this.x)
  }

  /**
   * V1 perpendicular projection on vector V2
   */
  project(v2: Point): Point {
    const v2Unit = v2.unit()
    const scalarProj = this.dot(v2Unit)
    return v2Unit.scale(scalarProj)
  }

  /**
   * Centroid (center) of a group of points
   */
  static centerPoints(points: Point[]): Point {
    const n = points.length
    if (n === 0) {
      return new Point(0, 0)
    }

    const k = new Point(n)
    return points.reduce(
      (acc, p) => acc.add(p.divide(k)),
      new Point(0, 0),
    )
  }

  /**
   * Returns the normal unit vector on the left side
   */
  normalLeft(): Point {
    return new Point(-this.y, this.x).unit()
  }

  /**
   * Returns the normal unit vector on the right side
   */
  normalRight(): Point {
    return new Point(this.y, -this.x).unit()
  }

  /**
   * Returns the distance from this point to a line defined by two points
   */
  pointLineDistance(
    linePoint1: Point,
    linePoint2: Point,
  ): number {
    const x0 = this.x
    const y0 = this.y
    const x1 = linePoint1.x
    const y1 = linePoint1.y
    const x2 = linePoint2.x
    const y2 = linePoint2.y

    const numerator = mth.abs(
      x0 * (y2 - y1) - y0 * (x2 - x1) + x2 * y1 - y2 * x1,
    )
    const denominator = linePoint1.distance(linePoint2)

    return numerator / denominator
  }

  /**
   * Check if this point is almost zero (considering floating-point precision)
   */
  almostZero(): boolean {
    return mth.almostZero(this.x) && mth.almostZero(this.y)
  }

  /**
   * Check if this point is exactly zero
   */
  isZero(): boolean {
    return this.x === 0 && this.y === 0
  }

  /**
   * Calculates a linear interpolation between two points given a t value (0-1)
   */
  lerp(p2: Point, t: number): Point {
    const x = this.x + (p2.x - this.x) * t
    const y = this.y + (p2.y - this.y) * t
    return new Point(x, y)
  }

  /**
   * Rotates this point around a center with an angle (in degrees)
   */
  rotate(center: Point, angle: number): Point {
    if (!Point.isPoint(center)) {
      throw new Error('point instance expected')
    }

    const angleRad = (angle * mth.PI) / 180
    const px = this.x
    const py = this.y
    const cx = center.x
    const cy = center.y

    const sa = mth.sin(angleRad)
    const ca = mth.cos(angleRad)

    const x = ca * (px - cx) - sa * (py - cy) + cx
    const y = sa * (px - cx) + ca * (py - cy) + cy

    return new Point(x, y)
  }

  /**
   * Moves a point in the vector direction from center with a scale value
   */
  scaleFrom(center: Point, value: number): Point {
    const vec = Point.toVec(center, this)
    const unitVec = vec.unit()
    const scaled = unitVec.scale(value)
    return this.add(scaled)
  }

  /**
   * Remove zero values from either coordinate (replace with 0.001)
   */
  noZeros(): Point {
    return new Point(
      mth.abs(this.x) < 1e-10 ? 0.001 : this.x,
      mth.abs(this.y) < 1e-10 ? 0.001 : this.y,
    )
  }

  /**
   * Creates a new vector with the same direction but different length
   */
  resize(newLength: number): Point {
    const oldLength = this.length()
    return this.scale(newLength / oldLength)
  }

  /**
   * Return the absolute value of the coordinates
   */
  abs(): Point {
    return new Point(mth.abs(this.x), mth.abs(this.y))
  }

  toString(): string {
    return `${this.x},${this.y}`
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): { x: number, y: number } {
    return { x: this.x, y: this.y }
  }
}
