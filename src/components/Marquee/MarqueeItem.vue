<script setup lang="ts">
import { useRafFn, useWindowSize } from "@vueuse/core";
import { watch } from "vue";
import { ref, onMounted } from "vue";
// interface MarqueeItemProps {
//     speed: MotionValue<number>;
//     velocity: MotionValue<number>;
// }

interface MarqueeItemProps {
    speed: number;
    velocity: number;
}

const props = defineProps<MarqueeItemProps>();

const itemRef = ref<HTMLSpanElement | null>(null);

const rectRef = ref<{
    width: number; 
    height: number 
}>({ 
    width: 0, 
    height: 0 
});

const { width, height } = useWindowSize();
const x = ref(0);
const direction = ref<number>(1); // 1 = right, -1 = left

const setX = (() => {
    if (!itemRef.value  || !rectRef.value) return;

    const xPercentage = (x.value / rectRef.value.width) * 100;
    if (xPercentage < -100) x.value = 0;
    if (xPercentage > 0) x.value = -rectRef.value.width;

    itemRef.value.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
})

useRafFn(({ delta }) => {
    if (props.velocity < 0) {
        direction.value = -1;
    } else if (props.velocity > 0) {
        direction.value = 1;
    }

    const moveBy = 1 * props.speed * (delta / 1000) * direction.value;
    x.value -= moveBy;
    setX();
});
  
const calculateRect = () => {
    if (!itemRef.value) return;

    rectRef.value = itemRef.value.getBoundingClientRect();
}

onMounted(() => {
    calculateRect();
});

watch([width, height], () => {
    calculateRect();
});
</script>

<template>
    <span ref="itemRef" class="pr-4 shrink-0">
        <slot />
    </span>
</template>
  
  <!-- const MarqueeItem = ({ children, speed, velocity }: MarqueeItemProps) => {
    const rectRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
    const { width, height } = useWindowSize();
    const x = useRef(0);
  
    const direction = useRef<number>(1); // 1 = right, -1 = left
  
    const setX = useCallback(() => {
      if (!itemRef.value  !rectRef.value) return;
  
      const xPercentage = (x.value / rectRef.value.width) * 100;
      if (xPercentage < -100) x.value = 0;
      if (xPercentage > 0) x.value = -rectRef.value.width;
  
      itemRef.value.style.transform = translate3d(${xPercentage}%, 0, 0);
    }, []);
  
    useAnimationFrame((_, delta) => {
      if (velocity.get() < 0) {
        direction.value = -1;
      } else if (velocity.get() > 0) {
        direction.value = 1;
      }
  
      const moveBy = 1 * speed.get() * (delta / 1000) * direction.value;
  
      x.value -= moveBy;
  
      setX();
    });
  
    useEffect(() => {
      if (!itemRef.value) return;
  
      rectRef.value = itemRef.value.getBoundingClientRect();
    }, [width, height]);
  
    return (
      <Box as="span" ref={itemRef}>
        {children}
      </Box>
    );
  }; -->