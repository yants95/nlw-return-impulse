import { Router, Request, Response } from 'express'
import { SubmitFeedbackUsecase } from './usecases/submit-feedback';
import { PrismaFeedbacksRepository } from './repos/prisma/prisma.feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = Router()

routes.post('/feedbacks', async (req: Request, res: Response) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()
  const submitFeedbackUsecase = new SubmitFeedbackUsecase(prismaFeedbacksRepository, nodemailerMailAdapter)
  await submitFeedbackUsecase.execute(req.body)
  return res.status(201).send()
})