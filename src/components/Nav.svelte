<script>
    import {authenticated} from '$lib/shared/stores';
    import {goto} from "$app/navigation";
    import Fontys from "../resources/fontys.svg"
    import {onMount} from "svelte";

    let auth = false;
    let message
    let error
    let name
    authenticated.subscribe(a => auth = a);

    onMount( async () => {
        error = undefined
        try {
            const response = await fetch('http://localhost:8000/api/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
            if (response.ok) {
                const user = await response.json();
                console.log(user)
                name = user.firstName
                message = `Hi ${name}`;
                authenticated.set(true);
            } else {
                message = 'You are not logged in';
                authenticated.set(false);
            }
        } catch (err) {
            console.log(err)
            message = '';
            error = 'An error occurred'
        }
    });

    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        authenticated.set(false);
        await goto('/login')
    }
</script>

<header class="sticky bg-white py-3 px-8 shadow-2xl">
    <div class="flex justify-between">
        <a href="/" class="flex items-center">
            <img src={Fontys} alt="Logo" width="40" height="40"/>
            <div class="font-medium text-xl text-black pl-3.5">Fontys Network</div>
        </a>
        <nav class="flex items-center">
            {#if auth}
                <ul class="flex font-medium text-xl text-black pl-3.5">
                    <li class="mx-2">
                      <a class="hover:text-purple-500" sveltekit:prefetch href="/profile/@{name}">{name}</a>
                    </li>
                    <li class="mx-2">
                      <a class="hover:text-purple-500" sveltekit:prefetch href="/" on:click|preventDefault={logout}>Logoutt</a>
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