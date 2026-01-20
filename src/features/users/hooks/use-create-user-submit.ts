import { useCallback, useState } from "react";

import { usersService } from "../api/users";
import { generateEmail } from "../libs/email-generator";
import { generatePassword } from "../libs/password-generator";
import { CreateUserDto } from "../types/create-user.dto";

type CreatedCredentials = {
  email: string;
  password: string;
};

export function useCreateUserSubmit() {
  const [created, setCreated] = useState<CreatedCredentials | null>(null);

  const submit = useCallback(async (data: Omit<CreateUserDto, "email" | "password">) => {
    const email = generateEmail(data.name, data.surname);
    const password = generatePassword();

    await usersService.createUser({
      ...data,
      email,
      password,
    });

    setCreated({ email, password });
  }, []);

  return {
    created,
    submit,
    reset: () => setCreated(null),
  };
}
