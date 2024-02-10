<template>
	<div>
		<AppHeader />
		<div class="container max-w-[1440px] flex-1 p-8 pt-6"></div>
	</div>
</template>

<script setup lang="ts">
const appName = 'SpotRadar';
definePageMeta({
	middleware: ['check-first-setup'],
});
useHeadSafe({
	title: 'Home',
	titleTemplate: `%s | ${appName}`,
	bodyAttrs: {
		class: 'bg-background text-foreground font-bm dark',
	},
});
</script>
