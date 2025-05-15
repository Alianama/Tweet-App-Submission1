import { Input } from './input';

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'text',
      description: 'Tipe input',
      defaultValue: 'text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder input',
      defaultValue: 'Tulis sesuatu...'
    },
    className: {
      control: 'text',
      description: 'Custom className untuk styling',
    },
    disabled: {
      control: 'boolean',
      description: 'Nonaktifkan input',
      defaultValue: false,
    },
    value: {
      control: 'text',
      description: 'Value input',
    },
    style: {
      control: 'object',
      description: 'Inline style',
    },
  },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Tulis sesuatu...'
};

export const WarnaCustom = Template.bind({});
WarnaCustom.args = {
  placeholder: 'Input dengan warna custom',
  style: { backgroundColor: '#e0f7fa', color: '#006064', border: '2px solid #006064' },
};

export const Invalid = Template.bind({});
Invalid.args = {
  placeholder: 'Input invalid',
  'aria-invalid': true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Input dinonaktifkan',
  disabled: true,
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: 'Password',
};