const fs = require('fs');
const sysPath = require('path');
const globby = require('globby');
const YAML = require('yaml');

const UTILS = require('../utils');

jest.mock('fs');
jest.mock('path');
jest.mock('globby');
jest.mock('yaml');
jest.mock('process');

describe('utils', () => {

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

  describe('getConfigurationFile', () => {
    it('returns empty object for no config', async () => {
      sysPath.join = jest.fn();
      globby.mockResolvedValue([]);

      const configurationFile = await UTILS.getConfigurationFile();
      expect(configurationFile).toEqual({});
    });

    it('returns parsed config', async () => {
      sysPath.join.mockReturnValue('/Users/nylon22/.duperrc.yml');
      globby.mockResolvedValue(['file1']);
      fs.readFileSync = jest.fn();
      YAML.parse.mockResolvedValue({ clusters: [{ url: 'http://localhost:9200', name: 'us-cluster' }] });

      const configurationFile = await UTILS.getConfigurationFile();
      expect(configurationFile).toEqual({ clusters: [{ url: 'http://localhost:9200', name: 'us-cluster' }] });
    });
  });

  describe('getLeaderCluster', () => {
    it('throws for missing leader cluster', async () => {
      sysPath.join.mockReturnValue('/Users/nylon22/.duperrc.yml');
      globby.mockResolvedValue(['file1']);
      fs.readFileSync = jest.fn();
      YAML.parse.mockResolvedValue({ clusters: [{ url: 'http://localhost:9200', name: 'japan-cluster' }], followerCluster: 'japan-cluster'});

      const failHandler = async function() {
        await UTILS.getLeaderCluster();
      };

      expect(failHandler()).rejects.toEqual(new Error('Leader cluster is not defined. You can set the leader cluster by running "duper config set-leader-cluster"'));
    });

    it('returns leader cluster', async () => {
      sysPath.join.mockReturnValue('/Users/nylon22/.duperrc.yml');
      globby.mockResolvedValue(['file1']);
      fs.readFileSync = jest.fn();
      YAML.parse.mockResolvedValue({ clusters: [{ url: 'http://localhost:9200', name: 'us-cluster' }], leaderCluster: 'us-cluster'});

      const leader = await UTILS.getLeaderCluster();

      expect(leader).toEqual({ url: 'http://localhost:9200', name: 'us-cluster' });
    });
  });

  describe('getFollowerCluster', () => {
    it('throws for missing follower cluster', () => {
      sysPath.join.mockReturnValue('/Users/nylon22/.duperrc.yml');
      globby.mockResolvedValue(['file1']);
      fs.readFileSync = jest.fn();
      YAML.parse.mockResolvedValue({ clusters: [{ url: 'http://localhost:9200', name: 'us-cluster' }], leaderCluster: 'us-cluster'});

      const failHandler = async function() {
        await UTILS.getFollowerCluster();
      };

      expect(failHandler()).rejects.toEqual(new Error('Follower cluster is not defined. You can set the follower cluster by running "duper config set-follower-cluster"'));
    });

    it('returns follower cluster', async () => {
      sysPath.join.mockReturnValue('/Users/nylon22/.duperrc.yml');
      globby.mockResolvedValue(['file1']);
      fs.readFileSync = jest.fn();
      YAML.parse.mockResolvedValue({ clusters: [{ url: 'http://localhost:9200', name: 'japan-cluster' }], followerCluster: 'japan-cluster'});

      const follower = await UTILS.getFollowerCluster();

      expect(follower).toEqual({ url: 'http://localhost:9200', name: 'japan-cluster' });
    });
  });

  describe('writeConfigurationFile', () => {
    it('writes configuration file', async () => {
      process.chdir = jest.fn();
      fs.writeFileSync = jest.fn();

      await UTILS.writeConfigurationFile({ config : { clusters: [{ url: 'http://localhost:9200', name: 'us-cluster' }], leaderCluster: 'us-cluster' } });

      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });
  });

  describe('logESSuccess', () => {
    it('logs message', () => {
      UTILS.logESSuccess({ message: 'success message', response: {}, verbose: false });

      expect(consoleOutput.length).toBe(1);
      expect(consoleOutput[0]).toContain('success message');
    });

    it('logs verbose message', () => {
      UTILS.logESSuccess({ message: 'success message', response: { foo: 'bar' }, verbose: true });

      expect(consoleOutput.length).toBe(3);
      expect(consoleOutput[0]).toContain('success message');
      expect(consoleOutput[1]).toBe('\nElasticsearch Response\n');
      expect(JSON.parse(consoleOutput[2])).toEqual({ foo: 'bar' });
    });
  });

  describe('logESFailure', () => {
    it('handles ES failure', () => {
      UTILS.logESFailure({ error: { meta: { statusCode: 400, body: { error: 'Bad Request' } } } } );

      expect(consoleOutput.length).toBe(3);
      expect(consoleOutput[0]).toContain('Status Code: 400');
      expect(consoleOutput[1]).toBe('\nError Detail:\n');
      expect(consoleOutput[2]).toBe('Bad Request');
    });

    it('handles non-ES failure', () => {
      UTILS.logESFailure({ error: new Error('Random Error') });

      expect(consoleOutput.length).toBe(1);
      expect(consoleOutput[0]).toEqual(new Error('Random Error'));
    });
  });

  describe('log', () => {
    it('handles non-verbose log', () => {
      UTILS.log({ message: 'log message', verbose: false, verboseMessage: null, color: 'green' });

      expect(consoleOutput.length).toBe(1);
      expect(consoleOutput[0]).toContain('log message');
    });

    it('handles verbose log', () => {
      UTILS.log({ message: 'log message', verbose: true, verboseMessage: 'moar logs', color: 'green' });

      expect(consoleOutput.length).toBe(2);
      expect(consoleOutput[0]).toContain('log message');
      expect(consoleOutput[1]).toBe('\nmoar logs');
    });
  });

  describe('getValidatedArguments', () => {
    it('returns only validated arguments', () => {
      const builder = {
        foo: { alias: 'f' },
      };

      const args = { 
        foo: 'bar',
        baz: 'val',
      };

      const validated = UTILS.getValidatedArguments({ builder, args });

      expect(validated).toEqual({ foo: 'bar' });
    });
  });
});
