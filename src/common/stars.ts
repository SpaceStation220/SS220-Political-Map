import { Nations } from "./nations";
import { Planets } from "./planets";
import { Star } from "./types";

export enum STAR_TYPE {
  Capital = "Столица",
  Controlled = "Контролируемая",
  Controversial = "Спорная",
}

/**
 * Звёзды
 * При добавлении новой зезды, её позицию можно задать с помощью координат внизу карты
 * Банально навести курсор куда надо, и запомнить координаты, после чего ввести из звезде.
 *
 * Про поля:
 * * name - Название звезды
 * * description - Описание звезды
 * * planets - Планеты звезды. Необязательное поле. Все планеты находятся в файле planets.ts
 * * affiliation - Фракция которой принадлежит звезда. Все фракции находятся в файле nations.ts
 * * occupiedBy - Фракция которая заняла систему. Создаёт штриховку цвета захватчика и красит систему, при этом система остаётся в зоне affiliation пост-фактум
 * * type - Тип звезды. Все типы находятся выше...
 * * position - Координаты звезды
 * * labelShift - Смещение надписи. Используется для её корректировкиЮ дабы избежать наложения текста. Необязательно
 */
export const Stars: Star[] = [
  {
    name: "Солнце",
    description:
      "Звезда Солнечной системы - колыбели человечества. Является политическим, культурным и экономическим центром Транс-Солнечной Федерации, а также одним из наиболее заселенных и развитых миров человеческого космоса.",
    planets: [
      Planets.Venus,
      Planets.Earth,
      Planets.Moon,
      Planets.Mars,
      Planets.Ganimed,
      Planets.Europe,
      Planets.Titan,
      Planets.Pluto,
    ],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Capital,
    position: { x: 512, y: 512 },
  },
  {
    name: "HD 7924",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 479, y: 58 },
  },
  {
    name: "Кастор",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 581, y: 78 },
  },
  {
    name: "Ι Часов",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 645, y: 50 },
  },
  {
    name: "ρ Кормы",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 675, y: 114 },
  },
  {
    name: "A 2329",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 698, y: 35 },
  },
  {
    name: "Глизе 200",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 777, y: 18 },
    labelShift: { x: 0, y: 5 },
  },
  {
    name: "10 Гончих Псов",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 837, y: 84 },
  },
  {
    name: "37 Близнецов",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 888, y: 129 },
  },
  {
    name: "Ψ Возмичего",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 823, y: 135 },
  },
  {
    name: "104 Тельца",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 812, y: 195 },
  },
  {
    name: "Глизе 156",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 760, y: 152 },
  },
  {
    name: "Глизе 818",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 743, y: 197 },
  },
  {
    name: "9 Кормы",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 970, y: 94 },
  },
  {
    name: "15 Стрелы",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 974, y: 163 },
  },
  {
    name: "β Кассиопеи",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 914, y: 237 },
  },
  {
    name: "10 Большой Медведицы",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 931, y: 297 },
  },
  {
    name: "Глизе 247",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 974, y: 324 },
  },
  {
    name: "51 Пегаса",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 919, y: 357 },
  },
  {
    name: "η Волопаса",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 812, y: 368 },
  },
  {
    name: "β Девы",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 747, y: 363 },
  },
  {
    name: "δ Треугольника",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 779, y: 450 },
  },
  {
    name: "142 Скорпиона",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 713, y: 433 },
  },
  {
    name: "Глизе 570",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 666, y: 453 },
  },
  {
    name: "36 Змееносца",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 675, y: 496 },
  },
  {
    name: "Росс 104",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 661, y: 363 },
  },
  {
    name: "Глизе 300",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 632, y: 325 },
  },
  {
    name: "107 Рыб",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 567, y: 313 },
  },
  {
    name: "Σ Дракона",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 568, y: 373 },
  },
  {
    name: "70 Змееносца",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 610, y: 419 },
  },
  {
    name: "Йеллар",
    description:
      "Родная система ниан, ключевая точка маршрутов их крупнейшего торгового флота — Каравана. В настоящее время полностью интегрирована в состав Империи Скреллов и относится к числу имперских систем.",
    planets: [
      Planets.Zuviyen],
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Capital,
    position: { x: 845, y: 536 },
  },
  {
    name: "Светоч Лампуса",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 905, y: 554 },
  },
  {
    name: "Мальтайар",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 812, y: 581 },
  },
  {
    name: "Лийзо",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 824, y: 630 },
  },
  {
    name: "Инсу",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 794, y: 679 },
  },
  {
    name: "Оумм",
    description:
      "Родная система драсков, образованная двойной звездой. До 2545 года являлась политическим центром Гегемонии Маарун, однако была захвачена в результате Пятой Волны – масштабной экспансии Империи Скреллов в приграничные системы.",
    planets: [
      Planets.Urlum,
      Planets.MouunLum,
      Planets.RouunLum],
    affiliation: Nations.Drask,
    occupiedBy: Nations.Imperium,
    type: STAR_TYPE.Capital,
    position: { x: 752, y: 751 },
  },
  {
    name: "HR 6806",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 726, y: 295 },
  },
  {
    name: "β Волос Вероники",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 657, y: 206 },
  },
  {
    name: "Мауна",
    description:
      "Родная система греев, звезда класса красный карлик. В настоящий момент система, как и все остальные миры серых, находится под оккупацией Империи Скреллов. Из-за постоянных восстаний и диверсий трафик закрыт для любых неимперских судов.",
    planets: [
      Planets.MaunaB],
    affiliation: Nations.Gray,
    occupiedBy: Nations.Imperium,
    type: STAR_TYPE.Capital,
    position: { x: 526, y: 203 },
  },
  {
    name: "Грей μ",
    affiliation: Nations.Gray,
    occupiedBy: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 478, y: 146 },
  },
  {
    name: "Мауна β",
    affiliation: Nations.Gray,
    occupiedBy: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 563.5, y: 181 },
  },
  {
    name: "Глизе 532",
    affiliation: Nations.Imperium,
    type: STAR_TYPE.Controlled,
    position: { x: 588.5, y: 126 },
  },
  {
    name: "Альфа Центавра",
    description:
      "Тройная звездная система, ближайшая к Солнечной системе и первый заселенный человечеством мир за её пределами. Помимо множества оборонительных, торговых и логистических объектов, в системе расположены \”Солярные врата\” - стабильный блюспейс-коридор, соединяющий её с Солнечной системой и являющийся ключевой торговой артерией Транс-Солнечной Федерации. В 2535 году здесь произошло одно из крупнейших сражений Великой Межсистемной войны — побоище при Альфа Центавра, где силы Федерации столкнулись с флотилией \“Безумного Регента\” Себастьяна Росса.",
    planets: [
      Planets.Langobardia,
      Planets.Citra],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 530, y: 486 },
  },
  {
    name: "Бернарда",
    description:
      "Звезда одноименной системы, красный карлик. По многочисленным исследованиям и опросам Федеральной Академии Колонистики, система Бернарда признанна одним из наиболее благополучных и состоятельных миров в составе ТСФ и стабильно входит в список лучших мест для проживания. Бернарда считается \”образцовым сектором\” Федерации — с прозрачным управлением, развитой системой прав человека и сильными связями между соседними колониями.",
    planets: [
      Planets.Juno,
      Planets.Athena],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 561, y: 519 },
  },
  {
    name: "Лаланд",
    description:
      "Звезда одноименной системы, красный карлик, пограничный мир Центрального кольца. Примечателен уникальными орбитальными верфями и инженерными комплексами, построенными ещё в ранний период экспансии Федерации. Здесь разрабатывались и испытывались первые прототипы блюспейс-двигателей и модульных станционных конструкций, многие из которых до сих пор используются в промышленности и военном флоте.",
    planets: [
      Planets.Gatewood],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 497, y: 438 },
    labelShift: { x: 0, y: 2 },
  },
  {
    name: "Веридиус",
    description:
      "Звезда одноименной системы, красный карлик. Приграничная система ТСФ, ничем не примечательная.",
    planets: [
      Planets.Raine],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 509, y: 416 },
  },
  {
    name: "Лапласса",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 483, y: 451 },
    labelShift: { x: -10, y: 0 },
  },
  {
    name: "Сириус",
    description:
      "Звездная система, образованная двумя компонентами - Сириус A и Сириус B . Система имеет стратегическое значение как пограничная зона Центра и один из первых перевалочных пунктов человечества на пути к дальним звёздам. Здесь сосредоточено множество межпланетных объектов: орбитальные станции, исследовательские аванпосты, промышленные комплексы и дрейфующие флоты. Благодаря развитой инфраструктуре и выгодному положению, система стала достаточно популярным местом для ведения торговли и бизнеса.",
    planets: [
      Planets.BabylonIII],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 439, y: 492 },
  },
  {
    name: "Процион",
    description:
      "Двойная звёздная система на дальних рубежах ТСФ, удалённый пограничный мир, сохранивший репутацию тихой гавани. Даже во времена Великой межсистемной войны сюда едва доходили её отголоски, что позволило системе избежать разрушений и сохранить относительную стабильность. Несмотря на удалённость, Процинон включён в транспортную сеть Федерации и выполняет роль перевалочного пункта для маршрутов, ведущих к мирам Вольных Секторов.",
    planets: [
      Planets.Arkadia,
      Planets.NewCanaan],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 413, y: 477 },
  },
  {
    name: "Фенора",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 398, y: 505 },
  },
  {
    name: "Лакайль",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 530, y: 613 },
    labelShift: { x: 5, y: -17 },
  },
  {
    name: "Крюгер",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 552, y: 630 },
    labelShift: { x: 2.5, y: 2.5 },
  },
  {
    name: "Фертил",
    description:
      "Звезда одноименной системы, желтый карлик. Центральный административный мир \”Плодородного пояса\” ТСФ. Система и находящиеся в ней корпорации значительно пострадали во время Великой Межсистемной войны, однако были восстановлена в рекордные сроки за счет колоссальных вложений со стороны государства.",
    planets: [
      Planets.Ninhursag,
      Planets.Ninurta],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 590, y: 615 },
    labelShift: { x: 7.5, y: 5 },
  },
  {
    name: "Альтаир",
    description:
      "Звезда одноименной системы, административная столица Вектора Альтаир, включающая в себя системы Коперник, Фомальгаут, Каппа Кита и Пи Ориона. В пределах этого субъекта Федерации действуют более мягкие политики расселения и трудоустройства в отношении инопланетных видов, нежели во всём остальном человеческом космосе. Причиной тому послужило истощение местных колоний после военных действий и острая необходимость в дешевой инопланетной рабочей силе.",
    planets: [
      Planets.Vorat,
      Planets.Lavra],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 615, y: 589 },
  },
  {
    name: "Ньютон",
    description:
      "Двойная звездная система. Часть \”Плодородного пояса\” Ньютон-Фертил-Крюгер - несколько тесно связанных звёздных систем, активно используемых Федерацией для сельскохозяйственного производства.",
    planets: [
      Planets.Amigdala],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 573, y: 587 },
    labelShift: { x: 4, y: -4 },
  },
  {
    name: "Эпсилон Индейца",
    description:
      "Звезда одноименной системы, ничем не примечательный мир.",
    planets: [
      Planets.AlKhazraj],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 556, y: 604 },
    labelShift: { x: -5, y: 4 },
  },
  {
    name: "Габриэль",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 589, y: 538 },
    labelShift: { x: 0, y: -7 },
  },
  {
    name: "Ромул",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 618, y: 543 },
  },
  {
    name: "Каппа Кита",
    description:
      "Звезда одноимённой системы — жёлтый карлик, по характеристикам схожий с Солнцем. Является пограничной системой и основным источником собственной плазмы для Федерации. Также считается родной звездой расы плазмаменов.",
    planets: [
      Planets.Boron,
      Planets.BoronII,
    ],
    affiliation: Nations.TSF,
    type: STAR_TYPE.Capital,
    position: { x: 748, y: 566 },
  },
  {
    name: "Коперник",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 671, y: 628 },
  },
  {
    name: "Фомальгаут",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 712, y: 611 },
  },
  {
    name: "Пи Ориона",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 730, y: 519 },
  },
  {
    name: "Каптейна",
    affiliation: Nations.TSF,
    type: STAR_TYPE.Controlled,
    position: { x: 402, y: 540 },
  },
  {
    name: "Эпсилон Эридана",
      description:
      "Система Эпсилон Эридана — одно из важнейших приобретений корпорации Нанотрейзен в послевоенный период. Известна нестабильным блюспейс-полем и обилием аномалий, а также богатейшими залежами плазмы и блюспейс кристаллов, встречающихся почти на каждом астрономическом объекте системы. В регионе размещены объекты добычи и исследований, включая станции тринадцатого проекта. Оборону обеспечивает крупнейшее формирование Флота Компании — группировка «Воля Трейзена».",
    planets: [
      Planets.LasisArdaks,
      Planets.Agir,
    ],
    affiliation: Nations.Nanotrasen,
    type: STAR_TYPE.Controlled,
    position: { x: 436, y: 559 },
    labelShift: { x: 7.5, y: 0 },
  },
  {
    name: "Тау Кита",
      description:
      "Звезда одноимённой системы, отошедшая под контроль Нанотрейзен в результате политики Генриха Трейзена III. Система стала одной из наиболее пострадавших от боевых действий во время Великой Межсистемной войны. По замыслу корпорации, её территории должны быть восстановлены и превращены в привлекательное место для жизни новых сотрудников и граждан первого в галактике государства-корпорации.",
    planets: [
      Planets.Prometheus,
      Planets.Pandora,
    ],
    affiliation: Nations.Nanotrasen,
    type: STAR_TYPE.Controlled,
    position: { x: 458, y: 584 },
  },
  {
    name: "Грумбридж",
    description:
      "Двойная звезда одноименной системы, “столица” Нанотрейзен. Одна из систем, отошедшая Компании по результатам Великой Межсистемной Войны. Одно из мест локализации Первой Оборонительной Флотилии “Октавиан”, а так же зона постройки АОН “Парадиз”.",
    planets: [Planets.Paradise],
    affiliation: Nations.Nanotrasen,
    type: STAR_TYPE.Capital,
    position: { x: 507, y: 618 },
    labelShift: { x: -17.5, y: 0 },
  },
  {
    name: "Аурум Прайм",
    description:
      "Звезда одноимённой системы — родная система киданов. До установления оккупационного правительства АДР была известна как З’зор. После событий Великой Межсистемной войны киданскому подполью, при поддержке некоторых корпораций и кланов Вольных Территорий, удалось вернуть контроль над системой и восстановить власть Улья.",
    planets: [
      Planets.Aurum,
      Planets.Ree,
      Planets.DeltaMazz,
    ],
    affiliation: Nations.Free,
    type: STAR_TYPE.Capital,
    position: { x: 265, y: 211 },
  },
  {
    name: "Бризз",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controlled,
    position: { x: 266.5, y: 277 },
  },
  {
    name: "Празаигз",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controlled,
    position: { x: 226.5, y: 177 },
  },
  {
    name: "Ззи",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controlled,
    position: { x: 321.5, y: 209.5 },
  },
  {
    name: "η Цефея",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controlled,
    position: { x: 201, y: 243 },
  },
  {
    name: "Гхаал",
    affiliation: Nations.Drask,
    occupiedBy: Nations.Free,
    type: STAR_TYPE.Controlled,
    position: { x: 683, y: 768 },
  },
  {
    name: "Уутар",
    affiliation: Nations.Drask,
    occupiedBy: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 658, y: 709 },
  },
  {
    name: "Гууун",
    affiliation: Nations.Drask,
    occupiedBy: Nations.Free,
    type: STAR_TYPE.Controlled,
    position: { x: 608, y: 783 },
  },
  {
    name: "Узулу",
    description:
      "Родная система унатхов, звезда класса красный карлик, название которой в переводе означает \”Красное Светило\”. Благодаря расположению на границе сфер влияния ТСФ, Империи Скреллов и Вольных секторов, система имеет важное стратегическое значение. Орбита и окрестности звезды насыщены верфями, укреплёнными станциями и военными базами, используемыми как для обороны, так и для рейдовых операций Империи Кхси’Ра. Постоянное присутствие флотских формирований и развитая военная промышленность определяют жизнь столичной системы, превращая её в одно из самых укрепленных мест в Галактике.",
    planets: [
      Planets.Moges,
      Planets.Sirsh,
      Planets.Lirash,
    ],
    affiliation: Nations.Unathi,
    type: STAR_TYPE.Capital,
    position: { x: 491, y: 279 },
  },
  {
    name: "HR 753",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 410, y: 302 },
  },
  {
    name: "AD Льва",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 402, y: 366 },
  },
  {
    name: "Глизе 1",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 445, y: 380 },
  },
  {
    name: "ADS 48",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 380, y: 246 },
  },
  {
    name: "G 192-13",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 363, y: 321 },
  },
  {
    name: "γ Зайца",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 270, y: 381 },
  },
  {
    name: "Тигардена",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 410, y: 410 },
  },
  {
    name: "Замсиин-Ир",
    description:
      "Родная система Таяран, образована парной звездой С’рандарр-Месса. Значимый транзитный узел Вольных Систем, патрулируется небольшим оборонительным флотом дома Кайтам, усиленного несколькими боевыми баржами Империи Кхси'Ра.",
    planets: [
      Planets.Khiram,
      Planets.Adomai,
      Planets.Iluk,
      Planets.Ramaja],
    affiliation: Nations.Free,
    type: STAR_TYPE.Capital,
    position: { x: 352, y: 459 },
  },
  {
    name: "Бикксор",
    description:
      "Двойная звезда, родной мир слаймоменов. В системе активен трафик судов Вольных Территорий и Нанотрейзен.",
    planets: [
      Planets.Ksarksis],
    affiliation: Nations.Free,
    type: STAR_TYPE.Capital,
    position: { x: 294, y: 587 },
  },
  {
    name: "Никтум",
    description:
      "Звезда одноимённой системы, неофициальная столица Вольных Территорий. Благодаря расположению на пересечении главных торговых и логистических маршрутов между крупнейшими человеческими государствами, система превратилась в один из самых загруженных транспортных узлов Галактики. Здесь непрерывно курсируют караваны корпораций, флотилии государств, пиратские эскадры, конвои наёмников и сотни частных судов. В системе можно встретить всё — от тяжёлых военных крейсеров до контрабандных шаттлов, что делает её центром серой экономики и точкой пересечения интересов почти всех крупных игроков.",
    planets: [
      Planets.Limneya],
    affiliation: Nations.Free,
    type: STAR_TYPE.Capital,
    position: { x: 336, y: 567 },
  },
  {
    name: "HR 1614",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 295, y: 628 },
  },
  {
    name: "WISE 0325",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 239, y: 647 },
  },
  {
    name: "Глизе 902",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 163, y: 662 },
  },
  {
    name: "HOP 57050",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 261, y: 707 },
  },
  {
    name: "L 43-72",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 205, y: 732 },
  },
  {
    name: "41 Орла",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 242, y: 783 },
  },
  {
    name: "Нюфен",
    description:
      "Система Нюфен — звёздная система, сформированная вокруг солнцеподобной звезды с выраженным осколочным диском. В её пределах отмечается огромное количество блюспейс-аномалий, число которых стало стремительно расти с 2390-х годов. Их плотность и непредсказуемость достигли таких масштабов, что дальнейшее освоение системы оказалось практически невозможным. В настоящий момент Нюфен посещают лишь редко и с большим риском — сюда заходят корабли мусорщиков и воксов, использующих опасные аномалии в своих целях.",
    planets: [
      Planets.Hirkha],
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 296, y: 844 },
  },
  {
    name: "OU Близнецов",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 389, y: 838 },
  },
  {
    name: "Глизе 52",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 479, y: 854 },
  },
  {
    name: "Глизе 3825",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 542, y: 842 },
  },
  {
    name: "ν Волка",
    affiliation: Nations.Free,
    type: STAR_TYPE.Controversial,
    position: { x: 538, y: 799 },
  },

  {
    name: "Арктур",
    description:
      "Звезда одноименной системы, ярчайшая в системе Волопаса. Конечная точка маршрута ковчега “Новая Надежда”, на борту которого находились первые колонисты будущей Республики Эллизиум.",
    planets: [Planets.Tellurus],
    affiliation: Nations.Elysium,
    type: STAR_TYPE.Capital,
    position: { x: 202, y: 501 },
  },
  {
    name: "Альфа Ворона",
    affiliation: Nations.Elysium,
    type: STAR_TYPE.Controlled,
    position: { x: 153, y: 612 },
  },
  {
    name: "Экклесия",
    affiliation: Nations.Elysium,
    type: STAR_TYPE.Controlled,
    position: { x: 151, y: 449 },
  },
  {
    name: "Юстиниан",
    affiliation: Nations.Elysium,
    type: STAR_TYPE.Controlled,
    position: { x: 211, y: 449 },
  },
  {
    name: "Рана",
    affiliation: Nations.Elysium,
    type: STAR_TYPE.Controlled,
    position: { x: 286, y: 448 },
  },
  {
    name: "Порта",
    affiliation: Nations.Elysium,
    type: STAR_TYPE.Controlled,
    position: { x: 274, y: 539 },
  },
  {
    name: "Рострум",
    affiliation: Nations.Elysium,
    type: STAR_TYPE.Controlled,
    position: { x: 193, y: 569 },
  },
  {
    name: "Оплот",
    description:
      "Звезда одноименной системы, ранее известная как Беллатрикс – третья по яркости звезда в созвездии Ориона. По итогам Советской войны за Независимость, объявлена столичной системой СССП (ныне - Коммунистический Союз Социалистических Планет) и главным символом борьбы Галактического пролетариата за светлое будущее.",
    planets: [
      Planets.Pioneer,
      Planets.PioneerII,
      Planets.Lasarys,
      Planets.Udarnyik],
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Capital,
    position: { x: 410, y: 734 },
  },
  {
    name: "Гагарин",
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 344, y: 621 },
  },
  {
    name: "Урса",
    description:
      "Звезда — красный карлик. Система известна как одно из мест славы Январской революции, а впоследствии — одного из самых жестоких и кровавых подавлений восстаний рабочих армией ТСФ. Сегодня она является важным индустриальным столпом КССП: пространство системы заполнено баржами и транспортниками, перевозящими тяжёлую промышленную технику, руду и строительные материалы.",
    planets: [
      Planets.Magnitka],
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 324, y: 677 },
  },
  {
    name: "Заря",
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 299, y: 723 },
  },
  {
    name: "Циалков",
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 355, y: 747 },
  },
  {
    name: "Стурве",
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 376, y: 791 },
  },
  {
    name: "Вега",
    description:
      "Звезда одноименной системы, желтый карлик. Малопримечательный приграничный мир КССП.",
    planets: [
      Planets.Viyara,
      Planets.ViyaraII],
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 487, y: 760 },
  },
  {
    name: "Фратерий",
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 392, y: 692 },
  },
  {
    name: "Красный",
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 375, y: 666 },
  },
  {
    name: "Галилея",
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 435, y: 673 },
  },
  {
    name: "Залеска",
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 461, y: 693 },
  },
  {
    name: "Январь",
    description:
      "Двойная звёздная система, пограничный мир КССП на рубеже с ТСФ. Считается одной из самых защищённых систем Союза: здесь сосредоточено множество военных баз, орбитальных станций и бастионов, а весь контингент постоянно поддерживается в состоянии боевой готовности.",
    planets: [
      Planets.Avangard17,
      Planets.Polus],
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 546, y: 683 },
  },
  {
    name: "Гильгамеш",
    description:
      "Звёздная система, состоящая из жёлтого и красного карлика. Является приграничным миром КССП, где базируется пограничный флот и несколько крупных снабженческих комплексов, обслуживающих линию фронтира и систему Уутар. Главный стратегический объект системы — \”Врата Гильгамеша\", стабильный блюспейс-коридор, через который проходит крупная логистическая артерия КССП. Именно он связывает приграничные территории с Оплотом, обеспечивая быстрые переброски флота, ресурсов и рабочей силы. Во время Великой Межсистемной войны в этой системе произошло несколько крупных космических баталий.",
    planets: [
      Planets.Despoina],
    affiliation: Nations.CUSP,
    type: STAR_TYPE.Controlled,
    position: { x: 584, y: 716 },
  },
  {
    name: "Ваззенда",
    description:
      "Звезда одноимённой системы — белый карлик, родная для вульпканинов. Система имеет ограниченный трафик судов; ключевой точкой является перевалочный пункт «Капелла» в поясе астероидов, созданный нео-католической миссией Вольных Территорий для помощи беженцам и нуждающимся с Альтама. В пределах системы действуют небольшие корабельные группы корпораций и ТСФ. Де-юре территория находится под контролем Вольных Территорий, однако де-факто не имеет устойчивых управляющих структур.",
    planets: [
      Planets.Altam],
    affiliation: Nations.Free,
    type: STAR_TYPE.Capital,
    position: { x: 444, y: 195 },
  },
];
