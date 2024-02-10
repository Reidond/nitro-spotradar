<script setup lang="ts">
const appName = 'SpotRadar';
</script>

<template>
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<NuxtLink to="/">
				<div class="flex flex-row items-center justify-center gap-2">
					<NuxtImg src="/logo.png" width="32" height="32" />
					<span class="font-bold"> {{ appName }} </span>
				</div>
			</NuxtLink>
			<div class="ml-auto flex items-center space-x-4" />
		</div>
	</div>
</template>
