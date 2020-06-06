const { Client } = require('@elastic/elasticsearch');
const { handler } = require('../handler');
const {
  logESFailure,
  getFollowerCluster
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getFollowerCluster.mockResolvedValue({ url: 'http://localhost:9200', name: 'japan-cluster' });

describe('get-auto-follow', () => {

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

  it('logs success', async () => {
    const getAutoFollowMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    Client.mockImplementation(() => {
      return {
        ccr: {
          getAutoFollowPattern: getAutoFollowMock,
        }
      };
    });

    await handler({ auto_follow_pattern_name: 'products-*' });

    expect(getAutoFollowMock).toHaveBeenCalledTimes(1);

    expect(getAutoFollowMock.mock.calls[0][0]).toEqual({
      name: 'products-*',
    });

    expect(JSON.parse(consoleOutput[0])).toEqual({ acknowledged: true });
  });

  it('logs failure', async () => {
    Client.mockImplementation(() => {
      return {
        ccr: {
          getAutoFollowPattern: jest.fn().mockRejectedValue(new Error('Get Auto Follow Error')),
        }
      };
    });

    await handler({ auto_follow_pattern_name: 'products-*' });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Get Auto Follow Error');
  });
});
