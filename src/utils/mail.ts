import type { MailOptions } from 'nodemailer/lib/json-transport';
import { env } from '~/env.mjs';

export const mailConfig  = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: env.ETHEREAL_EMAIL,
        pass: env.ETHEREAL_PASSWORD
    }
};

export const Amazon:MailOptions={
    from:"ra@random.com",
    to:env.ETHEREAL_EMAIL,
    subject:"Your Package will arrive today",
    text:
`
Hi JC,

Your package number 5347298 has shipped. You can review the order details below:

INFORMATION ABOUT PACKAGE 5347298
Order number: 5347298 placed
Shipping number: 8927872 

DELIVERY ADDRESS
1241 East Main Street, Stamford, CT 06902

Best Regards,
Customer Service

Attention: Before picking up your package, please check that it has not been damaged or tampered with. If the package is damaged, and you are afraid that the parcel may have been opened before it was delivered to you, remember to create a ticket with the courier. Only this way can we determine the guilty party and, if applicable, return your money or arrange another shipment.    
`
}

export const Bitcoin:MailOptions={
    from:"ra@random.com",
    to:env.ETHEREAL_EMAIL,
    subject:"Transcation successfull",
    text:
`
Dear Sir,

We are pleased to inform you that your credit card payment has been successfully processed. The details of the transaction are as follows:

Transaction Date: 27/10/2023
Transaction Amount: 69420Rs
Payment Method: Credit Card
Transaction ID: YXHE68

This payment ensures that your account is up to date, and your services will continue without interruption. If you have any questions or require further assistance, please feel free to contact our support team.

Thank you for choosing our services.

Best regards
`
}

export const CodeDigit:MailOptions={
    from:"ra@random.com",
    to:env.ETHEREAL_EMAIL,
    subject:"Confirm your identity",
    text:
`
Dear Member,

We are pleased to welcome you as a new member of our organization. To ensure the security of your membership, we are providing you with a confidential access code. Please keep this code safe and do not share it with anyone.

Access Code: 8234

You will need this access code for various interactions and access to our organization's resources. 

Best Regards.
`
}