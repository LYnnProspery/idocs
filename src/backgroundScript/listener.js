import { sendMsg, listenMsg } from '../utils';
import { 
    REQUEST_CONFIG_SIGNAL,
    UPDATE_CONFIG_SIGNAL,
    IDOCS_CONFIG_ENGINE,
    IDOCS_CONFIG_LAN
 } from '../const';

// 监听popup消息的background listener
class Listener {
    constructor(walkerInstance) {
        this._walker = walkerInstance;

        this.init();
    }

    init() {
        listenMsg((request, sender, sendResponse) => {
            
            switch (request.msg) {
                case REQUEST_CONFIG_SIGNAL:
                    sendResponse(JSON.stringify({
                        [IDOCS_CONFIG_ENGINE]: this._walker.config[IDOCS_CONFIG_ENGINE],
                        [IDOCS_CONFIG_LAN]: this._walker.config[IDOCS_CONFIG_LAN],
                    }));
        
                    break;
        
                case UPDATE_CONFIG_SIGNAL:
                    this._walker.updateConfig(request.data);
                    
            }
        });

    }
}


export { Listener as default }