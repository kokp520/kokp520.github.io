// Tileset 配置 - 根據 tilesheet_itchio.png
export const TILE_TYPES = {
  // 基本地板和牆壁
  WOOD_FLOOR: { x: 0, y: 0, walkable: true },     // 木地板
  WALL: { x: 1, y: 0, walkable: false },          // 牆壁
  CARPET_RED: { x: 2, y: 0, walkable: true },     // 紅地毯
  WINDOW: { x: 3, y: 0, walkable: false },        // 窗戶
  DOOR: { x: 4, y: 0, walkable: true },           // 門
  
  // 第一行傢俱 (y: 1)
  BOOKSHELF: { x: 0, y: 1, walkable: false },     // 大書櫃
  SMALL_SHELF: { x: 1, y: 1, walkable: false },   // 小書架
  CHAIR: { x: 2, y: 1, walkable: false },         // 椅子
  TABLE: { x: 3, y: 1, walkable: false },         // 桌子
  BED: { x: 4, y: 1, walkable: false },           // 床
  CHEST: { x: 5, y: 1, walkable: false },         // 箱子
  SOFA: { x: 6, y: 1, walkable: false },          // 沙發
  ARMCHAIR: { x: 7, y: 1, walkable: false },      // 扶手椅
  
  // 第二行傢俱 (y: 2)
  PLANT_BIG: { x: 0, y: 2, walkable: false },     // 大植物
  PLANT_SMALL: { x: 1, y: 2, walkable: false },   // 小植物
  VASE: { x: 2, y: 2, walkable: false },          // 花瓶
  LAMP: { x: 3, y: 2, walkable: false },          // 燈
  COFFEE_TABLE: { x: 4, y: 2, walkable: false },  // 咖啡桌
  SIDE_TABLE: { x: 5, y: 2, walkable: false },    // 邊桌
  STOOL: { x: 6, y: 2, walkable: false },         // 凳子
  COMPUTER: { x: 7, y: 2, walkable: false },      // 電腦
  
  // 第三行特殊物品 (y: 3)
  FIREPLACE: { x: 0, y: 3, walkable: false },     // 壁爐
  TV: { x: 1, y: 3, walkable: false },            // 電視
  MIRROR: { x: 2, y: 3, walkable: false },        // 鏡子
  PAINTING: { x: 3, y: 3, walkable: false },      // 畫框
  DRESSER: { x: 4, y: 3, walkable: false },       // 梳妝台
  STEREO: { x: 5, y: 3, walkable: false },        // 音響
  GLOBE: { x: 6, y: 3, walkable: false },         // 地球儀
  TELESCOPE: { x: 7, y: 3, walkable: false }      // 望遠鏡
};

// Map data - 簡化的黑色線條房間設計 (20x12)
export const mapData = [
  {
    id: 0,
    name: "黑色線條房間",
    width: 20,
    height: 12,
    tiles: [
      // 第一行 - 牆壁
      ['WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL'],
      // 第二行
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WALL'],
      // 第三行 - 書房區域
      ['WALL','WOOD_FLOOR','BOOKSHELF','WOOD_FLOOR','CHAIR','TABLE','WOOD_FLOOR','PLANT_BIG','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WINDOW','WOOD_FLOOR','WALL'],
      // 第四行
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WALL'],
      // 第五行
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WALL'],
      // 第六行 - 睡眠區域
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','BED','BED','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WALL'],
      // 第七行
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WALL'],
      // 第八行 - 電腦區域
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','COMPUTER','CHAIR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WALL'],
      // 第九行
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WALL'],
      // 第十行 - 休息區域
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','CARPET_RED','CARPET_RED','CARPET_RED','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','CHEST','WOOD_FLOOR','TV','WOOD_FLOOR','WALL'],
      // 第十一行 - 沙發區域
      ['WALL','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','CARPET_RED','SOFA','CARPET_RED','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WOOD_FLOOR','WALL'],
      // 第十二行 - 底部邊界
      ['WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL','WALL']
    ],
    computer: { x: 10, y: 7 }
  }
];