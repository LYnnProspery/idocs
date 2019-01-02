/// walker 负责对选中的词进行搜索

import { getStorage, setStorage } from '../utils';
import { 
    IDOCS_STROAGE_KEY,
    IDOCS_CONFIG_ENGINE,
    IDOCS_CONFIG_LAN,
    IDOCS_CONFIG_LAN_ZH,
    IDOCS_CONFIG_LAN_EN,
    IDOCS_CONFIG_ENGINE_MDN,
    IDOCS_CONFIG_ENGINE_GOOGLE,
    IDOCS_CONFIG_ENGINE_BAIDU,
} from '../const';

class Walker {
    constructor() {
        this.init();
    }

    async init() {        
        console.log(await getStorage(IDOCS_STROAGE_KEY), 111);
        this.config = Object.assign(defaultConfig, await getStorage(IDOCS_STROAGE_KEY));
    }

    updateConfig(config) {
        this.config = Object.assign(this.config, config);

        setStorage(IDOCS_STROAGE_KEY, config);
    }
}

const defaultConfig = {
    [IDOCS_CONFIG_ENGINE]: IDOCS_CONFIG_ENGINE_MDN,
    [IDOCS_CONFIG_LAN]: IDOCS_CONFIG_LAN_EN
};

export { Walker as default }