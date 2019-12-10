# Garpix Graphic Engine

[English](README.md) | Русский

Графический движок, основанный на Three.js и React.js.

* Высокая производительность по сравнению с A-Frame и React360.
* Удобная система компонентов на React.

## Установка

```bash
yarn add @garpix/gengine
```

или

```bash
npm i -S @garpix/gengine
```

## Быстрый старт

Файл `App.css`:

```css
html, body {
    margin: 0;
    padding: 0;
}
```

Файл `App.js`:

```jsx harmony
import React from 'react';
import {
    Canvas,
    PerspectiveCamera,
    OrbitControls,
    Box,
    AmbientLight,
    DirectionalLight,
} from '@garpix/gengine';
import './App.css';

class App extends React.Component {

    render() {
        return (
            <div>
                <Canvas>
                    <PerspectiveCamera position={[0, 1, 5]}>
                        <OrbitControls />
                    </PerspectiveCamera>
                    <Box />
                    <Box position={[1, 2, 0]} rotation={[25, 70, 45]} />
                    <Box scale={[5, 0.1, 5]} color={'#ff0000'} position={[0, -0.6, 0]} />
                    <AmbientLight intensity={0.3} />
                    <DirectionalLight intensity={0.7} />
                </Canvas>
            </div>

        );
    }
}

```

## Документация

### Canvas

Главный компонент для работы с 3D-сценой. Создает канвас, на
котором будет отображен весь контент. Также, знает, загрузился
или нет какой-либо компонент - поэтому может показывать
прогрессбар.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>enableShadows={true}</td>
        <td>Включить тени на сцене</td>
        <td>false</td>
    </tr>
    <tr>
        <td>gammaFactor={2.2}</td>
        <td>Гамма-коррекция</td>
        <td>1</td>
    </tr>
    <tr>
        <td>onLoadingProgress={(progress) => {console.log(progress)}}</td>
        <td>Метод для определения, насколько сцена загружена. От 0 до 100.</td>
        <td>undefined</td>
    </tr>
</table>

### PerspectiveCamera

Основная камера.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>position={[0, 0, 0]}</td>
        <td>Позиция на сцене</td>
        <td>[0, 0, 0]</td>
    </tr>
    <tr>
        <td>zoom={5}</td>
        <td>Увеличение</td>
        <td>1</td>
    </tr>
    <tr>
        <td>fullscreen={false}</td>
        <td>Если false, то будет вписан в контейнер.</td>
        <td>true</td>
    </tr>
</table>


### DraggableFirstPersonControls

Управление для вращения камерой от первого лица с помощью перетаскивания (drag&drop).

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>invertX={true}</td>
        <td>Инвертировать по оси X</td>
        <td>false</td>
    </tr>
    <tr>
        <td>invertY={true}</td>
        <td>Инвертировать по оси Y</td>
        <td>false</td>
    </tr>
    <tr>
        <td>sensitivity={75}</td>
        <td>Чувствительность</td>
        <td>100</td>
    </tr>
</table>

### OrbitControls

Управление для вращения и перемещения камерой вокруг определенной координаты.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>minDistance={1}</td>
        <td>Минимальная дистанция до координаты, вокруг которой вращаем камеру</td>
        <td>3</td>
    </tr>
    <tr>
        <td>maxDistance={100}</td>
        <td>Максимальная дистанция до координаты, вокруг которой вращаем камеру</td>
        <td>20</td>
    </tr>
</table>

### Raycast

Компонент для возможности определения, на какой объект нажимают.
Т.е. кидаем его на сцену только когда требуется интерактивность с объектами на сцене.

#### Свойства (props)

Отсутствуют.

### Fog

Туман.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>color={'#ffffff'}</td>
        <td>Цвет тумана</td>
        <td>'#ffffff'</td>
    </tr>
    <tr>
        <td>near={10}</td>
        <td>С какого расстояния начинается туман</td>
        <td>10</td>
    </tr>
    <tr>
        <td>far={100}</td>
        <td>На каком расстоянии туман должен стать абсолютно непрозрачным.</td>
        <td>100</td>
    </tr>
