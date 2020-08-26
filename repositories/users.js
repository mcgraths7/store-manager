/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const randomId = () => crypto.randomBytes(4).toString('hex');
const scrypt = util.promisify(crypto.scrypt);
const generatePasswordHash = (password, salt, keyLen) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  scrypt(password, salt, keyLen, (err, derivedKey) => derivedKey.toString('hex'));

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      }),
    );
  }

  async create(attrs) {
    const newAttrs = { ...attrs };
    newAttrs.id = randomId();

    const { password } = newAttrs;
    const salt = crypto.randomBytes(8).toString('hex');
    const hashBuffer = await generatePasswordHash(password, salt, 64);

    const record = {
      ...newAttrs,
      password: `${hashBuffer.toString('hex')}.${salt}`,
    };

    const records = await this.getAll();
    records.push(record);

    await this.writeAll(records);
    return record;
  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((r) => r.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (const record of records) {
      let found = true;

      for (const key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }
    }
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  async authenticate(savedPassword, suppliedPassword) {
    /* savedPassword is saved in the database in the format
       hashedPassword.salt
       suppliedPassword is the unmodified password we receive from the form
    */
    const [savedHash, savedSalt] = savedPassword.split('.');
    const suppliedHashBuffer = await generatePasswordHash(suppliedPassword, savedSalt, 64);
    return suppliedHashBuffer.toString('hex') === savedHash;
  }
}

module.exports = new UsersRepository('users.json');
