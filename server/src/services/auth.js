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

const sendEmail = (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ngonguyenkey1512@gmail.com',
            pass: 'kfxd ijlv kvos jocr'
        }
    });
    const mailOptions = {
        from: 'ngonguyenkey1512@gmail.com',
        to: email,
        subject: subject,
        text: message
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
            where: { phone },
            raw: true,
        });
        if (account) {
            const newPassword = generateRandomPassword(8);
            sendEmail(email, 'FASHION SEND YOUR NEW PASSWORD',
                `Phone: ${phone} & email: ${email}. Your new password is: ${newPassword}`
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