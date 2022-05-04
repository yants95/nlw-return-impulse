import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repos/feedbacks-repository"

interface SubmitFeedbackUsecaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUsecase {
  constructor (
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUsecaseRequest) {
    const { type, comment, screenshot } = request
    if (!type) throw new Error('Invalid type.')
    if (!comment) throw new Error('Invalid comment.')
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }
    await this.feedbacksRepository.create(request)
    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}