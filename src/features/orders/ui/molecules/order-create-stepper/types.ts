export type Step = 0 | 1;

export type Party = {
  code: string;
  firstName: string;
  lastName: string;
  passport1: string;
  passport2?: string;
  city: string;
  district: string;
  phone: string;
  address: string;
};

export const emptyParty = (): Party => ({
  code: "",
  firstName: "",
  lastName: "",
  passport1: "",
  passport2: "",
  city: "",
  district: "",
  phone: "",
  address: "",
});
