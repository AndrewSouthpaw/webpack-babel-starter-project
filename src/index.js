
import { subtract } from './subtract'
import './index.scss'

const add = (a = 1, b = 2) => {
  return a + b
}

console.log('add(1, 2)', add(1, 2))
console.log('subtract(8, 2)', subtract(8, 2))
