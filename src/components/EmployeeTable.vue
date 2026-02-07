<template>
  <table>
    <thead>
      <tr>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Стаж (лет)</th>
        <th>Возраст</th>
        <th>Адрес</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(emp, index) in employees" :key="index">
        <td>{{ emp.firstName }}</td>
        <td>{{ emp.lastName }}</td>
        <td>{{ emp.experience }}</td>
        <td>{{ emp.age }}</td>
        <td>{{ emp.address }}</td>
        <td>
          <button class="edit" @click="editEmployee(index)">✏️</button>
          <button class="delete" @click="deleteEmployee(index)">🗑</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useEmployeeStore } from '../stores/employee';

const store = useEmployeeStore();
const { employees, openModal, deleteEmployee } = store;

const editEmployee = (index) => {
  store.openModal(index)
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 8px;
  overflow: hidden;
}
th, td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
th {
  background: #34495e;
  color: white;
}
tr:hover {
  background: #f8f9fa;
}
button {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit {
  background: #f39c12;
  color: white;
  margin-right: 8px;
}
.delete {
  background: #e74c3c;
  color: white;
}
</style>