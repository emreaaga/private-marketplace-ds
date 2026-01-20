import { useState, useCallback } from "react";

import { UserRoles } from "@/shared/types/users/user.model";

export function useUserFormState() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [addressLine, setAddressLine] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [companyId, setCompanyId] = useState<number | undefined>();
  const [role, setRole] = useState<UserRoles | undefined>();

  const reset = useCallback(() => {
    setName("");
    setSurname("");
    setAddressLine("");
    setPhoneNumber("");
    setCompanyId(undefined);
    setRole(undefined);
  }, []);

  return {
    name,
    surname,
    setName,
    setSurname,

    addressLine,
    setAddressLine,
    phoneNumber,
    setPhoneNumber,

    companyId,
    setCompanyId,
    role,
    setRole,

    reset,
  };
}
