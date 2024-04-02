import { ref, onMounted, onBeforeUnmount } from "vue";

interface TimeoutFunctions {
    start: () => void;
    pause: () => void;
    resume: () => void;
}
const isStarted = ref<boolean>(false);

export const useTimeout = (callback: () => void, options: { delay: number, startImmediately?: boolean } = { delay: 0, startImmediately: true }): TimeoutFunctions => {
    const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null);
    const isPaused = ref<boolean>(false);
    const remaining = ref<number>(options.delay);
    const startPoint = ref<Date | null>(null);

    const runCallback = () => {
        timeoutId.value = setTimeout(() => {
            callback();
            console.log("runCallback");
            isStarted.value = false;
        }, remaining.value);
    };

    const start = () => {
        console.log("start");
        if (!isStarted.value) {
            startPoint.value = new Date();
            isStarted.value = true;
            runCallback();
            console.log("timeoutId", timeoutId.value);
        }
    };
    
    const pause = () => {
        console.log("pause");
        console.log("timeoutId: before pause", timeoutId.value);
        if (timeoutId.value && !isPaused.value) {
            remaining.value -= +new Date() - startPoint.value!.getTime();
            clearTimeout(timeoutId.value);
            isPaused.value = true;
        }
        console.log("timeoutId: after pause", timeoutId.value);
    };

    const resume = () => {
        console.log("resume");
        if (isPaused.value) {
            isPaused.value = false;
            runCallback();
        }
    };

    onMounted(() => {
        if (options.startImmediately) {
            console.log("startImmediately", options.startImmediately);
            start();
        }
    });

    onBeforeUnmount(() => {
        if (timeoutId.value) {
            clearTimeout(timeoutId.value);
        }
    });

    return { start, pause, resume };
};
