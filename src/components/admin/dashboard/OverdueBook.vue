<template>
    <div class="overflow-x-auto flex flex-col gap-y-5 rounded-md p-2">
        <h1 class="text-2xl font-semibold">
            Overdue Books Loan
        </h1>
        <div>
            <EasyDataTable :headers="headers" :items="items" :rows-per-page="4" :rows-items="[4]"
                table-class-name="customize-table" :loading="isLoading">
                <template #item-username="{user}">
                    {{ user.username }}
                </template>
                <template #item-title="{book}">
                    {{ book.title }}
                </template>
                <template #item-author="{book}">
                    {{ `${book.author.first_name} ${book.author.last_name}` }}
                </template>
                <template #item-status="item">
                    <p class="text-yellow-500">
                        {{ item.status }}
                    </p>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>
<script setup>
const headers = [
    {
        text: 'ID',
        value: 'id'
    },

    {
        text: 'Username',
        value: 'username'
    },
    {
        text: 'Title',
        value: 'title'
    },

    {
        text: 'Author',
        value: 'author'
    },

    {
        text: 'Overdue',
        value: 'status'
    },
    {
        text: 'Return',
        value: 'return_date'
    },

];

import { userBorrowStore } from '@/stores/borrowStore';
import { onMounted, ref } from 'vue';
const borrow = userBorrowStore()

const items = ref([])
const isLoading = ref(false)
const getBorrowingsOverdue = async () => {
    isLoading.value = true
    try {
        const res = await borrow.getBorrowingOverdue()
        console.log(res);
        items.value = [...res.data]

    } catch (error) {
        console.log(error);

    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await getBorrowingsOverdue()
})

</script>

<style scoped>
.customize-table {
    --easy-table-header-background-color: #0B1220;
    --easy-table-header-font-color: rgba(255, 255, 255, 0.771);


    --easy-table-body-row-background-color: #0B1220;
    --easy-table-body-row-font-color: rgba(255, 255, 255, 0.771);
    --easy-table-body-row-font-size : 11px;


    --easy-table-footer-background-color: #0B1220;
    --easy-table-footer-font-color: rgba(255, 255, 255, 0.771);

    --easy-table-row-border : 1px solid rgba(255, 255, 255, 0.771);
    --easy-table-body-row-hover-background-color: rgba(255, 255, 255, 0.431);

}
</style>