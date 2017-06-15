import request from 'request-promise';

/*
 * This example is a language dependent API connector for a fake service.
 * All names have a "pretty" version so the connector can be loaded by an integration platform and display user-friendly inputs/outputs/names.
 * The goal is to support several use cases:
 *    - Various auth schemes (oauth/api keys/etc.)
 *    - Support typical trigger & action systems like Zapier and Workato
 *    - Support the possibility of 1 click one-way and two-way syncing for systems like Piesync
 *    - Support standardization of object types to allow automatic mapping between services and custom fields
 *
 * It is up to the creator of the connector how much they want to implement. Most companies would want to implement a few
 * triggers and actions, but a company might be interested in making their API "two-way" compliant for several objects
 *
 * I realize this spec is low level. The goal here is to provide maximum flexibility to create DEEP integrations,
 * Not just topical stuff.
 *
 * A possible simplification is to create a higher level API to automate authentication. see workato connector SDK for details.
 * https://github.com/workato/connector_sdk/blob/master/api_key_auth/gender_api_connector.rb
 *
 **/


const Metadata = {
  serviceName: "example",
  prettyServiceName: "Example Service"
}

/**
 * these are private functions which implement the logic of calling your API.
 * The Methods object is just a helper used to reduce code duplication.
 */
const Methods = {
  // a special method to test the connection params
  test: {
    execute: (connection, inputs) => { return true; }
  },
  createLead: {
    execute: (connection, inputs) => {
      // TODO call the api. (also the auth scheme needs to be implemented.)
      let url = `${connection.subdomain}.myexampleapi.com`;
      return request.post(url, { email: inputs.email }).then((res) => {
        return {
          lead: res.lead
        }
      });
    },
    inputs: [
      {
        name: 'email',
        prettyName: 'Email Address',
        type: 'string',
        optional: false,
      }
    ],
    outputs: [
      {
        name: 'lead',
        prettyName: 'The lead object which was created',
        type: 'Lead',
      }
    ]
  }
  getRecentlyCreatedLeads: {
    execute: (connection, inputs) => {
      // TODO call the API to get recently created leads
      let leadList = [];
      return {leadList};
    },
    inputs: [],
    outputs: [
      {
        name: 'lead',
        prettyName: 'A recently created lead object',
        type: 'Lead',
      }
    ]
  },
}

const Connection = {
  fields: [
    {
      name: 'key',
      prettyName: 'Your API Key',
      optional: false
    },
    {
      name: 'subdomain',
      prettyName: 'Your subdomain on our api (yourcompany.example.com)',
      optional: false
    },
  ],
  test: Methods.test
}

/*
 * Actions are publicly available
 */
const Actions = {
  createLead: {
    prettyName: 'Create Lead',
    description: 'Create a lead in example service',
    method: Methods.createLead,
  }

}


const Triggers = {
  newLead: {
    pretty_name: 'New Lead',
    type: 'polling',
    method: Methods.getRecentLeads,
  }
}


/*
 * High level object types that we can use to interact with the API
 * */
const Objects = {
  Lead: {
    /* [OPTIONAL] */
    standardizedName: 'opensync.crmLead',

    /* [REQUIRED] */
    fields: [
      {
        unique: true
        name: 'id',
        prettyName: 'ID',
        type: 'string',
        optional: false,
      },
      {
        name: 'email',
        prettyName: 'Email Address',
        type: 'string',
        optional: false,
      },
    ],

    /*
     * [OPTIONAL]
     * if we standardized CRUD functions, we could implement automatic 2-way syncing (or even 1 way syncing) without users having to create recipes
     */
    getById: Methods.getLead,
    create: Methods.createLead,
    update: Methods.updateLead,
    getRecentlyUpdated: Methods.getRecentlyUpdatedLeads,
    getRecentlyCreated: Methods.getRecentlyCreatedLeads,

    /*
     * [OPTIONAL]
     * if we standardize objects and create automatic mapping functions (think custom fields, etc.), we can auto-map fields and create 1 click integrations
     */
    convertToStandardized: (lead) => {
      return {
        emailAddress: lead.email,
      }
    }
    convertFromStandardized: (standardizedLead) => {
      return {
        email: lead.emailAddress,
      }
    }
  },
}

module.exports = { Objects, Triggers, Actions, Connection }
