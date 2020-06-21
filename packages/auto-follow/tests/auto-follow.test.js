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
getValidatedArguments.mockReturnValue({ leader_index_patterns: ['dogs-*', 'cats-*' ] });

describe('auto-follow', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs success', async () => {
    const putAutoFollowPatternMock = jest.fn().mockResolvedValue({ body: { acknowledged: true } });
    const client = {
      ccr: {
        putAutoFollowPattern: putAutoFollowPatternMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ auto_follow_pattern_name: 'my_auto_follow_pattern', verbose: true, leader_index_patterns: ['dogs-*', 'cats-*' ] });

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
    const client = {
      ccr: {
        putAutoFollowPattern: jest.fn().mockRejectedValue(new Error('Auto Follow Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ auto_follow_pattern_name: 'my_auto_follow_pattern', verbose: true, leader_index_patterns: ['dogs-*', 'cats-*' ] });

    expect(logESFailure).toHaveBeenCalledTimes(1);
    expect(logESFailure.mock.calls[0][0].error.message).toBe('Auto Follow Error');
  });
});
