<template>
    <section class="h-full flex items-center  max-lg:justify-between max-lg:px-5">
        <button @click="showSidebar" class="-rotate-90 cursor-pointer lg:hidden">
            <font-awesome-icon icon="fa-solid fa-caret-down" size="lg"/>
        </button>
        <h1 class="font-libre-text text-2xl cursor-pointer" @click="showSidebar">Libblion</h1>
    </section>
</template>

<script setup>

const props = defineProps({
    isSidebar : {
        default : false
    }
})

const emits = defineEmits(['showSidebar'])

const showSidebar = ()=>{
    return emits('showSidebar',props.isSidebar)
}

</script>