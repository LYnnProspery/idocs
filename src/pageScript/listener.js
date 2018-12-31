import { KEY_CODE_MACOS_COMMAND } from '../const';
import doubleKeydown from '../decorators/doubleKeydown';

// 监听页面事件的listener
class Listener {
    constructor() {
        this.init();
    }

    init() {
                
        this.listenSearchEvent();
    }
    
    @doubleKeydown(KEY_CODE_MACOS_COMMAND, 200, this)
    listenSearchEvent() {

        let selection = getSelection();

        if (!selection) {
            return;
        }
    
        // let engine = this._walker[IDOCS_CONFIG_ENGINE];
        // let lang = this._walker[IDOCS_CONFIG_LAN];
        console.log((`https://www.baidu.com/s?wd=${encodeURIComponent(selection)}`));   
        window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(selection)}`)
    }
}

function getSelection() {
    let selection;
    try {
        let selecter = window.getSelection().toString();
        if ( selecter != null && selecter.trim() != ''){
            selection = selecter;
        }
    } catch (err){
        let selecter = document.selection.createRange().text;
        if (selecter != null && selecter.trim() != ''){
            selection = selecter;
        }
    }

    return selection;
}


export { Listener as default }

