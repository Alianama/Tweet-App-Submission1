import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const valid = { value: true };
    const newErrors = { email: '', password: '' };

    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
      valid.value = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      valid.value = false;
    }

    setErrors(newErrors);
    return valid.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log(formData); // Simulate login request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Login successful!');
      navigate('/dashboard'); // Redirect to the dashboard or another page
    } catch (error) {
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md space-y-6 p-6 sm:p-8 bg-card rounded-lg shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login ke Akun</h1>
        <p className="text-muted-foreground">
          Masukan E-Mail & Password untuk Melanjutkan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="alipurnama69@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-xs text-red-500 animate-shake">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium">Password</label>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-7 h-8 px-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          {errors.password && (
            <p className="text-xs text-red-500 animate-shake">
              {errors.password}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <div className="text-center text-sm">
        Belum Punya akun?{' '}
        <a
          href="/register"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Register disini
        </a>
      </div>
    </div>
  );
}
