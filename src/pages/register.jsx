import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.name.length < 2) {
      toast.error('Name must be at least 2 characters.');
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md space-y-6 p-6 sm:p-8 bg-card rounded-lg shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground">
          Enter your information to register
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
          />
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
          <p className="text-xs text-muted-foreground mt-1">
            Password must be at least 8 characters long
          </p>
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium">Confirm Password</label>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-7 h-8 px-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <a
          href="/login"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}
