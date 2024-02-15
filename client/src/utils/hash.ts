import { SHA256, enc } from 'crypto-js'

export const hashString = (input: string) => SHA256(input).toString(enc.Hex)