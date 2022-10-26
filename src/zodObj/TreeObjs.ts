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
    id: z.string(),
    name: z.string(),
    answerFieldType: AnswerFieldsZodObj,
    question: z.string(),
    answers: z
      .array(
        z.object({
          answerValue: z.string(),
          childId: z.string().optional(),
        })
      )
      .optional(),
    children: z.array(
      TreeZodObj.or(
        z.object({
          name: z.string(),
          parent: z.object({ id: z.string() }).optional(),
          id: z.string(),
        })
      )
    ),
    url: z.string().optional(),
    parent: z.object({ id: z.string() }).optional(),
    imgUrl: z.string().optional(),
    helpText: z.string().optional(),
  })
);

export const TreeCollection = z.object({
  _id: z.string(),
  treeName: z.string(),
  tree: TreeZodObj,
  isCollection: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
