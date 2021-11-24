import Vue from 'vue';
import Vuex from 'vuex';
import contextmenu from './contextmenu';
import copy from './copy';
import layer from './layer';
import snapshot from './snapshot';
import lock from './lock';

Vue.use(Vuex);

const data = {
  state: {
    ...contextmenu.state,
    ...copy.state,
    ...layer.state,
    ...snapshot.state,
    ...lock.state,

    editMode: 'edit', // 编辑器模式 edit preview
    canvasStyleData: {
      // 页面全局数据
      width: 1200,
      height: 740,
      scale: 100,
    },
    componentData: [], // 画布组件数据
    curComponent: null,
    curComponentIndex: null,
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,
    editor: null,
  },
  mutations: {
    ...contextmenu.mutations,
    ...copy.mutations,
    ...layer.mutations,
    ...snapshot.mutations,
    ...lock.mutations,

    getEditor(state) {
      state.editor = document.querySelector('#editor');
    },

    setClickComponentStatus(state, status) {
      state.isClickComponent = status;
    },

    setEditMode(state, mode) {
      state.editMode = mode;
    },

    setCanvasStyle(state, style) {
      state.canvasStyleData = style;
    },

    setChartData(state, chart) {
      state.curComponent.chart = chart;
    },

    setCurComponent(state, { component, index }) {
      state.curComponent = component;
      state.curComponentIndex = index;
    },

    setShapeStyle({ curComponent }, { top, left, width, height }) {
      if (top) curComponent.style.top = top;
      if (left) curComponent.style.left = left;
      if (width) curComponent.style.width = width;
      if (height) curComponent.style.height = height;
    },

    setShapeSingleStyle({ curComponent }, { key, value }) {
      curComponent.style[key] = value;
    },

    setComponentData(state, componentData = []) {
      Vue.set(state, 'componentData', componentData);
    },

    addComponent(state, { component, index }) {
      if (index !== undefined) {
        state.componentData.splice(index, 0, component);
      } else {
        state.componentData.push(component);
      }
    },

    deleteComponent(state, index) {
      if (index === undefined) {
        index = state.curComponentIndex;
      }

      if (index == state.curComponentIndex) {
        state.curComponentIndex = null;
        state.curComponent = null;
      }

      state.componentData.splice(index, 1);
    },
  },
};

export default new Vuex.Store(data);
