import { ref, watch } from "vue";

export function formatToID(title) {
  return title.replaceAll(" ", "-").toLowerCase();
}

/**
 * Creates a ref which sync changes with localStorage
 * Use this to create persistent settings configs
 * if the intialValue is a object it will compare it deeply,
 * do not use this if there are more than 10 settings,
 * better to create multiple localStorageRef instead
 * @param {string} key - key of the localStorage entry
 * @param {T} initialValue - The initialValue to use for the ref
 * @returns {ref<T>}
 */
export function localStorageRef(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  if (!!!initialValue || typeof key != "string") throw new Error("Valid key not provided for localStorageRef");
  const reactiveValue = ref(storedValue ? JSON.parse(storedValue) : initialValue);
  watch(
    reactiveValue,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  return reactiveValue;
}
