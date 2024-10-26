<template>
  <div class="custom-dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      {{ selectedLabel }}
    </button>
    <div v-if="isDropdownOpen" class="dropdown-options">
      <div v-for="option in options" :key="option.id" class="dropdown-option">
        <input
          :id="option.id"
          v-model="selectedOptions"
          type="checkbox"
          :value="option.value"
          @change="handleSelection"
        />
        <label :for="option.id">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      options: [
        { id: 1, label: 'Option 1', value: 'option1' },
        { id: 2, label: 'Option 2', value: 'option2' },
        { id: 3, label: 'Option 3', value: 'option3' },
      ],
      selectedOptions: [],
    }
  },
  computed: {
    selectedLabel() {
      return this.selectedOptions.length > 0
        ? `${this.selectedOptions.length} selected`
        : 'Select options'
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    handleSelection() {
      // Custom logic for handling selections, if needed
    },
  },
}
</script>

<style scoped>
.custom-dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.dropdown-option {
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
