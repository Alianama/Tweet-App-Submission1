import { Badge } from '../ui/badge/badge';

export default function TagBar() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Kategori Populer
      </h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          #teknologi
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          #pemrograman
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          #desain
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          #react
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          #nextjs
        </Badge>
      </div>
    </div>
  );
}
