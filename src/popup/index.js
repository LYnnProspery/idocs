import './index.less';
import { sendMsg, listenMsg, getRadioVal, setRadioVal } from '../utils';
import { 
    REQUEST_CONFIG_SIGNAL, 
    UPDATE_CONFIG_SIGNAL,
    IDOCS_CONFIG_ENGINE, 
    IDOCS_CONFIG_LAN
} from '../const.js';

const config = {
    lang: '',
    engine: ''
};

sendMsg({ msg: REQUEST_CONFIG_SIGNAL }, (res) => {
    res = JSON.parse(res);

    config.lang = res[IDOCS_CONFIG_LAN];
    config.engine = res[IDOCS_CONFIG_ENGINE];

    setRadioVal('lang', config.lang);
    setRadioVal('engine', config.engine);
});


document.querySelector('.save-config-btn').addEventListener('click', () => {
    let langVal = getRadioVal('lang');
    let engineVal = getRadioVal('engine');

    if (langVal !== config.lang || engineVal !== config.engine) {
        sendMsg({
            msg: UPDATE_CONFIG_SIGNAL, 
            data: {
                [IDOCS_CONFIG_LAN]: langVal,
                [IDOCS_CONFIG_ENGINE]: engineVal
            } 
        }, (res) => {
            console.log('update success');
            window.close();
        });
    }
    window.close();
});