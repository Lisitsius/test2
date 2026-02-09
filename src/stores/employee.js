import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEmployeeStore = defineStore('employee', () => {
  // Данные сотрудников 
  const employees = ref([]);

  // Состояние модального окна
  const isModalOpen = ref(false);
  const editingEmployee = ref(null);   // текущий редактируемый сотрудник
  const editingIndex = ref(-1);        // индекс в массиве (для обновления)

  //возвращает сотрудников
  const getEmployees = () => employees.value;

  // Загружаем данные из localStorage при запуске
  const loadEmployees = () => {
    const saved = localStorage.getItem('employees');
    if (saved) {
      employees.value = JSON.parse(saved);
    }
  };

  // Сохраняем текущее состояние в localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees.value));
  };

  // Добавляем нового сотрудника
  const addEmployee = (employee) => {
    employees.value.push(employee);
    saveToLocalStorage();
  };

  // Обновляем существующего по индексу
  const updateEmployee = (index, employee) => {
    if (index >= 0 && index < employees.value.length) {
      employees.value[index] = { ...employee };  // копия, чтобы не мутировать входные данные
      saveToLocalStorage();
    } else {
      console.warn('Неверный индекс при обновлении:', index);
    }
  };

  // Удаляем сотрудника по индексу
  const deleteEmployee = (index) => {
    employees.value.splice(index, 1);
    saveToLocalStorage();
  };

  // Открываем модалку (добавление или редактирование)
  const openModal = (index = -1) => {
    console.log('openModal вызван с index =', index);

    if (typeof index === 'number' && index >= 0 && index < employees.value.length) {
      console.log('Режим редактирования, копируем сотрудника #', index);
      editingEmployee.value = { ...employees.value[index] }; // копия
      editingIndex.value = index;
    } else {
      console.log('Режим создания нового сотрудника');
      editingEmployee.value = { firstName: '', lastName: '', experience: 0, age: 0, address: '' };
      editingIndex.value = -1;
    }

    isModalOpen.value = true;
    console.log('После открытия: editingIndex =', editingIndex.value);
  };

  // Закрываем модалку
  const closeModal = () => {
    isModalOpen.value = false;
  };

  // Загружаем данные при создании стора
  loadEmployees();

  // Возвращаем всё, что нужно компонентам
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