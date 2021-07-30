import bcrypt from 'bcrypt'
import { HashComparer, Hasher } from '../../../data/protocols/criptography'
export class BcryptAdapter implements Hasher, HashComparer {
  constructor (
    private readonly salt: number
  ) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hash)
    return isEqual
  }
}
