<script>

    import Login from "./modals/Login.svelte";
    import {openModal} from "svelte-modals";
    import Register from "./modals/Register.svelte";
</script>


<nav class="navbar navbar-expand-lg bg-dark text-white mb-5"
     style="width: 100% !important;background-color: #212121 !important">
    <div class="container-fluid">
        <a class="navbar-brand text-white fw-light" href="#">Pharma Card Game</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">


        </div>
        <div class="d-flex justify-content-between ">
            <button class="btn btn-outline-success me-auto mx-2" type="submit" on:click={()=>{
                openModal(Login)
            }}>Login
            </button>

            <button class="btn btn-outline-success me-auto mx-2" type="submit" on:click={()=>{
                openModal(Register)
            }}>Register
            </button>
        </div>
    </div>
</nav>
