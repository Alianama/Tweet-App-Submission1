import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { BellIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            PurnamaSpace
          </h1>
        </div>

        <div className="relative hidden md:flex items-center w-full max-w-sm mx-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari diskusi..."
            className="pl-10 bg-gray-100 dark:bg-gray-800 border-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Pengguna"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
