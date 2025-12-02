"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === "true";

const FormSchema = z.object({
  email: z.string().email({ message: "Введите корректный email." }),
  password: z.string().min(6, { message: "Пароль должен содержать минимум 6 символов." }),
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: IS_DEMO ? "test@gmail.com" : "",
      password: IS_DEMO ? "test123" : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (IS_DEMO) {
      if (data.email === "test@gmail.com" && data.password === "test123") {
        toast.success("Demo login successful!");
        router.push("/dashboard/main");
        return;
      } else {
        toast.error("Неверный demo логин или пароль");
        return;
      }
    }

    try {
      await authService.login({
        email: data.email,
        password: data.password,
      });

      toast.success("Вход выполнен успешно!");
      router.push("/dashboard/main");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка запроса");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder={IS_DEMO ? "test" : "you@example.com"}
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder={IS_DEMO ? "test123" : "••••••••"}
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
}
