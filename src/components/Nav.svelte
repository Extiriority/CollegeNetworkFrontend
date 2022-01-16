<script>
    import { authenticated } from '../helpers/shared/stores';
    import { onMount } from "svelte";
    import rest from '../helpers/rest/index.ts';
    import { baseConfig } from '../helpers/shared/configs.ts';

    let auth = false;
    let message
    let error
    let name
    authenticated.subscribe(a => auth = a);

    onMount( async () => {
        rest.get('user',
            baseConfig
        ).then(response => {
            if (response.status === 200) {
                const content = response.data;
                name = content.firstName
                message = `Hi ${name}`;
                authenticated.set(true);
            }
        }).catch(() => {
            console.log('you are not logged in')
        })
    });

    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        authenticated.set(false);
        window.location = '/login'
    }
</script>

<header class="w-full top-0 z-40 bg-white py-3 px-8 shadow-2xl shadow-indigo-500/50">
    <div class="flex justify-between">
        <a href="/" class="flex items-center">
            <img src={"/src/resources/fontys.svg"} alt="Logo" width="40" height="40"/>
        </a>
        <nav class="flex items-center">
            {#if auth}
                <ul class="flex font-medium text-xl text-black pl-3.5">
                    <li class="mx-2">
                      <a class="hover:text-purple-500" sveltekit:prefetch href="/profile/@{name}">{name}</a>
                    </li>
                    <li class="mx-2">
                      <a class="hover:text-red-500" data-cy='logout' sveltekit:prefetch href="/" on:click|preventDefault={logout}>Logout</a>
                    </li>
                </ul>
            {:else }
                <ul class="flex font-medium text-xl text-black pl-3.5">
                    <li class="mx-2">
                        <a class="hover:text-purple-500" sveltekit:prefetch href="/login">Login</a>
                    </li>
                    <li class="mx-2">
                        <a class="hover:text-purple-500" sveltekit:prefetch href="/register">Register</a>
                    </li>
                </ul>
            {/if}
        </nav>
    </div>
</header>