<template>
  <div>
    <h1>Список сотрудников</h1>
    <button @click="store.openModal()">Добавить сотрудника</button>
    <EmployeeTable />
    <EmployeeModal />
  </div>
</template>

<script setup>
import EmployeeTable from './components/EmployeeTable.vue'
import EmployeeModal from './components/EmployeeModal.vue'
import { useEmployeeStore } from './stores/employee'

const store = useEmployeeStore()
</script>