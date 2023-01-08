const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

const sendConfirmMail = async (user) => {
    const msg = {
        to: user.email, // Change to your recipient
        from: 'smartcompostmanagement@gmail.com', // Change to your verified sender
        subject: 'Confirm your account',
        html: `
            <p style="color:green">Welcome! ${user.name}, Please confirm your account by clicking the below link</p>
            <a href="http://localhost:3000/api/users/confirm_account?userId=${user._id}&secret=${user.secret}">Confirm</a>
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