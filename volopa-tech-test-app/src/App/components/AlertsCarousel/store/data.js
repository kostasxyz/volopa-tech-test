import user from './images/user.png';
import gbp from './images/GBP.png';
import eur from './images/EUR.png';
const notificationData = {
    alerts: 12,
    notifications: [
        {
            image: user,
            name: 'Lex',
            messsage: 'Payment recived',
            type: 'Success',
            date: '02-11-21',
            send: 'GBP 10.00',
            sendImage: gbp,
            receive: 'EUR 10.00',
            receiveImage: eur
        },
        {
            image: user,
            name: 'Lex',
            messsage: 'Payment recived',
            type: 'success',
            date: '02-11-21',
            send: 'GBP 10.00',
            sendImage: gbp,
            receive: 'EUR 10.00',
            receiveImage: eur
        }
    ]
}

export {notificationData};