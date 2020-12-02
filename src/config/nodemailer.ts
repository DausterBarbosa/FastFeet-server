export default {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
    default: {
        from: 'Equipe GoBarber <noreply@gobarber.com>',
    },
};