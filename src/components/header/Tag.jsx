import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge/badge';
import { useSelector } from 'react-redux';

export default function TagBar() {
  const threads = useSelector((state) => state.threads);
  const categories = [...new Set(threads.map((thread) => thread.category))];
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Kategori Populer
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <Badge
            onClick={() => {
              navigate(`/?category=${category}`);
            }}

            key={index}
            variant="secondary"
            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            #{category}
          </Badge>
        ))}
      </div>
    </div>
  );
}
