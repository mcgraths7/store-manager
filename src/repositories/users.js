/* eslint-disable no-restricted-syntax */
const crypto = require('crypto');
const util = require('util');

const Repository = require('./repository');

const randomId = () => crypto.randomBytes(4).toString('hex');
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    const newAttrs = { ...attrs };
    newAttrs.id = randomId();

    const { password } = newAttrs;
    const salt = crypto.randomBytes(8).toString('hex');
    const hashBuffer = await scrypt(password, salt, 64);
    const passwordHash = hashBuffer.toString('hex');

    const record = {
      ...newAttrs,
      password: `${passwordHash}.${salt}`,
    };

    const records = await super.getAll();
    records.push(record);

    await super.writeAll(records);
    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async authenticate(savedPassword, suppliedPassword) {
    /* savedPassword is saved in the database in the format
       hashedPassword.salt
       suppliedPassword is the unmodified password we receive from the form
    */
    const [savedHash, savedSalt] = savedPassword.split('.');
    const suppliedHashBuffer = await scrypt(suppliedPassword, savedSalt, 64);
    const suppliedPasswordHash = suppliedHashBuffer.toString('hex');
    return suppliedPasswordHash === savedHash;
  }
}

module.exports = new UsersRepository('users.json');
