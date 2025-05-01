import { Button } from '../ui/button/button';
import { HomeIcon, TrendingUpIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="grid gap-2">
      <Button onClick={()=> navigate('/')} variant="ghost" className="w-full justify-start gap-2">
        <HomeIcon className="w-5 h-5" />
        <span>Beranda</span>
      </Button>
      <Button onClick={()=> navigate('/leaderboard')} variant="ghost" className="w-full justify-start gap-2">
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
