import Header from '@/components/header/Header';
import NavBar from '@/components/header/Nav';
import { Button } from '@/components/ui/button/button';
import { PlusIcon } from 'lucide-react';
import MobileNavbar from '@/components/footer/mobileNavbar';
import TagBar from '@/components/header/Tag';
import PropTypes from 'prop-types';
import { useState } from 'react';
import AddThreadForm from '@/components/post/ThreadForm';

export default function Layout({ children }) {
  const [onAddThreadsOpen, setOnAddThreadsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 py-6">
        <aside className="hidden md:flex flex-col gap-6 h-[calc(100vh-80px)] sticky top-20">
          <NavBar />
          <TagBar />
        </aside>
        <main>{children}</main>
      </div>
      <MobileNavbar />
      <Button
        onClick={() => setOnAddThreadsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg md:flex hidden items-center justify-center bg-purple-600 hover:bg-purple-700"
      >
        <PlusIcon className="w-6 h-6" />
      </Button>
      <AddThreadForm
        onAddThreadsOpen={onAddThreadsOpen}
        setOnAddThreadsOpen={setOnAddThreadsOpen}
      />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
