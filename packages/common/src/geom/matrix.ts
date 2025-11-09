import * as mth from '../math'
import * as gpt from './point'

const PRECISION = 6

/**
 * Matrix class representing a 2D affine transformation matrix
 * 矩阵类，表示2D仿射变换矩阵
 * Format: [a c e]
 *         [b d f]
 *         [0 0 1]
 */
export class Matrix {
  constructor(
    readonly a: number = 1,
    readonly b: number = 0,
    readonly c: number = 0,
    readonly d: number = 1,
    readonly e: number = 0,
    readonly f: number = 0,
  ) {}

  /**
   * Check if value is Matrix instance
   * 检查值是否为矩阵实例
   */
  static isMatrix(v: any): v is Matrix {
    return v instanceof Matrix
  }

  /**
   * Create a new identity matrix
   * 创建一个新的单位矩阵
   */
  static identity(): Matrix {
    return new Matrix(1, 0, 0, 1, 0, 0)
  }

  /**
   * Check if this is a unit/identity matrix
   * 检查是否为单位矩阵
   */
  isUnit(): boolean {
    return (
      mth.close(this.a, 1)
      && mth.close(this.b, 0)
      && mth.close(this.c, 0)
      && mth.close(this.d, 1)
      && mth.close(this.e, 0)
      && mth.close(this.f, 0)
    )
  }

  /**
   * Check if two matrices are close (within floating point tolerance)
   * 检查两个矩阵是否接近（在浮点数容差内）
   */
  static close(m1: Matrix | null, m2: Matrix | null): boolean {
    if (!m1 || !m2)
      return m1 === m2
    return (
      mth.close(m1.a, m2.a)
      && mth.close(m1.b, m2.b)
      && mth.close(m1.c, m2.c)
      && mth.close(m1.d, m2.d)
      && mth.close(m1.e, m2.e)
      && mth.close(m1.f, m2.f)
    )
  }

  /**
   * Format matrix to string with specified precision
   * 将矩阵格式化为指定精度的字符串
   */
  formatPrecision(precision: number = PRECISION): string {
    return (
      `matrix(`
      + `${mth.toFixed(this.a, precision)}, `
      + `${mth.toFixed(this.b, precision)}, `
      + `${mth.toFixed(this.c, precision)}, `
      + `${mth.toFixed(this.d, precision)}, `
      + `${mth.toFixed(this.e, precision)}, `
      + `${mth.toFixed(this.f, precision)})`
    )
  }

  toString(): string {
    return this.formatPrecision(PRECISION)
  }

  /**
   * Subtract another matrix from this matrix
   * 从此矩阵中减去另一个矩阵
   */
  subtract(m: Matrix): Matrix {
    return new Matrix(
      this.a - m.a,
      this.b - m.b,
      this.c - m.c,
      this.d - m.d,
      this.e - m.e,
      this.f - m.f,
    )
  }

  /**
   * Multiply two or more matrices
   * 矩阵乘法（可支持多个矩阵）
   */
  static multiply(m1: Matrix | null, m2: Matrix | null, ...others: Matrix[]): Matrix {
    // nil matrixes are equivalent to unit-matrix
    if (!m1 && !m2)
      return Matrix.identity()
    if (!m1)
      return m2!
    if (!m2)
      return m1

    const result = new Matrix(
      m1.a * m2.a + m1.c * m2.b,
      m1.b * m2.a + m1.d * m2.b,
      m1.a * m2.c + m1.c * m2.d,
      m1.b * m2.c + m1.d * m2.d,
      m1.a * m2.e + m1.c * m2.f + m1.e,
      m1.b * m2.e + m1.d * m2.f + m1.f,
    )

    return others.length > 0
      ? Matrix.multiply(result, others[0], ...others.slice(1))
      : result
  }

  /**
   * Multiply this matrix with another matrix
   * 将此矩阵与另一个矩阵相乘
   */
  multiply(other: Matrix): Matrix {
    return Matrix.multiply(this, other)
  }

