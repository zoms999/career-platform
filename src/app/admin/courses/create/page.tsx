"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const courseFormSchema = z.object({
  title: z.string().min(2, { message: "과정명은 2글자 이상이어야 합니다." }),
  category: z.string().min(1, { message: "카테고리를 선택해주세요." }),
  level: z.string().min(1, { message: "난이도를 선택해주세요." }),
  price: z.string().min(1, { message: "비용을 입력해주세요." }),
  instructor: z.string().min(2, { message: "강사명을 입력해주세요." }),
  description: z.string().min(10, { message: "과정 설명을 10글자 이상 입력해주세요." }),
});

export default function CreateCoursePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      price: "",
      instructor: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof courseFormSchema>) {
    // Mock API Call
    console.log(values);
    toast.success("과정이 성공적으로 생성되었습니다.");
    // Redirect to curriculum editor for the new course (mock id)
    setTimeout(() => {
        router.push("/admin/courses/new-course-id/curriculum");
    }, 1000);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/courses"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">새 과정 등록</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-2">
                    <CardContent className="pt-6 space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>과정명</FormLabel>
                                    <FormControl>
                                        <Input placeholder="예: 진로 적성 상담사 2급 과정" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <div className="grid gap-6 md:grid-cols-2">
                             <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>카테고리</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="카테고리 선택" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="certification">자격증</SelectItem>
                                                <SelectItem value="expert">전문가</SelectItem>
                                                <SelectItem value="competency">직무역량</SelectItem>
                                                <SelectItem value="liberal-arts">교양</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>난이도</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="난이도 선택" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="beginner">초급</SelectItem>
                                                <SelectItem value="intermediate">중급</SelectItem>
                                                <SelectItem value="advanced">고급</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                             <FormField
                                control={form.control}
                                name="instructor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>강사명</FormLabel>
                                        <FormControl>
                                            <Input placeholder="강사 이름 입력" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>수강료</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="금액 입력 (무료인 경우 0)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>과정 설명</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="과정에 대한 상세한 설명을 입력하세요..." 
                                            className="min-h-[150px]"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end gap-4">
                 <Button type="button" variant="outline" onClick={() => router.back()}>취소</Button>
                 <Button type="submit">
                    <Save className="w-4 h-4 mr-2" /> 저장 후 커리큘럼 설정
                 </Button>
            </div>
        </form>
      </Form>
    </div>
  );
}
