import { MessageSquare } from "lucide-react";

interface Props {
  comment: string;
}

export function ProductComment({ comment }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-semibold text-gray-900">Комментарий</span>
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">{comment}</p>
    </div>
  );
}
