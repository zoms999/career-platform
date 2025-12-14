import { z } from "zod";

// A-01: Individual Signup Validation
export const individualSignupSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  phone: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, "올바른 휴대폰 번호를 입력해주세요"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다"
    ),
  confirmPassword: z.string(),
  birthDate: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "이용약관에 동의해주세요",
  }),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 처리방침에 동의해주세요",
  }),
  agreeToMarketing: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

// A-03: Organization Signup Validation
export const organizationSignupSchema = z.object({
  organizationName: z.string().min(2, "기관명은 최소 2자 이상이어야 합니다"),
  organizationType: z.string().min(1, "기관 유형을 선택해주세요"),
  businessNumber: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{5}$/, "올바른 사업자등록번호를 입력해주세요 (000-00-00000)"),
  managerName: z.string().min(2, "담당자 이름은 최소 2자 이상이어야 합니다"),
  managerPosition: z.string().min(1, "직책을 입력해주세요"),
  managerEmail: z.string().email("올바른 이메일 주소를 입력해주세요"),
  managerPhone: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, "올바른 휴대폰 번호를 입력해주세요"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다"
    ),
  confirmPassword: z.string(),
  documents: z.array(z.instanceof(File)).min(1, "증빙서류를 업로드해주세요"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "이용약관에 동의해주세요",
  }),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 처리방침에 동의해주세요",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

// A-07: Login Validation
export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
  rememberMe: z.boolean().optional(),
});

// A-08: Find Account Validation
export const findAccountSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

// Type exports
export type IndividualSignupInput = z.infer<typeof individualSignupSchema>;
export type OrganizationSignupInput = z.infer<typeof organizationSignupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type FindAccountInput = z.infer<typeof findAccountSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
