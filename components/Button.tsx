import React from 'react';

interface Button {
    type: 'button' | 'submit';
    onClick?: () => {};
    text: string
}

const Button = ({ type = 'submit', onClick, text }: Button) => {
    return (
        <button className="block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
            type={type} onClick={onClick}>{text}</button>
    );
};

export default Button;