import React from 'react';

/*
const Notify = (notify_text) => {
  
    toast(notify_text, {
        position: 'bottom-right', 
        autoClose: 3000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
    });
};
*/

const AddComment = (id_element,commentText,replyToName,userData_name) =>
{
    const divElement0 = document.createElement('div');
    divElement0.className = 'mt-10 mb-10 ml-5 bg-[#333333] border-l-2 border-white-400 p-4';
    
    const divElement = document.createElement('div');
    divElement.className = 'ml-5 mb-2 bg-[#333333] sm:rounded-lg p-4';

    const divElement2 = document.createElement('div');
    divElement2.textContent = "user: "+userData_name;
    divElement.appendChild(divElement2);

    if(replyToName != null)
    {
        const divElement3 = document.createElement('div');
        divElement3.textContent = "reply to: "+replyToName;
        divElement.appendChild(divElement3);
    }

    const divElement4 = document.createElement('div');
    divElement4.textContent = "koemntarz: " +commentText;
    divElement.appendChild(divElement4);
    
    const element = document.getElementById(id_element);
    
    divElement0.appendChild(divElement);
    element.appendChild(divElement0);

};

export default AddComment;