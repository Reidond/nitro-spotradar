<script setup lang="ts">
import { Button } from '~/components/ui/button';

const { data } = useGetSpotifyPlaylists();
const spotifyPlaylist = useCookie('spotify:current_playlist');
const items = computed(() => {
	return data.value?.items || [];
});
</script>

<template>
	<div
		:class="
			cn([
				'flex',
				'w-full',
				'flex-col',
				'items-start',
				'justify-between',
				'rounded-md',
				'border',
				'border-t-0',
				'rounded-t-none',
				'rounded-b-none',
				'px-4',
				'py-3',
				'sm:flex-row',
				'sm:items-center',
				'first:rounded-t-md',
				'first:border-t',
				'last:rounded-b-md',
				spotifyPlaylist && spotifyPlaylist === playlist.id && 'dark:bg-green-800 bg-green-200',
			])
		"
		v-for="playlist in items"
		:key="playlist.id"
	>
		<p class="text-sm font-normal leading-none">
			<span class="mr-2 rounded-lg bg-secondary px-2 py-1 text-xs text-secondary-foreground">
				{{ playlist.id }}
			</span>
			<span class="text-muted-foreground">
				{{ playlist.name }}
			</span>
		</p>
		<Button variant="secondary" @click="spotifyPlaylist = playlist.id">
			<span>Choose</span>
		</Button>
	</div>
</template>
