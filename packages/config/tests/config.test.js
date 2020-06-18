const { handler } = require('../handler');
const YAML = require('yaml');
const {
  getConfigurationFile,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

describe('config', () => {

  const originalLog = console.log;
  let consoleOutput;
  const mockedLog = output => consoleOutput.push(output);

  afterEach(() => {
    jest.clearAllMocks();
    console.log = originalLog;
  });

  beforeEach(() => {
    console.log = mockedLog;
    consoleOutput = [];
  });

  it('writes config to stdout', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }] });

    await handler({ url: 'http://localhost:9200', name: 'us-cluster' });

    expect(consoleOutput.length).toBe(1);
    expect(YAML.parse(consoleOutput[0])).toEqual({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }] });
  });
});
