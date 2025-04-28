import { Slot } from '@radix-ui/react-slot';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import { buttonVariants } from './buttonVariants';

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link',
  ]),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  asChild: PropTypes.bool,
};

export { Button };
