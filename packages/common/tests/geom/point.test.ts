import { describe, expect, it } from 'vitest'
import { Point } from '../../src/geom/point'
import * as mth from '../../src/math'

describe('point operations', () => {
  describe('add-points', () => {
    it('should add two points correctly', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 3)
      const rs = p1.add(p2)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(3, rs.x)).toBe(true)
      expect(mth.close(5, rs.y)).toBe(true)
    })
  })

  describe('substract-points', () => {
    it('should subtract two points correctly', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 3)
      const rs = p1.subtract(p2)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(-1, rs.x)).toBe(true)
      expect(mth.close(-1, rs.y)).toBe(true)
    })
  })

  describe('multiply-points', () => {
    it('should multiply two points correctly', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 3)
      const rs = p1.multiply(p2)
      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(2, rs.x)).toBe(true)
      expect(mth.close(6, rs.y)).toBe(true)
    })
  })

  describe('divide-points', () => {
    it('should divide two points correctly', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 5)
      const rs = p1.divide(p2)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(0.5, rs.x)).toBe(true)
      expect(mth.close(0.4, rs.y)).toBe(true)
    })
  })

  describe('min-point', () => {
    it('should return undefined when no points provided', () => {
      const rs = Point.min()
      expect(rs).toBeUndefined()
    })

    it('should return the single point', () => {
      const p1 = new Point(1, 2)
      const rs = Point.min(p1)
      expect(rs.close(p1)).toBe(true)
    })

    it('should handle null values', () => {
      const p1 = new Point(1, 2)
      const rs1 = Point.min(undefined, p1)
      expect(rs1.close(p1)).toBe(true)

      const rs2 = Point.min(p1)
      expect(rs2.close(p1)).toBe(true)
    })

    it('should return the minimum point', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 5)
      const rs1 = Point.min(p1, p2)
      expect(rs1.close(p1)).toBe(true)

      const rs2 = Point.min(p2, p1)
      expect(rs2.close(p1)).toBe(true)
    })
  })

  describe('max-point', () => {
    it('should return undefined when no points provided', () => {
      const rs = Point.max()
      expect(rs).toBeUndefined()
    })

    it('should return the single point', () => {
      const p1 = new Point(1, 2)
      const rs = Point.max(p1)
      expect(rs.close(p1)).toBe(true)
    })

    it('should handle null values', () => {
      const p1 = new Point(1, 2)
      const rs1 = Point.max(undefined, p1)
      expect(rs1.close(p1)).toBe(true)

      const rs2 = Point.max(p1)
      expect(rs2.close(p1)).toBe(true)
    })

    it('should return the maximum point', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 5)
      const rs1 = Point.max(p1, p2)
      expect(rs1.close(p2)).toBe(true)

      const rs2 = Point.max(p2, p1)
      expect(rs2.close(p2)).toBe(true)
    })
  })

  describe('inverse-point', () => {
    it('should inverse a point correctly', () => {
      const p1 = new Point(1, 2)
      const rs = p1.inverse()

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(1, rs.x)).toBe(true)
      expect(mth.close(0.5, rs.y)).toBe(true)
    })
  })

  describe('negate-point', () => {
    it('should negate a point correctly', () => {
      const p1 = new Point(1, 2)
      const rs = p1.negate()

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(-1, rs.x)).toBe(true)
      expect(mth.close(-2, rs.y)).toBe(true)
    })
  })

  describe('distance-between-two-points', () => {
    it('should calculate distance between two points', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(4, 6)
      const rs = p2.distance(p1)

      expect(typeof rs).toBe('number')
      expect(mth.close(5, rs)).toBe(true)
    })
  })

  describe('distance-vector-between-two-points', () => {
    it('should calculate distance vector between two points', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 3)
      const rs = p1.distanceVector(p2)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(1, rs.x)).toBe(true)
      expect(mth.close(1, rs.y)).toBe(true)
    })
  })

  describe('point-length', () => {
    it('should calculate point length', () => {
      const p1 = new Point(1, 10)
      const rs = p1.length()

      expect(typeof rs).toBe('number')
      expect(mth.close(10.04987562112089, rs)).toBe(true)
    })
  })

  describe('point-angle-1', () => {
    it('should calculate angle for a single point', () => {
      const p1 = new Point(1, 3)
      const rs = p1.angle()

      expect(typeof rs).toBe('number')
      expect(mth.close(71.56505117707799, rs)).toBe(true)
    })
  })

  describe('point-angle-2', () => {
    it('should calculate angle between two points', () => {
      const p1 = new Point(1, 3)
      const p2 = new Point(2, 4)
      const rs = p1.angle(p2)

      expect(typeof rs).toBe('number')
      expect(mth.close(-135, rs)).toBe(true)
    })
  })

  describe('point-angle-with-other', () => {
    it('should calculate angle with other point', () => {
      const p1 = new Point(1, 3)
      const p2 = new Point(1, 5)
      const rs = p1.angleWithOther(p2)

      expect(typeof rs).toBe('number')
      expect(mth.close(7.125016348901757, rs)).toBe(true)
    })
  })

  describe('point-angle-sign', () => {
    it('should return positive angle sign', () => {
      const p1 = new Point(1, 3)
      const p2 = new Point(1, 5)
      const rs = p1.angleSign(p2)

      expect(typeof rs).toBe('number')
      expect(mth.close(1, rs)).toBe(true)
    })

    it('should return negative angle sign', () => {
      const p1 = new Point(-11, -3)
      const p2 = new Point(1, 5)
      const rs = p1.angleSign(p2)

      expect(typeof rs).toBe('number')
      expect(mth.close(-1, rs)).toBe(true)
    })
  })

  describe('update-angle', () => {
    it('should update point angle', () => {
      const p1 = new Point(1, 3)
      const rs = p1.updateAngle(10)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(3.1142355569111246, rs.x)).toBe(true)
      expect(mth.close(0.5491237529650835, rs.y)).toBe(true)
    })
  })

  describe('point-quadrant', () => {
    it('should return quadrant 1', () => {
      const p1 = new Point(1, 3)
      const rs = p1.quadrant()
      expect(typeof rs).toBe('number')
      expect(mth.close(1, rs)).toBe(true)
    })

    it('should return quadrant 4', () => {
      const p1 = new Point(1, -3)
      const rs = p1.quadrant()

      expect(typeof rs).toBe('number')
      expect(mth.close(4, rs)).toBe(true)
    })

    it('should return quadrant 2', () => {
      const p1 = new Point(-1, 3)
      const rs = p1.quadrant()

      expect(typeof rs).toBe('number')
      expect(mth.close(2, rs)).toBe(true)
    })

    it('should return quadrant 3', () => {
      const p1 = new Point(-1, -3)
      const rs = p1.quadrant()

      expect(typeof rs).toBe('number')
      expect(mth.close(3, rs)).toBe(true)
    })
  })

  describe('round-point', () => {
    it('should round point to nearest integer', () => {
      const p1 = new Point(1.34567, 3.34567)
      const rs = p1.round()

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(1, rs.x)).toBe(true)
      expect(mth.close(3, rs.y)).toBe(true)
    })

    it('should round point to 2 decimal places', () => {
      const p1 = new Point(1.34567, 3.34567)
      const rs = p1.round(2)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(1.35, rs.x)).toBe(true)
      expect(mth.close(3.35, rs.y)).toBe(true)
    })
  })

  describe('half-round-point', () => {
    it('should round point with step 0.5', () => {
      const p1 = new Point(1.34567, 3.34567)
      const rs = p1.roundStep(0.5)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(1.5, rs.x)).toBe(true)
      expect(mth.close(3.5, rs.y)).toBe(true)
    })
  })

  describe('scale-point', () => {
    it('should scale a point', () => {
      const p1 = new Point(1.5, 3)
      const rs = p1.scale(2)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(3, rs.x)).toBe(true)
      expect(mth.close(6, rs.y)).toBe(true)
    })
  })

  describe('dot-point', () => {
    it('should calculate dot product of two points', () => {
      const p1 = new Point(1.5, 3)
      const p2 = new Point(2, 6)
      const rs = p1.dot(p2)

      expect(typeof rs).toBe('number')
      expect(mth.close(21, rs)).toBe(true)
    })
  })

  describe('unit-point', () => {
    it('should calculate unit vector of a point', () => {
      const p1 = new Point(2, 3)
      const rs = p1.unit()

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(0.5547001962252291, rs.x)).toBe(true)
      expect(mth.close(0.8320502943378437, rs.y)).toBe(true)
    })
  })

  describe('project-point', () => {
    it('should project a point onto another', () => {
      const p1 = new Point(1, 3)
      const p2 = new Point(1, 6)
      const rs = p1.project(p2)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(0.5135135135135135, rs.x)).toBe(true)
      expect(mth.close(3.081081081081081, rs.y)).toBe(true)
    })
  })

  describe('center-points', () => {
    it('should calculate center of multiple points', () => {
      const points = [
        new Point(0.5, 0.5),
        new Point(-1, -2),
        new Point(20, 65.2),
        new Point(12, -10),
      ]
      const rs = Point.centerPoints(points)

      expect(mth.close(7.875, rs.x)).toBe(true)
      expect(mth.close(13.425, rs.y)).toBe(true)
    })
  })

  describe('normal-left-point', () => {
    it('should calculate left normal of a point', () => {
      const p1 = new Point(2, 3)
      const rs = p1.normalLeft()

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(-0.8320502943378437, rs.x)).toBe(true)
      expect(mth.close(0.5547001962252291, rs.y)).toBe(true)
    })
  })

  describe('normal-right-point', () => {
    it('should calculate right normal of a point', () => {
      const p1 = new Point(2, 3)
      const rs = p1.normalRight()

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(0.8320502943378437, rs.x)).toBe(true)
      expect(mth.close(-0.5547001962252291, rs.y)).toBe(true)
    })
  })

  describe('point-line-distance', () => {
    it('should calculate distance from point to line', () => {
      const p1 = new Point(2, -3)
      const p2 = new Point(-1, 4)
      const p3 = new Point(5, 6)
      const rs = p1.pointLineDistance(p2, p3)

      expect(typeof rs).toBe('number')
      expect(mth.close(7.58946638440411, rs)).toBe(true)
    })
  })

  describe('almost-zero-predicate', () => {
    it('should identify almost zero point', () => {
      const p1 = new Point(0.000001, 0.0000002)
      const p2 = new Point(0.001, -0.0003)

      expect(p1.almostZero()).toBe(true)
      expect(p2.almostZero()).toBe(false)
    })
  })

  describe('lerp-point', () => {
    it('should interpolate between two points', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 3)
      const rs = p1.lerp(p2, 2)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(3, rs.x)).toBe(true)
      expect(mth.close(4, rs.y)).toBe(true)
    })
  })

  describe('rotate-point', () => {
    it('should rotate a point around another point', () => {
      const p1 = new Point(1, 2)
      const p2 = new Point(2, 3)
      const rs = p1.rotate(p2, 11)

      expect(Point.isPoint(rs)).toBe(true)
      expect(mth.close(1.2091818119288809, rs.x)).toBe(true)
      expect(mth.close(1.8275638211757912, rs.y)).toBe(true)
    })
  })
})
