import Vue from 'vue';

export function swap(arr, i, j) {
  const temp = arr[i];
  Vue.set(arr, i, arr[j]);
  Vue.set(arr, j, temp);
}
