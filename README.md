# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# Клонирование репозитория
git clone [https://github.com/username/project.git](https://github.com/okijhhyu/dimaTech.git)

# Установка зависимостей
npm install

# Запуск проекта
npm run dev

## 📄 Pages

В проекте реализованы следующие страницы:

### 1. Главная страница (`/`)
Отображает обзор проекта, содержит панель с диаграммами и управление секторами.

**Основные компоненты:**
- `DiagramContainer` — контейнер для диаграммы и списка секторов.

---

### 2. Страница добавления/редактирования сектора (`/diagram`)
- `PieChart` — круговая диаграмма, реализованная с использованием `vue-chart-3`.

**Функции:**
- Открытие диалогового окна добавления или редактирования.
- Ввод данных: название, значение, цвет сектора.
- Сохранение изменений и обновление диаграммы.

**Параметры диалога:**

| Параметр | Тип     | Описание                              |
|----------|---------|---------------------------------------|
| `label`  | string  | Название сектора                      |
| `data`   | number  | Значение сектора                      |
| `color`  | string  | Цвет сектора в формате HEX            |

---

### Описание компонентов

- **ProgressBar.vue**  
  Отвечает за отображение диаграммы.  
  **Props:**  
| Prop         | Тип                                                                 | По умолчанию      | Описание                                                                |
|--------------|---------------------------------------------------------------------|-------------------|-------------------------------------------------------------------------|
| `size`       | `Number`                                                            | `150`             | Диаметр диаграммы в пикселях                                            |
| `fontSize`   | `Number`                                                            | `20`              | Размер шрифта текста внутри диаграммы                                   |
| `max`        | `Number`                                                            | `100`             | Максимальное значение диаграммы                                         |
| `value`      | `Number`                                                            | `0`               | Текущее значение диаграммы                                              |
| `strokeWidth`| `Number`                                                            | `8`               | Толщина линии диаграммы                                                 |
| `type`       | `"progressBar" \| "dashboard"`                                      | `"progressBar"`   | Тип диаграммы                                                           |
| `fill`       | `String`                                                            | `'#fff'`          | Цвет фона диаграммы                                                     |
| `trackColor` | `String`                                                            | `'#eee'`          | Цвет фона трека диаграммы                                               |
| `progressColor` | `String`                                                         | `'#409EFF'`       | Цвет прогресса диаграммы                                                |
| `textColor`  | `String`                                                            | `'#909399'`       | Цвет текста внутри диаграммы                                            |
| `showLabel`  | `Boolean`                                                           | `true`            | Показать подпись внутри диаграммы                                       |
| `labelType`  | `"progress" \| "success" \| "warning" \| "error"`                   | `"progress"`      | Тип подписи                                                             |
| `strokeType` | `"round" \| "butt"`                                                 | `"round"`         | Тип окончания линии диаграммы                                           |
| `changeColor`| `Array<{color: string, value: number}>`                             | `[]`              | Массив объектов для изменения цвета прогресса в зависимости от значения |

