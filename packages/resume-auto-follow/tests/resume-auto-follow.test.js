const { handler } = require('../handler');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getLeaderCluster.mockResolvedValue({ url: 'http://localhost:8200', name: 'us-cluster' });

describe('resume-auto-follow', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs success', async () => {
    const resumeAutoFollowMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        resumeAutoFollowPattern: resumeAutoFollowMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ auto_follow_pattern_name: 'products', verbose: true });

    expect(resumeAutoFollowMock).toHaveBeenCalledTimes(1);
    expect(logESSuccess).toHaveBeenCalledTimes(1);

    expect(resumeAutoFollowMock.mock.calls[0][0]).toEqual({
      name: 'products',
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully resumed auto-following patterns matching "products" created on "us-cluster"',
      response: {
        acknowledged : true,
      },
      verbose: true
    });
  });

  it('logs failure', async () => {
    const client = {
      ccr: {
        resumeAutoFollowPattern: jest.fn().mockRejectedValue(new Error('Resume Auto Follow Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ auto_follow_pattern_name: 'products', verbose: true });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Resume Auto Follow Error');
  });
});
