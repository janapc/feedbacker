import useStore from '../../../src/hooks/useStore';

describe('UseStore', () => {
  it('Should return the store', () => {
    expect(useStore()).toEqual({
      currentComponent: 'SelectFeedbackType',
      message: '',
      feedbackType: '',
      fingerprint: '',
      apiKey: '',
      currentPage: ''
    })
  })
})