</table>

### AmbientLight

Освещение окружения. Не бросает теней.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>color={'#ffffff'}</td>
        <td>Цвет освещения</td>
        <td>'#ffffff'</td>
    </tr>
    <tr>
        <td>intensity={0.3}</td>
        <td>Интенсивность освещения</td>
        <td>1</td>
    </tr>
</table>

### DirectionalLight

Солнечное освещение. Не имеет начала и конца, имеет направление.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>color={'#ffffff'}</td>
        <td>Цвет освещения</td>
        <td>'#ffffff'</td>
    </tr>
    <tr>
        <td>intensity={0.3}</td>
        <td>Интенсивность освещения</td>
        <td>1</td>
    </tr>
    <tr>
        <td>position={[1, 1, 1]}</td>
        <td>Из какой точки вектор смотрит в центр сцены</td>
        <td>[1, 1, 1]</td>
    </tr>
</table>

### PointLight

Освещение-точка. Дает свет вокруг себя.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>color={'#ffffff'}</td>
        <td>Цвет освещения</td>
        <td>'#ffffff'</td>
    </tr>
    <tr>
        <td>intensity={0.3}</td>
        <td>Интенсивность освещения</td>
        <td>1</td>
    </tr>
    <tr>
        <td>position={[1, 1, 1]}</td>
        <td>Позиция на сцене</td>
        <td>[1, 1, 1]</td>
    </tr>
</table>

### SpotLight

Освещение-пятно. Пример - фонарик.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>color={'#ffffff'}</td>
        <td>Цвет освещения</td>
        <td>'#ffffff'</td>
    </tr>
    <tr>
        <td>intensity={0.3}</td>
        <td>Интенсивность освещения</td>
        <td>1</td>
    </tr>
    <tr>
        <td>position={[1, 1, 1]}</td>
        <td>Позиция на сцене</td>
        <td>[1, 1, 1]</td>
    </tr>
    <tr>
        <td>rotation={[0, 0, 0]}</td>
        <td>Углы поворота (в градусах)</td>
        <td>[0, 0, 0]</td>
    </tr>
</table>

### GLTF

Трехмерный объект сложной формы в формате glTF.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>url={'/static/scene.gltf'}</td>
        <td>URL на glTF файл для подгрузки его в сцену. bin и текстуры указывать не надо, они будут подтянуты из glTF.</td>
        <td>null, обязателен</td>
    </tr>
    <tr>
        <td>animation={{clipName: 'walk'}}</td>
        <td>Можно указать анимацию, которую будет воспроизводить модель. Рекомендуем использовать плагин https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode для VSCode - в нем удобно смотреть анимации.</td>
        <td>null</td>
    </tr>
    <tr>
        <td>position={[1, 1, 1]}</td>
        <td>Позиция на сцене</td>
        <td>[1, 1, 1]</td>
    </tr>
    <tr>
        <td>rotation={[0, 0, 0]}</td>
        <td>Углы поворота (в градусах)</td>
        <td>[0, 0, 0]</td>
    </tr>
    <tr>
        <td>scale={[1, 1, 1]}</td>
        <td>Масштаб, на сколько увеличить или уменьшить объект по каждой стороне от оригинального размера.</td>
        <td>[1, 1, 1]</td>
    </tr>
    <tr>
        <td>materials: {
            'tile.009': new MeshStandardMaterial({
              map: this.getTexture('/static/textures/tile.009_baseColor_replaced.png'),
              normalMap: this.getTexture('/static/textures/tile.009_normal.png'),
              // color: 0xffffff,
              name: 'tile.009',
            }),
          }</td>
        <td>Перезаписывает материал по имени (см. ключ) на другую (см. значение). Применяются материалы от Three.js. См. пример "materials".</td>
        <td>{}</td>
    </tr>
</table>

