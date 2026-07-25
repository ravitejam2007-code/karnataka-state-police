'use strict';

/**
 * Executes a ZCQL query using Catalyst App instance
 * @param {object} app Catalyst App instance initialized with req
 * @param {string} zcqlString ZCQL query string
 * @returns {Promise<Array<object>>} Query results array
 */
async function queryZCQL(app, zcqlString) {
  if (!app || typeof app.zcql !== 'function') {
    throw new Error('Invalid Catalyst app instance provided to queryZCQL');
  }
  const zcqlService = app.zcql();
  const queryResult = await zcqlService.executeZCQLQuery(zcqlString);

  // ZCQL results are returned wrapped in table names: [{ TableName: { col1: val1, ... } }]
  // Un-nest the table wrapper for cleaner objects when possible
  if (Array.isArray(queryResult)) {
    return queryResult.map(row => {
      const keys = Object.keys(row);
      if (keys.length === 1 && typeof row[keys[0]] === 'object' && row[keys[0]] !== null) {
        return row[keys[0]];
      }
      // If joined tables return multiple keys, flatten into single object
      const flattened = {};
      for (const key of keys) {
        if (typeof row[key] === 'object' && row[key] !== null) {
          Object.assign(flattened, row[key]);
        } else {
          flattened[key] = row[key];
        }
      }
      return flattened;
    });
  }
  return [];
}

/**
 * Obtains Catalyst Data Store Table instance
 * @param {object} app Catalyst App instance
 * @param {string} tableName Data Store table name
 */
function getTable(app, tableName) {
  return app.datastore().getTable(tableName);
}

/**
 * Inserts a single record into a Data Store table
 * @param {object} app Catalyst App instance
 * @param {string} tableName Target table name
 * @param {object} data Record object to insert
 * @returns {Promise<object>} Inserted record object
 */
async function insertRow(app, tableName, data) {
  const table = getTable(app, tableName);
  const result = await table.insertRow(data);
  return result;
}

/**
 * Updates a single record in a Data Store table by rowId / ROWID
 * @param {object} app Catalyst App instance
 * @param {string} tableName Target table name
 * @param {string|number} rowId Record ROWID
 * @param {object} data Fields to update
 * @returns {Promise<object>} Updated record object
 */
async function updateRow(app, tableName, rowId, data) {
  const table = getTable(app, tableName);
  const rowData = Object.assign({}, data, { ROWID: rowId });
  const result = await table.updateRow(rowData);
  return result;
}

/**
 * Deletes a record from Data Store table by ROWID
 * @param {object} app Catalyst App instance
 * @param {string} tableName Target table name
 * @param {string|number} rowId Record ROWID
 * @returns {Promise<boolean>}
 */
async function deleteRow(app, tableName, rowId) {
  const table = getTable(app, tableName);
  await table.deleteRow(rowId);
  return true;
}

/**
 * Fetches a single record from Data Store by ROWID
 * @param {object} app Catalyst App instance
 * @param {string} tableName Target table name
 * @param {string|number} rowId Record ROWID
 * @returns {Promise<object>} Record object
 */
async function getRow(app, tableName, rowId) {
  const table = getTable(app, tableName);
  const result = await table.getRow(rowId);
  return result;
}

module.exports = {
  queryZCQL,
  getTable,
  insertRow,
  updateRow,
  deleteRow,
  getRow
};
