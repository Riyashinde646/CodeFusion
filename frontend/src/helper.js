export const toggleClass = (el,className)=>{
    let elem= document.querySelector(el);
    elem.classList.toggle(className);
};

export const removeClass = (el,className) =>{
    let elem = document.querySelector(elem);
    elem.classList.remove(className);
};

export const apibase_url = "http://localhost:3000"