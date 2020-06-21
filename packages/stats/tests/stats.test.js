const { handler } = require('../handler');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getLeaderCluster.mockResolvedValue({ url: 'http://localhost:8200', name: 'us-cluster' });

describe('stats', () => {

  const originalLog = console.log;
  let consoleOutput = [];
  const mockedLog = output => consoleOutput.push(output);

  afterEach(() => {
    jest.clearAllMocks();
    console.log = originalLog;
  });

  beforeEach(() => {
    console.log = mockedLog;
  });

  it('logs success for shard level stats for all indices', async () => {
    const followStatsMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        followStats: followStatsMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ level: 'shard' });

    expect(followStatsMock).toHaveBeenCalledTimes(1);
    expect(followStatsMock.mock.calls[0][0]).toEqual({
      index: '_all',
    });
    expect(JSON.parse(consoleOutput[0])).toEqual({ acknowledged: true });
  });

  it('logs success for shard level stats for specified indices', async () => {
    const followStatsMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        followStats: followStatsMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ index: ['one', 'two'], level: 'shard' });

    expect(followStatsMock).toHaveBeenCalledTimes(1);
    expect(followStatsMock.mock.calls[0][0]).toEqual({
      index: 'one,two',
    });

    expect(JSON.parse(consoleOutput[0])).toEqual({ acknowledged: true });
  });

  it('logs success for cluster level stats', async () => {
    const statsMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        stats: statsMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ level: 'cluster' });

    expect(statsMock).toHaveBeenCalledTimes(1);

    expect(JSON.parse(consoleOutput[0])).toEqual({ acknowledged: true });
  });

  it('logs failure', async () => {
    const client = {
      ccr: {
        stats: jest.fn().mockRejectedValue(new Error('Stats Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ level: 'cluster'});

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Stats Error');
  });
});
