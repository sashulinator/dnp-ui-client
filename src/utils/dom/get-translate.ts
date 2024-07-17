// https://stackforgeeks.com/blog/how-to-get-value-translatex-by-javascript
import { XY } from '../core'

/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */
export function getTranslate(element: Element): XY & { z: number } {
  const style = window.getComputedStyle(element)
  const matrix = style['transform'] || (style as any).webkitTransform || (style as any).mozTransform

  // If there is no transform property, return 0 values
  if (matrix === 'none' || typeof matrix === 'undefined') {
    return {
      x: 0,
      y: 0,
      z: 0,
    }
  }

  // Determine if it's a 2D or 3D transform
  const matrixType = matrix.includes('3d') ? '3d' : '2d'
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

  // Extract translate values based on the matrix type
  if (matrixType === '2d') {
    return {
      x: matrixValues[4] || 0,
      y: matrixValues[5] || 0,
      z: 0,
    }
  } else if (matrixType === '3d') {
    return {
      x: matrixValues[12] || 0,
      y: matrixValues[13] || 0,
      z: matrixValues[14] || 0,
    }
  }

  return {
    x: 0,
    y: 0,
    z: 0,
  }
}
