interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

const emailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'name',
      email: 'email@email/com,',
    },
  },
};

export default emailConfig as IMailConfig;
