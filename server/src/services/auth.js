import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
require('dotenv').config();

//password encryption function
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({ name, phone, email, address, password, idPermission, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findOrCreate({
            where: { phone },
            defaults: {
                name, phone, email, address,
                password: hashPassword(password),
                idPermission, idState,
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '1d' });
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Successful registration.' : 'The phone number has been registered.',
            token: token || null
        })
    } catch (error) { reject(error); }
})

export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findOne({
            where: { phone, idState: '2' },
            raw: true,
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password);

        const token = isCorrectPassword && jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '1d' });
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Successful login!' : response ? 'The password is incorrect.' : 'Your phone number does not exist or your account has not been activated.',
            token: token || null,
        })

    } catch (error) { reject(error) }
})

const sendEmail = (email, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ngonguyenkey1512@gmail.com',
            pass: 'oyce hied uxkl szlq'
        }
    });
    const mailOptions = {
        from: 'ngonguyenkey1512@gmail.com',
        to: email,
        subject: subject,
        html: htmlContent,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
    });
};

const generateRandomPassword = (length) => {
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        password += randomNumber;
    }
    return password;
};

export const forgotPassword = ({ phone, email }) => new Promise(async (resolve, reject) => {
    try {
        const account = await db.Account.findOne({
            where: { phone }
        });
        if (account) {
            const newPassword = generateRandomPassword(6);
            sendEmail(email, 'REACT FASHION FORGOT PASSWORD',
                `
            <div>
                <p>Dear User,</p>
                <ul>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Your new password is:</strong> ${newPassword}</li>
                </ul>
                <p>If you have any questions or need further assistance, feel free to contact us.</p>
                <p>Best regards,</p>
                <p>Your Company Name</p>
            </div>
          `
            );
            const updatedAccount = await db.Account.update(
                { password: hashPassword(newPassword) },
                { where: { id: account.id } }
            );
            if (updatedAccount)
                resolve({
                    err: 0,
                    msg: 'New password has been sent to your email address.',
                });
            else
                reject('Unable to update new password.')
        } else
            resolve({
                err: 1,
                msg: 'The phone number does not exist.',
            })
    } catch (error) { reject(error) }
});