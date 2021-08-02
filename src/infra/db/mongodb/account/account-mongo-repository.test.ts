import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection

const makeFakeAccountData = (): any => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const accessToken = 'accessToken'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(makeFakeAccountData())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(makeFakeAccountData().name)
      expect(account.email).toBe(makeFakeAccountData().email)
      expect(account.password).toBe(makeFakeAccountData().password)
    })
  })
  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(makeFakeAccountData())
      const account = await sut.loadByEmail(makeFakeAccountData().email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(makeFakeAccountData().name)
      expect(account.email).toBe(makeFakeAccountData().email)
      expect(account.password).toBe(makeFakeAccountData().password)
    })

    test('Should return null if loadByEmail failed', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(makeFakeAccountData().email)
      expect(account).toBeFalsy()
    })
  })
  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(makeFakeAccountData())
      const accountBeforeUpdate = await accountCollection.findOne(({ _id: res.insertedId }))
      expect(accountBeforeUpdate.accessToken).toBeFalsy()
      await sut.updateAccessToken(res.insertedId.toHexString(), accessToken)
      const account = await accountCollection.findOne({ _id: res.insertedId })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({ ...makeFakeAccountData(), accessToken: 'any_token' })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(makeFakeAccountData().name)
      expect(account.email).toBe(makeFakeAccountData().email)
      expect(account.password).toBe(makeFakeAccountData().password)
    })

    test('Should return an account on loadByToken with role success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({ ...makeFakeAccountData(), accessToken: 'any_token', role: 'any_role' })
      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(makeFakeAccountData().name)
      expect(account.email).toBe(makeFakeAccountData().email)
      expect(account.password).toBe(makeFakeAccountData().password)
    })
  })
})
