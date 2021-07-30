import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-accounts-protocols'
import { EmailInUseError } from '../../../domain/errors'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { password, email } = accountData
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      throw new EmailInUseError()
    }

    const hashedPassword = await this.hasher.hash(password)
    return await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
  }
}
