import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MenuIcon, SearchIcon, Power } from 'lucide-react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { asyncUnsetAuthUser } from '@/store/authUser/action';

export default function Header() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const keyword = e.target.value;
    navigate(`/?keyword=${keyword}`);
  };

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => alert('halo')}
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <MenuIcon className="w-5 h-5" />
          </Button>
          <h1
            onClick={() => navigate('/')}
            className="text-xl font-bold bg-gradient-to-r cursor-pointer from-purple-600 to-blue-500 bg-clip-text text-transparent"
          >
            PurnamaThread
          </h1>
        </div>

        <div className="relative hidden md:flex items-center w-full max-w-sm mx-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            onChange={handleChange}
            placeholder="Cari diskusi..."
            className="pl-10 bg-gray-100 dark:bg-gray-800 border-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={authUser.avatar} alt={authUser.name} />
              <AvatarFallback>{authUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col text-sm leading-tight">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {authUser.name}
              </span>
              <span className="text-gray-500 text-xs dark:text-gray-400">
                {authUser.email}
              </span>
            </div>
          </div>
          <Button
            alt="Logout"
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="ml-2 flex justify-center items-center"
          >
            <h1 className="text-xs">Logout</h1> <Power />
          </Button>
        </div>
      </div>
    </header>
  );
}