### Sky

Skybox - небо, куб окружения, внутри которого мы находимся.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>url={'/static/background360.jpg'}</td>
        <td>URL на изображение текстуры 360 градусов, которую необходимо подгрузить.</td>
        <td>null, обязателен</td>
    </tr>
</table>

### Box

Трехмерный объект - коробка.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>color={'#ff0000'}</td>
        <td>Цвет</td>
        <td>'#ffffff'</td>
    </tr>
    <tr>
        <td>position={[1, 1, 1]}</td>
        <td>Позиция на сцене</td>
        <td>[1, 1, 1]</td>
    </tr>
    <tr>
        <td>rotation={[0, 0, 0]}</td>
        <td>Углы поворота (в градусах)</td>
        <td>[0, 0, 0]</td>
    </tr>
    <tr>
    <td>scale={[1, 1, 1]}</td>
        <td>Масштаб, на сколько увеличить или уменьшить объект по каждой стороне от оригинального размера.</td>
        <td>[1, 1, 1]</td>
    </tr>
</table>

### Sphere

Трехмерный объект - сфера.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>color={'#ff0000'}</td>
        <td>Цвет</td>
        <td>'#ffffff'</td>
    </tr>
    <tr>
        <td>position={[1, 1, 1]}</td>
        <td>Позиция на сцене</td>
        <td>[1, 1, 1]</td>
    </tr>
    <tr>
        <td>rotation={[0, 0, 0]}</td>
        <td>Углы поворота (в градусах)</td>
        <td>[0, 0, 0]</td>
    </tr>
    <tr>
    <td>radius={1}</td>
        <td>Радиус сферы.</td>
        <td>1</td>
    </tr>
    <tr>
        <td>widthSegments={8}</td>
        <td>Количество сегментов по горизонтали (чтобы сфера была более сглажена).</td>
        <td>8</td>
    </tr>
    <tr>
        <td>widthSegments={6}</td>
        <td>Количество сегментов по вертикали (чтобы сфера была более сглажена).</td>
        <td>6</td>
    </tr>
</table>

### Cylinder

Трехмерный объект - цилиндр.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>color={'#ff0000'}</td>
        <td>Цвет</td>
        <td>'#ffffff'</td>
    </tr>
    <tr>
        <td>position={[1, 1, 1]}</td>
        <td>Позиция на сцене</td>
        <td>[1, 1, 1]</td>
    </tr>
    <tr>
        <td>rotation={[0, 0, 0]}</td>
        <td>Углы поворота (в градусах)</td>
        <td>[0, 0, 0]</td>
    </tr>
    <tr>
        <td>radiusTop={1}</td>
        <td>Радиус верха цилиндра</td>
        <td>1</td>
    </tr>
    <tr>
        <td>radiusBottom={1}</td>
        <td>Радиус низа цилиндра</td>
        <td>1</td>
    </tr>
    <tr>
        <td>height={1}</td>
        <td>Высота цилиндра</td>
        <td>1</td>
    </tr>
    <tr>
        <td>radialSegments={32}</td>
        <td>Количество сегментов. Чем больше, тем плавнее будет окружность, но будет больше треугольников.</td>
        <td>32</td>
    </tr>
</table>

### Screenshot

Утилитарный компонент - создание скриншотов.

#### Свойства (props)

<table>
    <tr>
        <td>Свойство</td>
        <td>Описание</td>
        <td>По умолчанию</td>
    </tr>
    <tr>
        <td>takeScreenshot={(screenshotFunction) => {this.takeScreenshot = screenshotFunction}}</td>
        <td>
            Функция, которая перезаписывает внешнюю функцию по созданию скриншота.
            Перезапись обязательна. Для примера смотрите examples/screenshot
        </td>
        <td>undefined</td>
    </tr>
</table>

## Лицензия

MIT

## Обратная связь

Вы можете использовать тикеты на github или использовать электронную почту [support@garpix.com](support@garpix.com) для связи с нами.

