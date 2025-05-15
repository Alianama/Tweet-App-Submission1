import Loading from './loading';

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    docs: {
      description: {
        component: 'Komponen animasi loading berbasis framer-motion.'
      }
    }
  }
};

const Template = (args) => (
  <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
    <Loading {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = {
  // Tidak ada props, hanya contoh tampilan kecil
};
Small.decorators = [
  (Story) => <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}><Story /></div>
];

export const Large = Template.bind({});
Large.args = {
  // Tidak ada props, hanya contoh tampilan besar
};
Large.decorators = [
  (Story) => <div style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}><Story /></div>
];