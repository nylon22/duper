const { handler } = require('../handler');
const {
  logESFailure,
  getFollowerCluster
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

describe('get-auto-follow', () => {

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

  it('logs success', async () => {
    const getAutoFollowMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        getAutoFollowPattern: getAutoFollowMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ auto_follow_pattern_name: 'products-*' });

    expect(getAutoFollowMock).toHaveBeenCalledTimes(1);

    expect(getAutoFollowMock.mock.calls[0][0]).toEqual({
      name: 'products-*',
    });

    expect(JSON.parse(consoleOutput[0])).toEqual({ acknowledged: true });
  });

  it('logs failure', async () => {
    const client = {
      ccr: {
        getAutoFollowPattern: jest.fn().mockRejectedValue(new Error('Get Auto Follow Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ auto_follow_pattern_name: 'products-*' });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Get Auto Follow Error');
  });
});
