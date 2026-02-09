<template>
  <div class="container">
    <h1>Список сотрудников</h1>

    <button class="btn-add" @click="openAddModal">Добавить сотрудника</button>

    <!-- Десктоп: таблица -->
    <table class="employees-table desktop-table">
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

    <!-- Мобильные: карточки -->
    <div class="mobile-cards">
      <div v-for="(emp, index) in employees" :key="index" class="employee-card">
        <div class="card-content">
          <div class="card-row"><strong>Имя:</strong> {{ emp.firstName }}</div>
          <div class="card-row"><strong>Фамилия:</strong> {{ emp.lastName }}</div>
          <div class="card-row"><strong>Стаж:</strong> {{ emp.experience }} лет</div>
          <div class="card-row"><strong>Возраст:</strong> {{ emp.age }}</div>
          <div class="card-row"><strong>Адрес:</strong> {{ emp.address }}</div>
        </div>
        <div class="card-actions">
          <button class="btn-edit" @click="openEditModal(index)">Редактировать</button>
          <button class="btn-delete" @click="deleteEmployee(index)">Удалить</button>
        </div>
      </div>
    </div>

    <!-- Модал -->
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
import EmployeeModal from './components/EmployeeModal.vue' // путь к модалке

const employees = ref([])               // массив сотрудников

const modalOpen = ref(false)            // открыт ли модал
const modalMode = ref('add')            // 'add' или 'edit'
const editingEmployee = ref(null)       // данные редактируемого сотрудника
const editingIndex = ref(-1)            // индекс в массиве

// Загружаем из localStorage
const loadEmployees = () => {
  const saved = localStorage.getItem('employees')
  if (saved) employees.value = JSON.parse(saved)
}

// Автосохранение при изменении
watch(employees, (newList) => {
  localStorage.setItem('employees', JSON.stringify(newList))
}, { deep: true })

loadEmployees() // грузим сразу

// Открываем модал для добавления
const openAddModal = () => {
  modalMode.value = 'add'
  editingEmployee.value = null
  editingIndex.value = -1
  modalOpen.value = true
}

// Открываем для редактирования
const openEditModal = (index) => {
  modalMode.value = 'edit'
  editingEmployee.value = { ...employees.value[index] } // копия
  editingIndex.value = index
  modalOpen.value = true
}

// Закрываем модал и чистим
const closeModal = () => {
  modalOpen.value = false
  modalMode.value = 'add'
  editingEmployee.value = null
  editingIndex.value = -1
}

// Обрабатываем сохранение из модал
const handleSave = (updatedEmployee) => {
  if (modalMode.value === 'edit' && editingIndex.value >= 0) {
    employees.value[editingIndex.value] = updatedEmployee
  } else {
    employees.value.push(updatedEmployee)
  }
  closeModal()
}

// Удаляем сотрудника
const deleteEmployee = (index) => {
  if (confirm('Удалить?')) {
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

.container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 16px;
}

/* Десктоп-таблица */
.desktop-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.desktop-table th,
.desktop-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.desktop-table thead {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-weight: 600;
}

.desktop-table tr:hover { background: #f8f9fa; }

/* Кнопки в десктопе */
.btn-edit, .btn-delete {
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-right: 8px;
}

.btn-edit { background: #f59e0b; }
.btn-delete { background: #ef4444; }

/* Мобильная версия — карточки */
.mobile-cards {
  display: none;
}

.employee-card {
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card-content {
  display: grid;
  gap: 8px;
  margin-bottom: 12px;
}

.card-row {
  font-size: 0.95rem;
}

.card-row strong {
  color: #4f46e5;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.card-actions .btn-edit,
.card-actions .btn-delete {
  flex: 1;
  padding: 12px;
  font-size: 1rem;
}

/* Адаптив — переключаем на карточки */
@media (max-width: 768px) {
  .desktop-table { display: none; }
  .mobile-cards { display: block; }

  .container { padding: 1rem 0.5rem; margin: 20px auto; }
  h1 { font-size: 1.8rem; margin-bottom: 1.5rem; }
  .btn-add { width: 100%; padding: 14px; font-size: 1.1rem; margin-bottom: 1.5rem; }
}

/* Очень маленькие экраны */
@media (max-width: 480px) {
  h1 { font-size: 1.5rem; }
  .btn-add { font-size: 1rem; padding: 12px; }

  .card-content { font-size: 0.9rem; }
  .card-actions {
    flex-direction: column;
    gap: 10px;
  }
  .card-actions button {
    width: 100%;
    padding: 12px;
  }
}
</style>