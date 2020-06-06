const { Client } = require('@elastic/elasticsearch');
const { handler } = require('../handler');
const {
  logESFailure,
  getFollowerCluster
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getFollowerCluster.mockResolvedValue({ url: 'http://localhost:9200', name: 'japan-cluster' });

describe('info', () => {

  const originalLog = console.log;
  let consoleOutput = [];
  const mockedLog = output => consoleOutput.push(output);

  afterEach(() => {
    jest.clearAllMocks();
    console.log = originalLog;
  });

  beforeEach(() => {
    Client.mockClear();
    console.log = mockedLog;
  });

  it('logs success for empty index argument', async () => {
    const followInfoMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    Client.mockImplementation(() => {
      return {
        ccr: {
          followInfo: followInfoMock,
        }
      };
    });

    await handler({ index: [] });

    expect(followInfoMock).toHaveBeenCalledTimes(1);

    expect(followInfoMock.mock.calls[0][0]).toEqual({
      index: '_all',
    });

    expect(JSON.parse(consoleOutput[0])).toEqual({ acknowledged: true });
  });

  it('logs success for non-empty index argument', async () => {
    const followInfoMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    Client.mockImplementation(() => {
      return {
        ccr: {
          followInfo: followInfoMock,
        }
      };
    });

    await handler({ index: ['houndstooth-*', 'stripes-*'] });

    expect(followInfoMock).toHaveBeenCalledTimes(1);

    expect(followInfoMock.mock.calls[0][0]).toEqual({
      index: 'houndstooth-*,stripes-*',
    });

    expect(JSON.parse(consoleOutput[0])).toEqual({ acknowledged: true });
  });

  it('logs failure', async () => {
    Client.mockImplementation(() => {
      return {
        ccr: {
          followInfo: jest.fn().mockRejectedValue(new Error('Info Error')),
        }
      };
    });

    await handler({ auto_follow_pattern_name: 'products-*' });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Info Error');
  });
});
