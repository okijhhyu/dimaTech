<script setup lang="ts">
import ProgressBar from '../components/ProgressBar.vue'
import { ref } from 'vue'
/** Типы прогресс-бара */
type ProgressType = 'progress' | 'success' | 'warning' | 'error'
type StrokeType = 'round' | 'butt'
type DiagramType = 'progressBar' | 'dashboard'

/** Описание варианта прогресса */
interface ProgressStyle {
  type: ProgressType
  name: string
  color: string
  progressColor: string
}

/** Опции прогресс-бара */
interface ProgressOption extends ProgressStyle {
  value: number
  size: number
  strokeWidth: number
  strokeType: StrokeType
  diagramType: DiagramType
}

const progressTypes:ProgressStyle[]=[
  {type: 'progress', name: 'Основной', color: '#909399', progressColor: '#409EFF'},
  {type: 'success', name: 'Успех', color: '#67C23A', progressColor: '#67C23A'},
  {type: 'warning', name: 'Предостирежение', color: '#E6A23C', progressColor: '#E6A23C'},
  {type: 'error', name: 'Ошибка', color: '#F56C6C', progressColor: '#F56C6C'}
]

const strokeTypes: { type: StrokeType; name: string }[] =[
  {type: 'round', name: 'Круглая'},
  {type: 'butt', name: 'Линия' }
]

const diagramTypes: { type: DiagramType; name: string}[]=[
  {type: 'progressBar', name: 'Прогресс'},
  {type: 'dashboard', name: 'Дашборд' }
]

let progressOption= ref<ProgressOption>({type: 'progress', name: 'Основной', color: '#909399', progressColor: '#409EFF', value: 0, size: 150, strokeWidth: 8, strokeType: 'round', diagramType: 'progressBar'})
let selectedProgressType = ref(0)
let selectedStrokeType = ref<StrokeType>('round')
let selectedDiamgramType = ref<DiagramType>('progressBar')
let changeColor = [{color:'#F56C6C', value: 30 },{color:'#E6A23C', value: 60 },{color:'#409EFF', value: 80 },{color:'#67C23A', value: 100 }]
function updateValue(event: Event, type:'value'|'size'|'strokeWidth',min:number, max: number) {
  const target = event.target as HTMLInputElement
  let val = parseInt(target.value);
  if (isNaN(val)) val = min;
  val = Math.max(min, Math.min(max, val));
  progressOption.value[type] = val
  target.value=String(val)
}

function selectOptions(event: Event) {
  const index = parseInt((event.target as HTMLSelectElement).value)
  progressOption.value = {...progressOption.value, ...progressTypes[index]}
}

function selectType(event: Event, key: 'strokeType'|'diagramType') {
  const type = (event.target as HTMLSelectElement).value
  progressOption.value = {...progressOption.value, [key]: type}
}

</script>

<template>
  <div class="page-wrapper">
    <!-- Примеры прогресс-баров -->
    <router-link to="/diagram">Задание 2</router-link>
    <div class="items-row">
      <ProgressBar />
      <ProgressBar :value="25" />
      <ProgressBar labelType="success" progressColor="#67C23A" textColor="#67C23A" :value="100" />
      <ProgressBar labelType="warning" progressColor="#E6A23C" textColor="#E6A23C" :value="75" />
      <ProgressBar labelType="error" progressColor="#F56C6C" textColor="#F56C6C" :value="50" />
      <ProgressBar type="dashboard" progressColor="#F56C6C" textColor="#F56C6C" :value="10" />
      <ProgressBar type="dashboard" progressColor="#409EFF" textColor="#409EFF" :value="60" />
    </div>

    <!-- Настройка -->
    <h1>Настройка</h1>
    <ProgressBar
      :value="progressOption.value"
      :progressColor="progressOption.progressColor"
      :textColor="progressOption.color"
      :labelType="progressOption.type"
      :size="progressOption.size"
      :strokeWidth="progressOption.strokeWidth"
      :strokeType="progressOption.strokeType"
      :type="progressOption.diagramType"
    />
    <h3>Изменение цвета при прогрессе</h3>
    <ProgressBar
      :value="progressOption.value"
      :size="progressOption.size"
      :strokeWidth="progressOption.strokeWidth"
      :strokeType="progressOption.strokeType"
      :type="progressOption.diagramType"
      :changeColor="changeColor"
    />
    <div class="items-row">
      <div class="items-column">
        <h3>Прогресс</h3>
        <input type="number" :value="progressOption.value" @keyup.enter="updateValue($event,'value',0 ,100)" @blur="updateValue($event,'value',0 ,100)" />
      </div>
      <div class="items-column">
        <h3>Статус</h3>
        <select :v-model="selectedProgressType" @change="selectOptions($event)">
          <option v-for="(n,index) in progressTypes" :key="n.type+index" :value="index">{{ n.name }}</option>
        </select>
      </div>
      <div class="items-column">
        <h3>Размер</h3>
        <input type="number" :value="progressOption.size" @keyup.enter="updateValue($event,'size' ,150 ,1000)" @blur="updateValue($event,'size' ,150 ,1000)" />
      </div>
      <div class="items-column">
        <h3>Ширина</h3>
        <input type="number" :value="progressOption.strokeWidth" @keyup.enter="updateValue($event,'strokeWidth' ,0,75)" @blur="updateValue($event,'strokeWidth' ,0,75)" />
        </div>
      <div class="items-column">
        <h3>Тип линии</h3>
        <select :v-model="selectedStrokeType" @change="selectType($event, 'strokeType')">
          <option v-for="(n,index) in strokeTypes" :key="n.type+index" :value="n.type">{{ n.name }}</option>
        </select>
      </div>
      <div class="items-column">
        <h3>Тип отображения</h3>
        <select :v-model="selectedDiamgramType" @change="selectType($event, 'diagramType')">
          <option v-for="(n,index) in diagramTypes" :key="n.type+index" :value="n.type">{{ n.name }}</option>
        </select>
      </div>
    </div>
  </div>
</template>