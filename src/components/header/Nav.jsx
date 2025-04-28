import { Button } from '../ui/button/button';
import { HomeIcon, TrendingUpIcon, UserIcon } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className="grid gap-2">
      <Button variant="ghost" className="w-full justify-start gap-2">
        <HomeIcon className="w-5 h-5" />
        <span>Beranda</span>
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <TrendingUpIcon className="w-5 h-5" />
        <span>LeaderBoard</span>
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <UserIcon className="w-5 h-5" />
        <span>Profil</span>
      </Button>
    </nav>
  );
}
