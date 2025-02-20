import * as z from "zod";

export type TProfileEditSchema = z.infer<typeof ProfileEditSchema>;
export const ProfileEditSchema = z.object({
  firstName: z.string().min(2, { message: "Нэр багадаа 2 үсэгээс бүрдэнэ." }),
  lastName: z.string().min(2, { message: "Овог багадаа 2 үсэгээс бүрдэнэ." }),
  phone: z.string().min(8, { message: "Утасны дугаарыг зөв бичнэ үү." }),
  // access: z.boolean(),
});

export type TGivePointSchema = z.infer<typeof GivePointSchema>;
export const GivePointSchema = z.object({
  login: z.string().min(8, {
    message: "Энэхүү утасны дугаар багадаа 8 тэмдэгтээс бүрдэнэ.",
  }),
  score: z.string().min(1),
});
