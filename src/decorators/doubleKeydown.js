export default function doubleKeyDown(keycode, milliseconds) {
    return function(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = () => {
            // TODO find way to bind this context
            excuteWhenDoubleKeyDown(keycode, originalMethod, milliseconds);
        };

        return descriptor;
    }
}

function excuteWhenDoubleKeyDown(keycode, callback, milliseconds) {
    let timestamp;
    let currentTime;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === keycode) {
            currentTime = new Date().getTime();
            if (!timestamp || currentTime - timestamp > milliseconds) {
                timestamp = currentTime;
            } else {
                callback();
                timestamp = null;
            }
        }
    });
}

