import { Slot } from '@radix-ui/react-slot';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import { badgeVariants } from './badgeVariants';

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

Badge.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'secondary', 'destructive', 'outline']),
  asChild: PropTypes.bool,
};

Badge.defaultProps = {
  asChild: false,
};

export { Badge };
