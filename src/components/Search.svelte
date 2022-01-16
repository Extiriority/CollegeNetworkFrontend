<script>
import { onMount } from 'svelte';
import rest from '../helpers/rest/index.ts';
import { baseConfig } from '../helpers/shared/configs.ts';

let allUsers, filteredUsers = []
let filters = {
	s: ''
}

onMount(async () => {
	rest.get('get_all_users',
		baseConfig
	).then(response => {
		if (response.status === 200) {
			allUsers = response.data;
			filteredUsers = response.data;
		}
	}).catch(err => {
		if (err.response) {
			console.log(err.response.status);
			alert('Error');
		}
	});
});


const filterChanged = () => {
	filteredUsers = allUsers.filter(u => u.firstName.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0)
}

const search = s => {
	filters.s = s;
	filterChanged();
}
</script>


<div class="flex flex-col max-w-md pl-10 w-full">
	<div class='rounded-lg shadow-2xl p-10 pl-20 pr-20 bg-white '>
		<h2 class="mt-2 text-3xl font-extrabold text-gray-900 ">
			Search
		</h2>
		<input type='text' aria-label="Search" placeholder='search person' class='border border-gray-500 rounded-2xl w-full pl-4 my-2' on:keyup={e => search(e.target.value)}/>
		<ul>
			{#each filteredUsers as user}
				<li class='border rounded-2xl border-purple-400 hover:bg-purple-100 pb-1 mt-1 text-center'>
					<a sveltekit:prefetch href="/profile/={user.id}">{user.firstName}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>