interface Props {
  code: string;
}

export function CountryFlag({ code }: Props) {
  return <span className="text-xl leading-none">{getFlagEmoji(code)}</span>;
}

function getFlagEmoji(countryCode: string) {
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
