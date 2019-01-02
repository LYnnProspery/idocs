import { 
    KEY_MACOS_COMMAND,
    IDOCS_CONFIG_LAN_EN,
    IDOCS_CONFIG_LAN_ZH,
    IDOCS_CONFIG_ENGINE_BAIDU,
    IDOCS_CONFIG_ENGINE_GOOGLE,
    IDOCS_CONFIG_ENGINE_MDN,
    IDOCS_STROAGE_KEY,
    IDOCS_CONFIG_LAN,
    IDOCS_CONFIG_ENGINE
} from '../const';
import doubleKeydown from '../decorators/doubleKeydown';
import { getStorage } from '../utils';

const engineMap = {
    [IDOCS_CONFIG_ENGINE_BAIDU]: {
        [IDOCS_CONFIG_LAN_ZH]: 'https://www.baidu.com/s?wd=',
        [IDOCS_CONFIG_LAN_EN]: 'https://www.baidu.com/s?sl_lang=en&wd='
    },

    [IDOCS_CONFIG_ENGINE_GOOGLE]: {
        [IDOCS_CONFIG_LAN_ZH]: 'https://www.google.com/search?hl=zh-CN&q=',
        [IDOCS_CONFIG_LAN_EN]: 'https://www.google.com/search?hl=en&q='
    },

    [IDOCS_CONFIG_ENGINE_MDN]: {
        [IDOCS_CONFIG_LAN_ZH]: 'https://developer.mozilla.org/zh-cn/search?q=',
        [IDOCS_CONFIG_LAN_EN]: 'https://developer.mozilla.org/en-US/search?q='
    }
};

// 监听页面事件的listener
class Listener {
    constructor() {
        this.init();
    }

    init() {
        this.listenSearchEvent();
    }
    
    @doubleKeydown(KEY_MACOS_COMMAND, 500)
    listenSearchEvent() {
        let selection = this.getSelection();

        if (!selection) {
            return;
        }

        this.queryDocs(selection);
    }

    async queryDocs(selection) {
        
        let resultDocUrl = await this.generateSearchUrl(selection);

        // TODO 添加iframe 方式支持显示
        window.open(resultDocUrl);
    }

    async generateSearchUrl(query) {

        let storage = await getStorage(IDOCS_STROAGE_KEY);
        let engine = storage[IDOCS_CONFIG_ENGINE];
        let lang = storage[IDOCS_CONFIG_LAN];

        return engineMap[engine][lang] + query;
    }

    getSelection() {
        let selection;
        try {
            let selecter = window.getSelection().toString();
            if (selecter != null && selecter.trim() != ''){
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
}

export { Listener as default }