  /**
   * Add this translate matrix with another translate matrix
   * Given two TRANSLATE matrixes (only e and f have significant values),
   * combine them. Quicker than multiplying them, for this precise case.
   * 将此平移矩阵与另一个平移矩阵相加
   */
  addTranslate(m: Matrix, ...others: Matrix[]): Matrix {
    const result = new Matrix(1, 0, 0, 1, this.e + m.e, this.f + m.f)
    return others.length > 0
      ? result.addTranslate(others[0], ...others.slice(1))
      : result
  }

  /**
   * Create a translation matrix
   * 创建平移矩阵
   */
  static translate(x: number | gpt.Point, y?: number): Matrix {
    if (typeof x === 'object') {
      return new Matrix(1, 0, 0, 1, x.x, x.y)
    }
    return new Matrix(1, 0, 0, 1, x, y!)
  }

  /**
   * Create a negative translation matrix
   * 创建负向平移矩阵
   */
  static translateNeg(x: number | gpt.Point, y?: number): Matrix {
    if (typeof x === 'object') {
      return new Matrix(1, 0, 0, 1, -x.x, -x.y)
    }
    return new Matrix(1, 0, 0, 1, -x, -y!)
  }

  /**
   * Create a scale matrix
   * 创建缩放矩阵
   */
  static scale(scale: gpt.Point | number, center?: gpt.Point): Matrix {
    let sx: number, sy: number

    if (typeof scale === 'number') {
      sx = sy = scale
    } else {
      sx = scale.x
      sy = scale.y
    }

    if (center) {
      const cx = center.x
      const cy = center.y
      return new Matrix(sx, 0, 0, sy, cx - cx * sx, cy - cy * sy)
    }

    return new Matrix(sx, 0, 0, sy, 0, 0)
  }

  /**
   * Create a rotation matrix
   * 创建旋转矩阵
   */
  static rotate(angle: number, point?: gpt.Point): Matrix {
    const a = mth.radians(angle)
    const c = mth.cos(a)
    const s = mth.sin(a)

    if (point) {
      const cx = point.x
      const cy = point.y
      const nx = -cx
      const ny = -cy
      const tx = c * nx - s * ny + cx
      const ty = s * nx + c * ny + cy
      return new Matrix(c, s, -s, c, tx, ty)
    }

    return new Matrix(c, s, -s, c, 0, 0)
  }

  /**
   * Create a skew matrix
   * 创建倾斜矩阵
   */
  static skew(angleX: number, angleY: number, point?: gpt.Point): Matrix {
    const m1 = mth.tan(mth.radians(angleX))
    const m2 = mth.tan(mth.radians(angleY))
    const skewMtx = new Matrix(1, m2, m1, 1, 0, 0)

    if (point) {
      return Matrix.multiply(
        Matrix.translate(point),
        skewMtx,
        Matrix.translate(new gpt.Point(-point.x, -point.y)),
      )
    }

    return skewMtx
  }

  /**
   * Apply rotation transformation
   * 应用旋转变换
   */
  rotate(angle: number, center?: gpt.Point): Matrix {
    return Matrix.multiply(this, Matrix.rotate(angle, center))
  }

  /**
   * Apply scale transformation
   * 应用缩放变换
   */
  scale(scale: gpt.Point | number, center?: gpt.Point): Matrix {
    return Matrix.multiply(this, Matrix.scale(scale, center))
  }

  /**
   * Apply translation transformation
   * 应用平移变换
   */
  translate(pt: gpt.Point | number, y?: number): Matrix {
    return Matrix.multiply(this, Matrix.translate(pt as any, y))
  }

  /**
   * Apply skew transformation
   * 应用倾斜变换
   */
  skew(angleX: number, angleY: number, p?: gpt.Point): Matrix {
    return Matrix.multiply(this, Matrix.skew(angleX, angleY, p))
  }

