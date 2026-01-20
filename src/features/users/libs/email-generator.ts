export function generateEmail(name: string, surname: string) {
  const clean = (v: string) =>
    v
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .slice(0, 2);

  const namePart = clean(name);
  const surnamePart = clean(surname);

  if (namePart.length < 2 || surnamePart.length < 2) {
    throw new Error("Name and surname must contain at least 2 latin letters");
  }

  const random = Math.floor(100 + Math.random() * 900);

  return `${namePart}${random}${surnamePart}@gmail.com`;
}
