<template>
  <div class="progress-wrapper">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        :fill="fill"
        :stroke="trackColor"
        :transform="circleTransform"
        :stroke-dasharray="dashArray"
        :stroke-linecap="strokeType"
      />
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        fill="none"
        :stroke="changeColor.length ? currentColor: progressColor"
        :stroke-linecap="strokeType"
        :transform="circleTransform"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        :style="{ transition: isAnimating ? 'stroke-dashoffset 0.8s linear, stroke 0.8s ease' : 'stroke 0.8s ease' }"
      />
    </svg>

    <div class="progress-label">
      <slot name="label">
          <transition name="fade-zoom" mode="out-in">
            <div v-if="labelType === 'progress'" class="progress-label-wrapper" :style="{ fontSize: fontSize + 'px' }">
              {{ displayPercentage }}%
            </div>
            <div v-else-if="labelType === 'success'">
              <svg :width="size * 0.2" :height="size * 0.2" class="progress-label-wrapper" :fill="textColor" viewBox="-1 0 19 19">
                <path d="M8.5 15.313a1.026 1.026 0 0 1-.728-.302l-6.8-6.8a1.03 1.03 0 0 1 1.455-1.456L8.5 12.828l6.073-6.073a1.03 1.03 0 0 1 1.455 1.456l-6.8 6.8a1.026 1.026 0 0 1-.728.302z" />
              </svg>
            </div>
            <div v-else-if="labelType === 'warning'">
              <svg :width="size * 0.2" :height="size * 0.2" class="progress-label-wrapper" :fill="textColor" viewBox="-1.7 0 20.4 20.4">
                <path d="M16.406 10.283a7.917 7.917 0 1 1-7.917-7.917 7.916 7.916 0 0 1 7.917 7.917zM9.48 14.367a1.003 1.003 0 1 0-1.004 1.003 1.003 1.003 0 0 0 1.004-1.003zM7.697 11.53a.792.792 0 0 0 1.583 0V5.262a.792.792 0 0 0-1.583 0z"/>
              </svg>
            </div>
            <div v-else-if="labelType === 'error'">
              <svg :width="size * 0.2" :height="size * 0.2" class="progress-label-wrapper" :fill="textColor" viewBox="-3.5 0 19 19">
                <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
              </svg>
            </div>
          </transition>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, type PropType } from 'vue'

const props = defineProps({
  size: { type: Number, default: 150 },
  fontSize: { type: Number, default: 20 },
  max: { type: Number, default: 100 },
  value: { type: Number, default: 0 },
  strokeWidth: { type: Number, default: 8 },
  type: { type: String as PropType<'progressBar' | 'dashboard'>, default: 'progressBar' },
  fill: { type: String, default: '#fff' },
  trackColor: { type: String, default: '#eee' },
  progressColor: { type: String, default: '#409EFF' },
  textColor: { type: String, default: '#909399' },
  showLabel: { type: Boolean, default: true },
  labelType: { type: String as PropType<'progress' | 'success' | 'warning' | 'error'>, default: 'progress' },
  strokeType: { type: String as PropType<'round' | 'butt'>, default: 'round' },
  changeColor: {type: Array as PropType<{color:string,value:number}[]>, default: []}
})

const isAnimating = ref(false)

const center = computed(() => props.size / 2)
const radius = computed(() => center.value - props.strokeWidth / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

const displayPercentage = computed(() => Math.round((props.value / props.max) * 100))
const progressCoef = computed(() => props.type === 'dashboard' ? 0.75 : 1)

const dashOffset = ref(circumference.value * (1 - props.value / props.max * progressCoef.value))
const circleTransform = computed(() => props.type === 'dashboard' ? `rotate(-225 ${center.value} ${center.value})` : `rotate(-90 ${center.value} ${center.value})`)
const dashArray = computed(() => (circumference.value * progressCoef.value))
const currentColor = computed(() => {
  const sorted = props.changeColor.sort((a, b) => a.value - b.value);
  for (let i = 0; i < sorted.length; i++) {
    if (Math.round((props.value / props.max) * 100) <= sorted[i].value) {
      return sorted[i].color;
    }
  }
  return sorted[sorted.length - 1].color; // если выше всех порогов
});

watch([() => props.type, () => props.value], () => {
  isAnimating.value = true
  dashOffset.value = circumference.value * (1 - props.value / props.max * progressCoef.value)
})

watch([() => props.size, () => props.strokeWidth], () => {
  isAnimating.value = false
  dashOffset.value = circumference.value * (1 - props.value / props.max * progressCoef.value)
})

</script>

<style scoped lang="scss">
.progress-wrapper {
  position: relative;
  display: grid;
  place-items: center;

  svg {
    transition: width 0.5s ease, height 0.5s ease;
    circle{
      transition: stroke 3.5s ease;
    }
  }
}

.progress-label {
  position: absolute;
  color: var(--text-color);
  font-size: var(--text-size);
  font-weight: bold;

  &-wrapper {
    display: flex;
  }
}
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.35s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-zoom-enter-to,
.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>