<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-window">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-btn" @click="close">×</button>
      </div>

      <form @submit.prevent="handleSave" class="modal-form">
        <div class="form-field">
          <label>Имя</label>
          <input v-model="form.firstName" required placeholder="Иван" />
        </div>

        <div class="form-field">
          <label>Фамилия</label>
          <input v-model="form.lastName" required placeholder="Иванов" />
        </div>

        <div class="form-field">
          <label>Стаж (лет)</label>
          <input v-model.number="form.experience" type="number" min="0" required placeholder="3" />
        </div>

        <div class="form-field">
          <label>Возраст</label>
          <input v-model.number="form.age" type="number" min="16" max="100" required placeholder="30" />
        </div>

        <div class="form-field">
          <label>Адрес</label>
          <input v-model="form.address" required placeholder="г. Москва, ул. Ленина, 10" />
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" @click="close">
            Отмена
          </button>
          <button type="submit" class="btn btn-save">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  mode: { type: String, default: 'add' }, // 'add' или 'edit'
  employee: { type: Object, default: null } // только для edit
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  firstName: '',
  lastName: '',
  experience: 0,
  age: 0,
  address: ''
})

const title = computed(() => {
  return props.mode === 'edit' ? 'Редактировать сотрудника' : 'Добавить сотрудника'
})

// Заполняем форму при открытии (для редактирования)
watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      if (props.mode === 'edit' && props.employee) {
        Object.assign(form, props.employee)
      } else {
        Object.assign(form, { firstName: '', lastName: '', experience: 0, age: 0, address: '' })
      }
    }
  },
  { immediate: true }
)

const handleSave = () => {
  emit('save', { ...form })
  emit('close')
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-window {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.modal-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

.modal-form {
  padding: 24px;
}

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.form-field input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.form-field input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.btn {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

.btn-save {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}
</style>