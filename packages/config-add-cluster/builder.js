const builder = {
  url: { 
    alias: 'u',
    desc: 'The Elasticsearch endpoint to use.',
    type: 'string',
    demandOption: true,
  },
  name: { 
    alias: 'n',
    desc: 'The cluster name as defined by the cluster.name elasticsearch.yml setting for the cluster',
    type: 'string',
    demandOption: true,
  },
  role: { 
    alias: 'r',
    desc: 'The role for the Elasticsearch cluster',
    choices: ['leader', 'follower'],
  },
  overwrite: {
    desc: 'Set to true to overwrite an existing cluster in your duper configuration with the same name',
    type: 'boolean',
  },
  sslKey: { 
    desc: 'The file path to the private key to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires client certificate authentication.',
    type: 'string',
  },
  sslCert: {
    desc: 'The file path to the client certificate to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires client certificate authentication.',
    type: 'string',
  },
  sslCa: {
    desc: 'Certificate authorities to include in requests to the Elasticsearch cluster. Necessary only if the server uses a self-signed certificate.',
    type: 'array',
  },
  username: {
    desc: 'The Elastic user to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires Basic Auth.',
    type: 'string',
  },
  password: {
    desc: 'The Elastic password to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires Basic Auth.',
    type: 'string',
  },
  apiKey: { 
    desc: 'The Elastic API key to include in requests to the Elasticsearch cluster. Necessary only if the Elasticsearch cluster requires API Key authentication',
    type: 'string',
  },
  cloudId: {
    desc: 'The cloud id to use include in requests to the Elasticsearch cluster. Necessary only if you are using Elastic cloud',
    type: 'string',
  },
};

module.exports = { builder };
