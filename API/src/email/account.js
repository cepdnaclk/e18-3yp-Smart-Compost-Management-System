const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmMail = async (user) => {
    const msg = {
        to: user.email, // Change to your recipient
        from: 'smartcompostmanagement@gmail.com', // Change to your verified sender
        subject: 'Confirm your account',
        html: `
            <p style="color:green">Welcome! ${user.companyName}, Please confirm your account by clicking the below link</p>
            <a href="${process.env.DOMAIN_URL}api/users/confirm_account?userId=${user._id}&secret=${user.secret}">Confirm</a>
        `,
    };
    
    sgMail.send(msg).then((result) => {
        console.log("Email send successfully");
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = {
    sendConfirmMail: sendConfirmMail
}

