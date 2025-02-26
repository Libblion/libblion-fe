<template>
  <div class="overflow-x-auto flex flex-col gap-y-5 rounded-md p-2">
    <h1 class="text-2xl font-semibold">Books Circulation History</h1>
    <div class="flex justify-center items-center h-full">
      <EasyDataTable :headers="headers" :items="items" :rows-per-page="4" :rows-items="[4]"
        table-class-name="customize-table">
        <template #item-status="{ status }">
          <p class="text-green-600">
            {{ status }}
          </p>
        </template>
        <template #item-created_at={created_at}>
          {{ new Date(created_at).toDateString() }}
        </template>
      </EasyDataTable>
    </div>
  </div>
</template>
<script setup>
import { userBorrowStore } from '@/stores/borrowStore';
import { onMounted, ref } from 'vue';

const isLoading = ref(false)

const headers = [
  {
    text: 'Title', value: 'book.title'
  },
  {
    text: 'Id', value: 'id'
  },
  {
    text: 'Date', value: 'created_at'
  },
  {
    text: 'Status', value: 'status'
  },
];

const items = ref([])

const borrow = userBorrowStore()
const getBorrowingReturned = async ()=>{
  isLoading.value = true
  try {
    const res = await borrow.getBorrowing()
    items.value = res.data
    console.log(items.value);
    
  } catch (error) {
    console.log(error);
    
  }finally{
    isLoading.value = false
  }
}
onMounted(async()=>{
  await getBorrowingReturned()
})
</script>

<style scoped>
.customize-table {
  --easy-table-header-background-color: #0B1220;
  --easy-table-header-font-color: rgba(255, 255, 255, 0.771);


  --easy-table-body-row-background-color: #0B1220;
  --easy-table-body-row-font-color: rgba(255, 255, 255, 0.771);
  --easy-table-body-row-font-size: 11px;


  --easy-table-footer-background-color: #0B1220;
  --easy-table-footer-font-color: rgba(255, 255, 255, 0.771);
  --easy-table-row-border : 1px solid rgba(255, 255, 255, 0.771);

  --easy-table-border: none;
  --easy-table-body-row-hover-background-color: rgba(255, 255, 255, 0.431);

}
</style>