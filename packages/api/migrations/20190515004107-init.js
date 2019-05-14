"use strict";

var dbm;
var type;
var seed;

const channels = [
  {
    name: "NET EMPREGOS",
    uri_logo: "http://www.net-empregos.com/images/logo_net3.png",
    auxData: {}
  },

  {
    name: "Sapo Emprego",
    uri_logo: "http://www.net-empregos.com/images/logo_net3.png",
    auxData: {}
  }
];

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async db => {
  // console.log(db)
  // JOB data
  try {
    let sqlString = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema z_jobs;
    
    CREATE TABLE job (
      id    UUID NOT NULL DEFAULT uuid_generate_v1(), 
      revision INTEGER NOT NULL CHECK (revision >= 0) default 0,
      title  text NOT NULL,
      salary_range numrange,

      address JSON NOT NULL,
      aux_data JSON NOT NULL,
      
      description text NOT NULL,
      status varchar(16) default 'NEW',

      logo JSON,
      attachments JSON,

      PRIMARY KEY (id, revision)
    );`;
    await db.runSql(sqlString);

    sqlString = `
        CREATE TABLE application (
          id    UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(), 
          image JSON,
          first_name text NOT NULL,
          last_name text NOT NULL,
          email varchar(255) NOT NULL,
          phone_number  varchar(127),
          facebook  varchar(256),
          linkedin  varchar(256),
          
          coverLetter text,
          cv JSON,

          address JSON NOT NULL,
          aux_data JSON NOT NULL,

          job 
        );
    `;
    await db.runSql(sqlString);

    sqlString = `
    CREATE TABLE channel (
      id    UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(), 
      name  text NOT NULL,

      uri_info varchar(512),
      uri_logo varchar(512),

      aux_data JSON NOT NULL
    );
  `;
    await db.runSql(sqlString);

    /* insert fake data */
    sqlString = `INSERT INTO job
    (name, uri, logo_uri, aux_data)
      VALUES( )
  `;

    /*   await db.runSql(`
    `); */
    return true;
  } catch (err) {
    console.log(err);
  }
  // appication data

  return true;
};

exports.down = async db => {
  let sqlString = `
    DROP TABLE IF EXISTS job
  `;
  await db.runSql(sqlString);

  sqlString = `
  DROP TABLE IF EXISTS application
`;
  await db.runSql(sqlString);

  sqlString = `
  DROP TABLE IF EXISTS channel
`;
  await db.runSql(sqlString);

  return true;
};

exports._meta = {
  version: 1
};
