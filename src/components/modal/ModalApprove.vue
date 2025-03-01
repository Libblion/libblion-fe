<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[9999]"
        @click.self="close"
    >
        <div
            class="bg-white p-6 rounded-lg shadow-2xl w-96 relative transition-all duration-300 ease-out"
        >
            <button
                @click="close"
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
                <font-awesome-icon icon="fa-solid fa-times" />
            </button>
            <h3 class="text-lg font-semibold text-gray-800">
                {{ title }}
            </h3>
            <p class="text-gray-600 mt-2">
                {{ message }}
            </p>

            <div class="mt-4 flex justify-end space-x-3">
                <button
                    class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                    @click="confirm"
                >
                    {{ confirmText }}
                </button>
                <button
                    @click="close"
                    class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                >
                    {{ cancelText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from "vue";

const props = defineProps({
    title: {
        type: String,
        default: "Konfirmasi",
    },
    message: {
        type: String,
        default: "Apakah Anda yakin?",
    },
    confirmText: {
        type: String,
        default: "Ya",
    },
    cancelText: {
        type: String,
        default: "Batal",
    },
});

const emit = defineEmits(["confirm", "close"]);
const isOpen = ref(false);
const itemId = ref(null);

const open = (id) => {
    itemId.value = id;
    isOpen.value = true;
};

const close = () => {
    isOpen.value = false;
    emit("close");
};

const confirm = () => {
    emit("confirm", itemId.value);
    close();
};

defineExpose({ open });
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0px;
}
</style>
