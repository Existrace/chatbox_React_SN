import React from 'react';

const Message = ({pseudo, message, isUser, date, image}) => {

    if (isUser(pseudo)) {
        return (
            <p className='user-message'>
                <span className='message-header'> Envoyé à {date} :</span><br/>
                <span className='message-main'>{message}</span>
                <span><img src={image}  width="20%" height="20%"/></span>
            </p>
        );
    } else {
        return (
            <p className='not-user-message'>
                <span
                    className='message-header'><strong>{pseudo}</strong> </span><span
                className='hour-message'>{date}</span><br/>
                <span className='message-main'>{message}</span>
                <span><img src={image}  width="20%" height="20%"/></span>
            </p>
        );
    }

};

export default Message;
