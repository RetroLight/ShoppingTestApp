import ProductCls from '../models/productCls';

const PRODUCTS = [
  new ProductCls(
    'p1',
    'u1',
    'Красная футболка',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'Красивая красная футболка, хороший выбор для теплой погоды',
    29.99
  ),
  new ProductCls(
    'p2',
    'u1',
    'Синий ковер',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Идеально подходит для того чтобы стоять на нем в Вашей красной футболке. (Носить его не нужно)',
    99.99
  ),
  new ProductCls(
    'p3',
    'u2',
    'Кофейная кружка',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Также, в нее можно налить и чай',
    8.99
  ),
  new ProductCls(
    'p4',
    'u3',
    'Книга - ограниченный тираж',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "О чем эта книга? А разве это имеет значение? Это ведь ограниченный тираж",
    15.99
  ),
  new ProductCls(
    'p5',
    'u3',
    'PowerBook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Отличное железо, скрипучая клавиатура, доступная цена. Купи сейчас пока не вышла очередная новая модель!',
    2299.99
  ),
  new ProductCls(
    'p6',
    'u1',
    'Ручка и бумага',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Могут использоваться для ролевых игр (не тех ролевых игр о которых Вы подумали)",
    5.49
  )
];

export default PRODUCTS;
