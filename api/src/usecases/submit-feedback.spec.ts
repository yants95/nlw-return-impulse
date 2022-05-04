import { SubmitFeedbackUsecase } from "./submit-feedback"

describe('SubmitFeedback', () => {
  const createFeedbackSpy = jest.fn()
  const sendMailSpy = jest.fn()
  const submitFeedback = new SubmitFeedbackUsecase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  )
  it('should be able to submit a feedback with all data', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Ta tudo bugado!',
      screenshot: 'data:image/png;base64,test.jpg'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalledTimes(1)
    expect(sendMailSpy).toHaveBeenCalledTimes(1)
  })

  it('should be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Ta tudo bugado!',
      screenshot: 'data:image/png;base64,test.jpg'
    })).rejects.toThrow()
  })

  it('should be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,test.jpg'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback with invalid screenshot format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Ta tudo bugado!',
      screenshot: 'test.png'
    })).rejects.toThrow()
  })
})