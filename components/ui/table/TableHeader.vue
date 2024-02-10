<script setup lang="ts">
import { cn } from '@/composables/use-theme.ts';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
	class?: HTMLAttributes['class'];
}>();
</script>

<template>
	<thead :class="cn('[&_tr]:border-b', props.class)">
		<slot />
	</thead>
</template>
