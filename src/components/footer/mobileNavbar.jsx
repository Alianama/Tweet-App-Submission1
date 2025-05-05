import { useState } from 'react';
import { Button } from '../ui/button/button';
import {
  HomeIcon,
  PlusIcon,
  UserIcon,
  SearchIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '../ui/dialog';
import { Input } from '../ui/input';

export default function MobileNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t dark:border-gray-800 md:hidden">
      <div className="flex items-center justify-around h-16">
        <Button onClick={() => navigate('/')} variant="ghost" size="icon">
          <HomeIcon className="w-5 h-5" />
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <SearchIcon className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cari Diskusi</DialogTitle>
              <DialogDescription>
              Masukan keyword yang ingin dicari
              </DialogDescription>
            </DialogHeader>
            <div className='flex gap-2 justify-center items-center' >
              <Input
                placeholder="Cari Threads..."
                className="w-full "
                autoFocus
                onChange={(e) => {
                  const value = e.target.value;
                  navigate(`/?keyword=${value}`);
                }}
              />
              <DialogClose>
                <SearchIcon/>
              </DialogClose>
            </div>

          </DialogContent>
        </Dialog>

        <Button
          size="icon"
          className="rounded-full bg-purple-600 hover:bg-purple-700"
        >
          <PlusIcon className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => navigate('/leaderboard')}
          variant="ghost"
          className="justify-start gap-2"
        >
          <TrendingUpIcon className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => navigate('/profile')}
          variant="ghost"
          size="icon"
        >
          <UserIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
