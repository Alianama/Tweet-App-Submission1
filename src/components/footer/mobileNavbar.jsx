import { Button } from '../ui/button/button';
import {
  HomeIcon,
  PlusIcon,
  UserIcon,
  SearchIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MobileNavbar() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t dark:border-gray-800 md:hidden">
      <div className="flex items-center justify-around h-16">
        <Button onClick={()=> navigate('/')} variant="ghost" size="icon">
          <HomeIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <SearchIcon className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-purple-600 hover:bg-purple-700"
        >
          <PlusIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <UserIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
