/* eslint-disable no-restricted-syntax */
const fs = require('fs');

const fsPromises = fs.promises;

class Repository {
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
      await fsPromises.readFile(this.filename, {
        encoding: 'utf-8',
      }),
    );
  }

  async writeAll(records) {
    await fsPromises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  async getOne(id) {
    const records = await this.getall();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = this.getAll();
    const record = this.getOne(id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    const newRecord = {
      ...record,
      attrs,
    };
    await this.writeAll({
      ...records,
      newRecord,
    });
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
    return '';
  }
}

module.exports = Repository;
