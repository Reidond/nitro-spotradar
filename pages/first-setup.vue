<template>
	<div>
		<AppHeader />
		<div class="container max-w-[1440px] flex-1 p-8 pt-6">
			<div class="flex flex-col items-center justify-center space-y-4">
				<h1 class="text-4xl font-bold">Welcome to {{ appName }}</h1>
				<p class="text-lg text-center">
					We need to set up your account before you can start using {{ appName }}.
				</p>
				<div class="w-full">
					<ChoosePlaylist />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ChoosePlaylist from '~/components/first-setup/ChoosePlaylist.vue';

const appName = 'SpotRadar';
definePageMeta({
	middleware: ['check-first-setup'],
});
useHeadSafe({
	title: 'First Setup',
	titleTemplate: `%s | ${appName}`,
	bodyAttrs: {
		class: 'bg-background text-foreground font-bm dark',
	},
});
</script>
