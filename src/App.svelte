<script>
    import svelteLogo from './assets/svelte.svg'
    import Counter from './lib/Counter.svelte'
    import drugs from './assets/list_for_game.json'
    import {SvelteToast, toast} from '@zerodevx/svelte-toast'

    let first_choice, second_choice, choice_count = 0;

    function choose(choices) {
        let index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    let chosen_drugs = []
    for (let i = 0; i < 18; i++) {
        chosen_drugs = [...chosen_drugs, choose(drugs)]

    }

    let cells = []
    chosen_drugs.forEach(element => {
        cells = [...cells, {
            id: element.id,
            type: 'image',
            value: element.name,
            selected: false,
            done: false
        }]
        cells = [...cells, {
            id: element.id,
            type: 'text',
            value: element.name,
            selected: false,
            done: false
        }]
    })
    const reshaped_cells = [];
    const card_holder = [];
    while (cells.length) {
        reshaped_cells.push(shuffle(cells).splice(0, 6));
        card_holder.push(new Array(6))
    }

    const getCell = (x, y) => {
        reshaped_cells[x][y].selected = true

        if (choice_count === 0) {
            first_choice = reshaped_cells[x][y]
            choice_count = 1
        } else if (choice_count === 1) {
            second_choice = reshaped_cells[x][y]

            if (first_choice.id === second_choice.id) {
                toast.push('Correct')
                let first_choice_pos = findWithValue(first_choice)
                let second_choice_pos = findWithValue(second_choice)
                reshaped_cells[first_choice_pos['x']][first_choice_pos['y']].done = true
                reshaped_cells[second_choice_pos['x']][second_choice_pos['y']].done = true
            } else {
                toast.push('False')
            }
            choice_count = 0
            resetWholeCells()
        }
    }

    const resetWholeCells = () => {
        reshaped_cells.forEach(row => {
            row.forEach(drug => {
                drug.selected = false
            })
        })
    }

    const findWithValue = (value) => {
        let drug_to_return = null
        reshaped_cells.forEach((row, x) => {
            row.forEach((drug, y) => {
                if (drug.id === value.id && drug.type === value.type) {
                    drug_to_return = {x, y}
                }
            })
        })
        console.log(drug_to_return)
        return drug_to_return
    }

</script>
<SvelteToast/>
<div class="container-fluid">
    {#each reshaped_cells as row,x}
        <div class="row">
            {#each row as drug ,y}
                {#if drug.done}
                    <div class="col-lg-2 col-md-4 col-sm-6 p-1 justify-content-center text-center py-4">
                        <p class="my-4">done</p>
                    </div>
                {:else}
                    {#if drug.type === 'text'}
                        <div class="col-lg-2 col-md-4 col-sm-6 p-1">
                            <button bind:this={card_holder[x][y]}
                                    class="h-100 w-100 structure-image {reshaped_cells[x][y].selected?'structure-image-selected' : ''}"
                                    on:click={()=>{getCell(x,y)}}>
                                {drug.value}
                            </button>
                        </div>
                    {:else}
                        <div class="col-lg-2 col-md-4 col-sm-6 p-1">
                            <img src={'/drugs/'+drug.value+'.png'} alt=""
                                 class="structure-image  {reshaped_cells[x][y].selected?'structure-image-selected' : ''}"
                                 on:click={()=>{getCell(x,y)}}>
                        </div>
                    {/if}
                {/if}
            {/each}
        </div>
    {/each}
</div>

<style>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
    }

    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }

    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00aa);
    }

    .read-the-docs {
        color: #888;
    }
</style>
