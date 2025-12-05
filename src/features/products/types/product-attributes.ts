export type AttributeCommon = {
  label: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
};

export type TextAttribute = AttributeCommon & {
  type: "text";
};

export type NumberAttribute = AttributeCommon & {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
};

export type DateAttribute = AttributeCommon & {
  type: "date";
};

export type SelectAttribute = AttributeCommon & {
  type: "select";
  options: string[];
  multiple?: boolean;
};

export type BooleanAttribute = AttributeCommon & {
  type: "boolean";
};

export type AttributeField = TextAttribute | NumberAttribute | DateAttribute | SelectAttribute | BooleanAttribute;

export type CategorySchema = {
  label: string;
  units: string[];
  attributes: Record<string, AttributeField>;
};