  /**
   * Compare this matrix with another matrix using a threshold
   * 使用阈值将此矩阵与另一个矩阵进行比较
   */
  equal(other: Matrix, threshold: number): boolean {
    const thEq = (a: number, b: number) => Math.abs(a - b) <= threshold
    return (
      thEq(this.a, other.a)
      && thEq(this.b, other.b)
      && thEq(this.c, other.c)
      && thEq(this.d, other.d)
      && thEq(this.e, other.e)
      && thEq(this.f, other.f)
    )
  }

  /**
   * Calculate determinant for the affine transform
   * 计算仿射变换的行列式
   */
  determinant(): number {
    return this.a * this.d - this.c * this.b
  }

  /**
   * Get the inverse of this affine transform
   * 获取此仿射变换的逆矩阵
   */
  inverse(): Matrix | null {
    const det = this.determinant()
    if (mth.almostZero(det)) {
      return null
    }

    const a = this.d / det
    const b = -this.b / det
    const c = -this.c / det
    const d = this.a / det
    const e = -(this.c * this.f - this.d * this.e) / det
    const f = -(this.b * this.e - this.a * this.f) / det

    return new Matrix(a, b, c, d, e, f)
  }

  /**
   * Round matrix values to 4 decimal places
   * 将矩阵值四舍五入到4位小数
   */
  round(): Matrix {
    return new Matrix(
      mth.precision(this.a, 4),
      mth.precision(this.b, 4),
      mth.precision(this.c, 4),
      mth.precision(this.d, 4),
      mth.precision(this.e, 4),
      mth.precision(this.f, 4),
    )
  }

  /**
   * Transform a point by this matrix
   * 通过此矩阵转换点
   */
  transformPoint(point: gpt.Point): gpt.Point {
    return point.transform(this)
  }

  /**
   * Transform a point around a center point
   * 围绕中心点转换点
   */
  transformPointCenter(point: gpt.Point, center: gpt.Point): gpt.Point {
    if (point && this && center) {
      return point.transform(
        Matrix.multiply(
          Matrix.translate(center),
          this,
          Matrix.translate(new gpt.Point(-center.x, -center.y)),
        ),
      )
    }
    return point
  }

  /**
   * Check if this matrix only represents translation (move)
   * 检查此矩阵是否只表示平移
   */
  isMove(): boolean {
    return (
      mth.almostZero(this.a - 1)
      && mth.almostZero(this.b)
      && mth.almostZero(this.c)
      && mth.almostZero(this.d - 1)
    )
  }

  /**
   * Convert matrix to string representation
   * 将矩阵转换为字符串表示
   */
  toMatrixString(): string {
    return `${this.a},${this.b},${this.c},${this.d},${this.e},${this.f},`
  }

  /**
   * Convert matrix to object representation
   * 将矩阵转换为对象表示
   */
  toObject(): Record<string, number> {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f,
    }
  }

  /**
   * Create matrix from string representation
   * 从字符串表示创建矩阵
   */
  static fromString(matrixStr: string): Matrix {
    const numberRegex = /[+-]?\d*(\.\d+)?(e[+-]?\d+)?/gi
    const matches = matrixStr.match(numberRegex) || []
    const params = matches
      .filter(m => m.length > 0)
      .map(m => parseFloat(m))
    return new Matrix(
      params[0],
      params[1],
      params[2],
      params[3],
      params[4],
      params[5],
    )
  }

  /**
   * Create matrix from object representation
   * 从对象表示创建矩阵
   */
  static fromObject(obj: Record<string, number>): Matrix {
    return new Matrix(obj.a, obj.b, obj.c, obj.d, obj.e, obj.f)
  }
}

// 导出工厂函数以保持与原始API的兼容性
export function matrix(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number): Matrix {
  if (a === undefined) {
    return Matrix.identity()
  }
  return new Matrix(a, b, c, d, e, f)
}

export const BASE_MATRIX = Matrix.identity()

export function isBase(v: any): boolean {
  return v === BASE_MATRIX
}
