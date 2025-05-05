import { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button/button';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '@/store/threads/action';
import { useNavigate } from 'react-router-dom';
import { SendHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export default function AddThreadForm({
  onAddThreadsOpen,
  setOnAddThreadsOpen,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;

    try {
      setLoading(true);
      await dispatch(asyncAddThread({ title, body, category }));
      toast.success('Post Thread Berhasil');
      navigate('/');
      setTitle('');
      setCategory('');
      setBody('');
      setOnAddThreadsOpen(false);
    } catch (error) {
      toast.error('Gagal menambahkan thread:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={onAddThreadsOpen} onOpenChange={setOnAddThreadsOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Tambahkan Thread Baru</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk membuat thread baru dalam komunitas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Judul
          </label>
          <Input
            id="title"
            placeholder="Masukkan judul thread"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tag" className="text-sm font-medium">
            Kategori
          </label>
          <Input
            id="tag"
            placeholder="Misalnya: teknologi, hobi, coding"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Isi Thread
          </label>
          <Textarea
            id="content"
            placeholder="Tulis isi thread Anda di sini..."
            className="min-h-[120px]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <DialogFooter className="pt-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !body.trim() || loading}
          >
            <SendHorizontal /> {loading ? 'Memposting...' : 'Posting'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

AddThreadForm.propTypes = {
  onAddThreadsOpen: PropTypes.bool.isRequired,
  setOnAddThreadsOpen: PropTypes.func.isRequired,
};
