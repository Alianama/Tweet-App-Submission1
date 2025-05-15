import { Badge } from './badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    className: { control: 'text' },
    asChild: { control: 'boolean' },
    children: { control: 'text' },
  },
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  variant: 'default',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variant: 'secondary',
};

export const Destructive = Template.bind({});
Destructive.args = {
  children: 'Destructive',
  variant: 'destructive',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline',
  variant: 'outline',
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  children: 'Custom Class',
  className: 'bg-pink-500 text-white',
};