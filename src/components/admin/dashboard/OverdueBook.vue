<template>
    <div class="overflow-x-auto flex flex-col gap-y-5 rounded-md p-2">
        <h1 class="text-2xl font-semibold">
            Overdue Books Loan
        </h1>
        <div>
            <EasyDataTable :headers="headers" :items="items" :rows-per-page="4" :rows-items="[4]" table-class-name="customize-table"/>
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
        value: 'overdue_date'
    },
    {
        text: 'Return',
        value: 'return_date'
    },

];

const items = [
    { username: "Stephen Curry", author: "GSW",  id: 'G', title: "Davidson", overdue_date: "December 12,2025",return_date: "April 12,2025"},
    { username: "Lebron James", author: "LAL",id: 'F',  title: "St. Vincent-St. Mary HS (OH)", overdue_date: "December 12,2025",return_date: "April 12,2025"},
    { username: "Kevin Durant", author: "BKN",  id: 'F',  title: "Texas-Austin", overdue_date: "December 12,2025",return_date: "April 12,2025"},
    { username: "Giannis Antetokounmpo", author: "MIL",id: 'F',  title: "Filathlitikos", overdue_date: "11-02-2023",return_date: "11-02-2023" },
];

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