export const useTimeout = (
    callback: Function,
    delay: number,
    startImmediately: boolean = false
) => {
    let timerId: number;
    let start: any;
    let remaining: number = delay;

    const pause = () => {
        window.clearTimeout(timerId);
        remaining -= +new Date() - start;
    };

    const resume = () => {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    if (startImmediately) {
        console.log("startImmediately");
        resume();
    }

    return {
        pause,
        resume,
    };
};
