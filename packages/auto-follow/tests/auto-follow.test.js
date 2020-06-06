const { Client } = require('@elastic/elasticsearch');
const { handler } = require('../handler');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getLeaderCluster.mockResolvedValue({ url: 'http://localhost:8200', name: 'us-cluster' });
getFollowerCluster.mockResolvedValue({ url: 'http://localhost:9200', name: 'japan-cluster' });
getValidatedArguments.mockReturnValue({ leader_index_patterns: ['dogs-*', 'cats-*' ] });


describe('auto-follow', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    Client.mockClear();
  });

  it('logs success', async () => {
    const putAutoFollowPatternMock = jest.fn().mockResolvedValue({ body: { acknowledged: true } });
    Client.mockImplementation(() => {
      return {
        ccr: {
          putAutoFollowPattern: putAutoFollowPatternMock,
        }
      };
    }),

    await handler({ auto_follow_pattern_name: 'my_auto_follow_pattern', verbose: true, leader_index_patterns: ['dogs-*', 'cats-*' ] });

    expect(Client).toHaveBeenCalledTimes(1);

    expect(putAutoFollowPatternMock).toHaveBeenCalledTimes(1);
    const arg = putAutoFollowPatternMock.mock.calls[0][0];
    expect(arg).toEqual({
      name: 'my_auto_follow_pattern',
      body: {
        remote_cluster: 'us-cluster',
        leader_index_patterns: ['dogs-*', 'cats-*' ]
      }
    });

    expect(logESSuccess).toHaveBeenCalledTimes(1);
    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully auto-followed "dogs-*, cats-*"',
      response: { acknowledged: true },
      verbose: true
    });
  });

  it('logs failure', async () => {
    Client.mockImplementation(() => {
      return {
        ccr: {
          putAutoFollowPattern: jest.fn().mockRejectedValue(new Error('Auto Follow Error')),
        }
      };
    });

    await handler({ auto_follow_pattern_name: 'my_auto_follow_pattern', verbose: true, leader_index_patterns: ['dogs-*', 'cats-*' ] });

    expect(logESFailure).toHaveBeenCalledTimes(1);
    expect(logESFailure.mock.calls[0][0].error.message).toBe('Auto Follow Error');
  });
});
