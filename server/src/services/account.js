import db from '../models';
import bcrypt from 'bcryptjs';
require('dotenv').config();

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const getAllAccountsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findAndCountAll({
            attributes: [
                'id', 'name', 'phone', 'email', 'address', 'password', 'idPermission', 'idState'
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Get account successful' : 'Get account failed.',
            response
        });
    } catch (error) { reject(error) }
});

export const createAccountService = ({ name, phone, email, address, password, idPermission, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findOrCreate({
            where: { phone },
            defaults: {
                name, phone, email, address,
                password: hashPassword(password),
                idPermission, idState,
            }
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create account successful.' : 'The phone number has been registered.',
            token: response || null
        })
    } catch (error) { reject(error); }
})

export const updateAccountsByAdminService = ({ id, idPermission, idState }) => new Promise(async (resolve, reject) => {
    try {
        const account = await db.Account.findByPk(id);
        if (account && (account.idPermission === 2 || account.idPermission === 3)) {
            const response = await account.update({ idPermission, idState });
            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Update account successful.' : 'Update account failed.',
                response: response || null
            });
        } else {
            resolve({
                err: 1,
                msg: 'You may not update the customer of account',
                response: null
            });
        }
    } catch (error) { reject(error) }
})

export const updateAccountOneService = ({ id, name, email, address }) => new Promise(async (resolve, reject) => {
    try {
        const account = await db.Account.findByPk(id);
        const response = await account.update({
            name, email, address
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Successful information account update.' : 'Update information account failed',
            response: response || null
        });

    } catch (error) { reject(error) }
})

export const updateAccountPasswordService = ({ id, passwordold, passwordnew }) => new Promise(async (resolve, reject) => {
    try {
        const account = await db.Account.findByPk(id);
        const accounts = await db.Account.findOne({
            where: { id }
        })
        const isCorrectPassword = bcrypt.compareSync(passwordold, accounts.password);
        if (isCorrectPassword) {
            const response = await account.update({
                password: hashPassword(passwordnew)
            });
            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Successful password update.' : 'Update password failed',
                response: response || null
            });
        } else
            resolve({
                err: accounts ? 0 : 2,
                msg: 'The old password is incorrect.'
            });
    } catch (error) { reject(error) }
})