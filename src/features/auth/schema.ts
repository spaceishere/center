import * as z from "zod";

export type TLoginSchema = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
  login: z.string().min(6, { message: "Утас дугаараа бүрэн гүйцэт бичнэ үү." }),
  password: z.string().min(1, { message: "Нууц үг шаардлагатай." }),
  isRemember: z.boolean(),
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
export const RegisterSchema = z.object({
  firstName: z.string().min(2, { message: "Нэр багадаа 2 үсэгээс бүрдэнэ." }),
  lastName: z.string().min(2, { message: "Овог багадаа 2 үсэгээс бүрдэнэ." }),
  phone: z
    .string()
    .min(8, { message: "Утасны дугаараа бүрэн гүйцэт бичнэ үү." }),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@#()$!%*?&_.\-+=]{8,}$/,
      "Нууц үг нь дор хаяж нэг тоо, нэг жижиг үсэг, нэг том үсэг, дор хаяж 8 тэмдэгт агуулсан байх ёстой."
    )
    .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгтээс бүрдэх ёстой."),
  access: z.boolean(),
});

export type TForgotPassSchema = z.infer<typeof ForgotPassSchema>;
export const ForgotPassSchema = z.object({
  phone: z
    .string()
    .min(8, { message: "Утасны дугаараа бүрэн гүйцэт бичнэ үү." }),
  code: z.string().min(4, { message: "Code is required" }),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@#()$!%*?&_.\-+=]{8,}$/,
      "Нууц үг нь дор хаяж нэг тоо, нэг жижиг үсэг, нэг том үсэг, дор хаяж 8 тэмдэгт агуулсан байх ёстой."
    )
    .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгтээс бүрдэх ёстой."),
});

export type TEditUserDetailSchema = z.infer<typeof EditUserDetailSchema>;
export const EditUserDetailSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2, { message: "Нэр багадаа 2 үсэгээс бүрдэнэ." }),
  lastName: z.string().min(2, { message: "Овог багадаа 2 үсэгээс бүрдэнэ." }),
});

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
export const ChangePasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@#()$!%*?&_.\-+=]{8,}$/,
      "Нууц үг нь дор хаяж нэг тоо, нэг жижиг үсэг, нэг том үсэг, дор хаяж 8 тэмдэгт агуулсан байх ёстой."
    )
    .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгтээс бүрдэх ёстой."),
});

export const phoneZod = z
  .string()
  .regex(/^\d{8}$/, "Invalid Phone number")
  .min(1, { message: "Phone is required" });

export const passwordZod = z
  .string()
  .min(1, { message: "Нууц үгээ оруулна уу" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    "Нууц үг нь дор хаяж нэг жижиг үсэг, нэг том үсэг оруулсан 8 тэмдэгтээс бүрдэх ёстой."
  );
