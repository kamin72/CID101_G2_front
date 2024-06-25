<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" :width="size" :height="size">
        <circle cx="50" cy="50" r="42" fill="none" :stroke="color" stroke-width="5" />
        <path class="checkmark" d="M30 50 L45 65 L70 40" fill="none" :stroke="color" stroke-width="6"
            stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script>
export default {
    name: 'GreenCheckmark',
    props: {
        size: {
            type: Number,
            default: 100
        },
        color: {
            type: String,
            default: '#4CAF50'
        }
    }
}
</script>

<style scoped>
.checkmark {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    animation: draw 1s cubic-bezier(0.83, 0, 0.17, 1) forwards;
}

@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}
</style>