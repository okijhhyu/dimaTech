<template>
  <div class="diagram-container">
    <router-link to="/">Задание 1</router-link>
    <div class="diagram-header">
      Круговая диаграмма
    </div>
    <div class="diagram-content">
      <div class="list-container">
        <div class="list-wrapper">
          <div
            v-for="(item, index) in diagramList"
            :key="index"
            class="list-item"
          >
            <div class="list-label">{{ item.label }}</div>
            <div class="list-value">{{ item.data }}</div>
            <div class="list-color">
              <svg width="30" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="12.5" r="9" :fill="item.color" />
              </svg>
              <div>
                <button class="icon-button" @click="openEditDialog(index)"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#213547" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                <button class="icon-button" @click="deleteItem(index)"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#213547" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#213547" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#213547" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
              </div>
            </div>
          </div>
          <button class="button-primary" @click="openAddDialog()">
            Добавить сектор
          </button>
        </div>
      </div>

      <div class="chart-container">
        <PieChart :chartData="chartData" :options="chartOptions" :width="400" :height="400" />
      </div>
        <!-- Диалог -->
      <div v-if="dialogVisible" class="dialog-overlay" @mousedown="closeDialog()">
        <div class="dialog" @mousedown.stop @mouseup.stop>
          <h3>{{dialogData.header}}</h3>

          <div class="form-group">
            <input v-model="newDiagramValue.label" type="text" placeholder=" " />
            <label>Название</label>
          </div>

          <div class="form-group">
            <input v-model.number="newDiagramValue.data" type="number" placeholder=" " />
            <label>Значение</label>
          </div>

          <div class="form-group-color">
            <label>Цвет</label>
            <input v-model="newDiagramValue.color" type="color" />
          </div>

          <div class="dialog-actions">
            <button class="button-primary" @click="submitSector">{{dialogData.buttonText}}</button>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from "chart.js";
import { PieChart } from "vue-chart-3";
import { ref, computed } from "vue";

Chart.register(...registerables);

let diagramList = ref([{ label: "Ceктор-1", data: 25, color: "#F56C6C" }]);
let dialogVisible=ref(false)
let dialogEdit=ref(0)
let newDiagramValue=ref({
  label: '', data: 0, color:'#000000'
})
const chartData = computed(() => ({
  labels: diagramList.value.map((item) => item.label),
  datasets: [
    {
      label: "Pie",
      data: diagramList.value.map((item) => item.data),
      backgroundColor: diagramList.value.map((item) => item.color),
    },
  ],
}));

const dialogData = computed(() => (dialogEdit.value ? {header: "Изменение сектора", buttonText: "Изменить сектор"}:{header: "Добавление сектора", buttonText: "Добавить сектор"}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
  },
};

function openAddDialog(){
  dialogVisible.value=true
}

function openEditDialog(index:number){
  dialogVisible.value=true
  newDiagramValue.value={...diagramList.value[index]}
  dialogEdit.value= index+1 
}
function submitSector(){
  if (dialogEdit.value){
    diagramList.value[dialogEdit.value-1]={...newDiagramValue.value}
  } else {
  diagramList.value.push({...newDiagramValue.value})
  }
  closeDialog()
}

function deleteItem(index:number){
  diagramList.value.splice(index, 1)
}

function closeDialog(){
  dialogVisible.value=false
  dialogEdit.value=0
  newDiagramValue.value={ label: '', data: 0, color:'#000000' }
}
</script>

<style scoped lang="scss">
.button-primary {
  background-color: #409EFF;
  height: 45px;
  color:#fff;
  width:100%;
}
.diagram {
  &-container {
    display: flex;
    flex-direction: column;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid #ebeef5;
    font-weight: 600;
    font-size: 25px;
  }

  &-content {
    padding-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

.list{
  &-container {
    width: 100%;
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &-item {
    display: flex;
    flex-direction: row;
    min-height: 45px;
    border-radius: 8px;
    box-shadow: rgba(150, 150, 150, 0.12) 2px 1px 1px;
    justify-content: space-between;
    background: rgb(244, 244, 245);
    align-items: center;
  }

  &-label {
    min-width: 100px;
    display: flex;
    align-items: center;
    padding-left: 5px;
  }

  &-value {
    display: flex;
    min-width: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    
    &::after {
      content: "";
      right: 0;
      position: absolute;
      height: 100%;
      border-right: 3px solid rgb(222, 223, 224);
    }
    &::before {
      content: "";
      left: 0;
      position: absolute;
      height: 100%;
      border-right: 3px solid rgb(222, 223, 224);
    }
  }

  &-color {
    min-width: 200px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    justify-content: space-between;
  }
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}



.icon-button {
  background: inherit;

}

/* стили диалога */

.dialog {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  h3{
    text-align: left;

  }
  &-actions {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  &-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.dialog
.form-group {
  position: relative;
  margin: 20px 0;

  &-color{
    display: flex;
    flex-direction: column;
    align-items:center;
  }

  input {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 6px;
    height: 25px;
    padding: 14px 10px 6px 10px;
    font-size: 16px;
    outline: none;
    transition: border 0.2s;

    &:focus {
      border-color: #409eff;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 4px;
      font-size: 12px;
    }
  }

  label {
    position: absolute;
    left: 10px;
    top: 14px;
    font-size: 16px;
    color: #999;
    pointer-events: none;
    transition: 0.2s;
  }
}

</style>