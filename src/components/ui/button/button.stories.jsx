import { Button } from './button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  size: 'default',
  children: 'Default',
};

export const Variants = () => (
  <div className="flex gap-3 flex-wrap">
    {['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].map((variant) => (
      <Button key={variant} variant={variant} className="text-sm font-medium">
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Button>
    ))}
  </div>
);

export const Sizes = () => (
  <div className="flex gap-3 flex-wrap items-center">
    {['default', 'sm', 'lg', 'icon'].map((size) => (
      <Button key={size} size={size} className="text-sm font-medium">
        {size === 'icon' ? <span role="img" aria-label="icon">🔔</span> : size.charAt(0).toUpperCase() + size.slice(1)}
      </Button>
    ))}
  </div>
);
