export * from './form'

const stringSet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const randomInt = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1))

const randomSequence = (len: number, list: string | []) => {
  if (len <= 1) {
    len = 1
  }
  let s = ''
  let n = list.length
  if (typeof list === 'string') {
    while (len-- > 0) {
      s += list.charAt(Math.random() * n)
    }
  } else if (list instanceof Array) {
    while (len-- > 0) {
      s += list[Math.floor(Math.random() * n)]
    }
  }
  return s
}

export const generateEmail = () =>
  randomSequence(randomInt(8, 12), stringSet) + '@sytech.com'
