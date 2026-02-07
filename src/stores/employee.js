import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEmployeeStore = defineStore('employee', () => {
  // State (Model)
  const employees = ref([]);
  const isModalOpen = ref(false);
  const editingEmployee = ref(null);
  const editingIndex = ref(-1);

  // Getters (Computed свойства для чтения)
  const getEmployees = () => employees.value;

  // Actions (Controller логика)
  const loadEmployees = () => {
    const stored = localStorage.getItem('employees');
    if (stored) {
      employees.value = JSON.parse(stored);
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees.value));
  };

  const addEmployee = (employee) => {
    employees.value.push(employee);
    saveToLocalStorage();
  };

  const updateEmployee = (index, employee) => {
  if (index >= 0 && index < employees.value.length) {
    employees.value[index] = { ...employee }  // копия для безопасности
    saveToLocalStorage()
  } else {
    console.warn('Неверный индекс при обновлении:', index)
  }
}

  const deleteEmployee = (index) => {
    employees.value.splice(index, 1);
    saveToLocalStorage();
  };

  const openModal = (index = -1) => {
  console.log('openModal вызван с index =', index);

  if (typeof index === 'number' && index >= 0 && index < employees.value.length) {
    console.log('Режим редактирования, копируем сотрудника #', index);
    editingEmployee.value = { ...employees.value[index] };
    editingIndex.value = index;
  } else {
    console.log('Режим создания нового сотрудника');
    editingEmployee.value = { firstName: '', lastName: '', experience: 0, age: 0, address: '' };
    editingIndex.value = -1;
  }

  isModalOpen.value = true;
  console.log('После открытия: editingIndex =', editingIndex.value);
};

const closeModal = () => {
  isModalOpen.value = false
}

  // Инициализация
  loadEmployees();

  return {
    employees,
    isModalOpen,
    editingEmployee,
    editingIndex,
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    openModal,
    closeModal
  };
});