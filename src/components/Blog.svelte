<script>
	import { onMount } from 'svelte';
	import rest from '../helpers/rest/index.ts';
	import { authConfig, baseConfig } from '../helpers/shared/configs.ts';

	let content
	let posts = []
	export let userId


	const postMessage = async () => {
		const json = JSON.stringify({userId, content})
		await rest.post('postMsg',
			json,
			authConfig
		).catch(err => {
			if (err.response) {
				console.log(err.response.status);
				alert('Error');
			}
		});
	};

	onMount(async () => {
		rest.get('get_all_posts',
			baseConfig
		).then(response => {
			if (response.status === 200) {
				posts = response.data;
			}
		}).catch(err => {
			if (err.response) {
				console.log(err.response.status);
				alert('Error');
			}
		});
	});
</script>


<div class="flex flex-col max-w-2xl pl-10 w-full">
		<form on:submit={postMessage} class='rounded-lg shadow-2xl p-10 pl-20 pr-20 bg-white '>
				<h2 class="mt-2 text-3xl font-extrabold text-gray-900">
						Feed
				</h2>
				<input bind:value={content} type='text' class='border border-gray-500 rounded-sm  mt-5 pl-2 py-4 w-full'>
				<button
						class="w-full mt-5 py-2 px-4 bg-purple-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
						type="submit">post
				</button>
				{#each posts as post}
						<div class='border rounded-xl pb-1 mt-1 px-3'>
								{post.content}
								<div class='flex justify-between'>
										<div>
												~ {post.user_id}
										</div>
								</div>
						</div>
				{/each}
		</form>
</div>



