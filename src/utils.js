export const getStorage = async (key) => new Promise(resolve => {
        chrome.storage.sync.get([key], (result) => {
            resolve(result[key]);
        });
    });

export const setStorage = (key, value) => chrome.storage.sync.set({ [key]: value});

export const sendMsg = (...args) => chrome.runtime.sendMessage.apply(chrome, args);

export const listenMsg = (...args) => chrome.runtime.onMessage.addListener.apply(chrome.runtime.onMessage, args);

// type only: lang, engine
export const setRadioVal = (type, value) => Array.from(document.querySelectorAll(`input[name='${type}']`)).forEach(item => {
        item.value === value ? item.checked = true : item.checked = false
    });

export const getRadioVal = (type) => Array.from(document.querySelectorAll(`input[name='${type}']`)).filter(item => item.checked)[0].value;