<script lang="ts">
	import { page } from '$app/state';
	import ErrorMessage from '$lib/components/ErrorMessage/ErrorMessage.svelte';
</script>

<ErrorMessage status={page.status} />
