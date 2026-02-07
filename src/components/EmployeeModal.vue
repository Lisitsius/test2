<template>
  <div v-if="store.isModalOpen" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isEditing ? 'Редактировать сотрудника' : 'Добавить сотрудника' }}</h2>
        <span class="close" @click="store.closeModal()">&times;</span>
      </div>
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="firstName">Имя</label>
          <input v-model="form.firstName" id="firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Фамилия</label>
          <input v-model="form.lastName" id="lastName" required />
        </div>
        <div class="form-group">
          <label for="experience">Стаж (лет)</label>
          <input v-model.number="form.experience" type="number" id="experience" min="0" required />
        </div>
        <div class="form-group">
          <label for="age">Возраст</label>
          <input v-model.number="form.age" type="number" id="age" min="16" max="100" required />
        </div>
        <div class="form-group">
          <label for="address">Адрес</label>
          <input v-model="form.address" id="address" required />
        </div>
        <div class="actions">
          <button type="button" @click="store.closeModal()">Отмена</button>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import { useEmployeeStore } from '../stores/employee'

const store = useEmployeeStore()

const form = reactive({
  firstName: '',
  lastName: '',
  experience: 0,
  age: 0,
  address: ''
})

// Самая безопасная версия isEditing
const isEditing = computed(() => {
  return store.editingIndex?.value >= 0 ?? false
})

// Watch — уже хороший, но оставляем как есть
watch(
  () => store.editingEmployee?.value,  // ← добавили ?.
  (newVal) => {
    if (newVal) {
      Object.assign(form, newVal)
    } else {
      Object.assign(form, {
        firstName: '', lastName: '', experience: 0, age: 0, address: ''
      })
    }
  },
  { immediate: true }
)

const save = () => {
  console.log('--- SAVE вызван ---');
  console.log('Текущий editingIndex.value:', store.editingIndex.value);
  console.log('isEditing.value:', isEditing.value);
  console.log('Форма перед сохранением:', { ...form });

  const employee = { ...form };

  if (isEditing.value) {
    const idx = store.editingIndex.value;
    console.log('РЕЖИМ РЕДАКТИРОВАНИЯ → обновляем индекс', idx);
    store.updateEmployee(idx, employee);
  } else {
    console.log('РЕЖИМ СОЗДАНИЯ → добавляем нового');
    store.addEmployee(employee);
  }
  
  
  store.closeModal();
};
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 28px;
  border-radius: 12px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.close {
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  color: #95a5a6;
}
.close:hover {
  color: #7f8c8d;
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  box-sizing: border-box;
}
input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52,152,219,0.15);
}
.actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}
.actions button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.05rem;
}
.actions button[type="submit"] {
  background: #3498db;
  color: white;
}
.actions button[type="button"] {
  background: #bdc3c7;
  color: #333;
}
</style>