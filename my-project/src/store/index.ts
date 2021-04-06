import Vue from 'vue'
import Vuex from 'vuex'
import { 
  SET_TASK, 
  SET_NEW_TASK_TEXT,
  SET_SELECTED_DATE,
  CHANGE_TASK_EXECUTION_STATUS
} from './mutation-types';

Vue.use(Vuex)

interface StateType {
  year: number;
  month: number;
  selectedDate: string;
  newTaskText: string;  
  tasks: {
    [key: string]: Array<{
      task: string,
      isDone: boolean
    }>;
  }
}

export default new Vuex.Store({
  state: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    selectedDate: new Date().toLocaleDateString(),
    newTaskText: '',    
    tasks: {
      '20.04.2021': [{
        task: 'Выполнить задание',
        isDone: false
      }],
      '25.04.2021': [{
        task: 'Напечь печенек',
        isDone: false
      }]
    }
  },
  mutations: { 
    [SET_TASK] (state: StateType) {      
      const old = state.tasks[state.selectedDate];
      state.tasks = {
        ...state.tasks,
        [state.selectedDate]:  old 
          ? [...old, { task: state.newTaskText, isDone: false }] 
          : [{ task: state.newTaskText, isDone: false }] 
      };
      state.newTaskText = '';
    },
    [SET_NEW_TASK_TEXT] (state, text) {
      state.newTaskText = text;
    },
    [SET_SELECTED_DATE] (state, date) {
      state.selectedDate = new Date(state.year, state.month -1, date).toLocaleDateString();
    },
    [CHANGE_TASK_EXECUTION_STATUS](state, payload) {
      state.tasks[state.selectedDate][payload.id].isDone = payload.isDone;
      state.tasks = {...state.tasks};
    }
  },
  getters: {
    countDaysInMonth: state => {
      return new Date(state.year, state.month, 0).getDate();
    },
    countMonthFromStart: state => {
      return new Date(state.year, state.month - 1, 1).getDay();
    },
    getCurrTasks: state => {
      return state.tasks[state.selectedDate] || [];
    },
    getDatesWithTasks: state => {
      return Object.keys(state.tasks)
                   .map(date => date.split('.'))
                   .filter(date => state.year === Number(date[2]) && state.month === Number(date[1]))
                   .map(data => Number(data[0]))
    },
    getSelectedDay: state => {
      return Number(state.selectedDate.split('.')[0])
    }
  },
  actions: {},
  modules: {}
})

