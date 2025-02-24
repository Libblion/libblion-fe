<template>
    <div class="overflow-x-auto flex flex-col gap-y-5 rounded-md p-2">
        <h1  class="text-2xl font-semibold">Books Circulation History</h1>
        <div>
            <EasyDataTable :headers="headers" :items="items" :rows-per-page="4" :rows-items="[4]" table-class-name="customize-table">
              <template #item-status="{status}">
                <p class="text-yellow-600">
                  {{ status }}
                </p>
              </template>
            </EasyDataTable>
        </div>
    </div>
</template>
<script setup>

const headers = [
   {
    text : 'Title',value : 'title'
   },
   {
    text : 'Id',value : 'id'
   },
   {
    text : 'Date',value : 'borrowDate'
   },
   {
    text : 'Status',value : 'status'
   },
];

const items =  [
    {
      title: 'title1',
      id: '123',
      borrowDate: 'April 12,2025',
      status: 'Returned'
    },
    {
      title: 'title2',
      id: '1234',
      borrowDate: 'April 12,2025',
      status: 'Returned'
    },
    {
      title: 'title3',
      id: '1235',
      borrowDate: 'April 12,2025',
      status: 'Overdue'
    },
  ]


</script>

<style setup>
.customize-table{
    --easy-table-header-background-color : #0B1220;
    --easy-table-header-font-color : rgba(255, 255, 255, 0.771);


    --easy-table-body-row-background-color : #0B1220;
    --easy-table-body-row-font-color : rgba(255, 255, 255, 0.771);
    --easy-table-body-row-font-size : 10px;


    --easy-table-footer-background-color : #0B1220;
    --easy-table-footer-font-color:rgba(255, 255, 255, 0.771);

    --easy-table-border : none;
    --easy-table-body-row-hover-background-color : rgba(255, 255, 255, 0.431);

}
</style>