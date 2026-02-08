<template>
  <div class="container">
    <h1>Список сотрудников</h1>

    <button class="btn-add" @click="openAddModal">Добавить сотрудника</button>

    <table class="employees-table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Стаж</th>
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
            <button class="btn-edit" @click="openEditModal(index)">Редактировать</button>
            <button class="btn-delete" @click="deleteEmployee(index)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <EmployeeModal
      :is-open="modalOpen"
      :mode="modalMode"
      :employee="editingEmployee"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import EmployeeModal from './components/EmployeeModal.vue' // скорректируй путь

const employees = ref([])

const modalOpen = ref(false)
const modalMode = ref('add')
const editingEmployee = ref(null)
const editingIndex = ref(-1)

// Загрузка из localStorage
const loadEmployees = () => {
  const saved = localStorage.getItem('employees')
  if (saved) {
    employees.value = JSON.parse(saved)
  }
}

// Автосохранение при любом изменении
watch(employees, (newList) => {
  localStorage.setItem('employees', JSON.stringify(newList))
}, { deep: true })

// Загружаем сразу
loadEmployees()

const openAddModal = () => {
  modalMode.value = 'add'
  editingEmployee.value = null
  editingIndex.value = -1
  modalOpen.value = true
}

const openEditModal = (index) => {
  modalMode.value = 'edit'
  editingEmployee.value = { ...employees.value[index] }
  editingIndex.value = index
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  modalMode.value = 'add'
  editingEmployee.value = null
  editingIndex.value = -1
}

const handleSave = (updatedEmployee) => {
  if (modalMode.value === 'edit' && editingIndex.value >= 0) {
    employees.value[editingIndex.value] = updatedEmployee
  } else {
    employees.value.push(updatedEmployee)
  }
  closeModal()
}

const deleteEmployee = (index) => {
  if (confirm('Удалить сотрудника?')) {
    employees.value.splice(index, 1)
  }
}
</script>

<style scoped>
.container { max-width: 1000px; margin: 40px auto; padding: 0 20px; }
h1 { text-align: center; color: #2c3e50; margin-bottom: 30px; }

.btn-add {
  background: linear-gradient(135deg, #50c7829a 0%, #27ae60 100%); 
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-bottom: 30px;
}

.btn-add:hover { background: #219653; }

.employees-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 12px;
  overflow: hidden;
}

.employees-table th,
.employees-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.employees-table thead {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  font-weight: 600;
}
.employees-table thead tr:hover{
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.employees-table tr:hover { background: #f0f0f0; }

.btn-edit {
  background: #f39c12 linear-gradient(100deg, #f39c12 10%, #e74c3c 100%);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  margin-right: 8px;
  cursor: pointer;
}

.btn-delete {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>