import { z } from 'zod';
import { TreeSchema } from '../../types/TreeTypes';

export const AnswerFields = [
  'MultipleChoice',
  'Textarea',
  'SearchBox',
  'InputBox',
] as const;

export const AnswerFieldsZodObj = z.enum(AnswerFields);

export const TreeZodObj: z.ZodType<TreeSchema> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    answerFieldType: AnswerFieldsZodObj,
    question: z.string(),
    answers: z.array(z.string()).optional(),
    children: z.array(TreeZodObj),
    url: z.string().optional(),
    answer: z.string().optional(),
    parent: z.object({ answers: z.array(z.string()).optional() }).optional(),
  })
);

export const TreeCollection = z.object({
  _id: z.string(),
  treeName: z.string(),
  tree: TreeZodObj,
  createdAt: z.string(),
  updatedAt: z.string(),
});
