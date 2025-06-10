/* ─────────────── 1. JavaScript Variables ─────────────── */
INSERT INTO "Tests" ("Id","TestName","Description","IsPublished","CreationDate","ModifiedDate")
VALUES ('29d8c58a-f1b2-47b0-b746-1af6d2b9d301',N'JavaScript Variables',
        N'var, let, const та їх відмінності',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" ("Id","TestId","QuestionText","CreationDate","ModifiedDate")
VALUES ('3b8aa1e0-87d9-4c68-9484-6f5bb8d82301','29d8c58a-f1b2-47b0-b746-1af6d2b9d301',
        N'Що відбудеться, якщо оголосити змінну із let двічі в одній області видимості?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" ("Id","QuestionId","AnswerText","IsCorrect","CreationDate","ModifiedDate") VALUES
('c1a6e3f4-4b1f-40d9-91d4-0e2d1317a101','3b8aa1e0-87d9-4c68-9484-6f5bb8d82301',
 N'Буде згенеровано SyntaxError',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('29e648e4-77e0-42ce-9b4c-9a7eacfd8d7a','3b8aa1e0-87d9-4c68-9484-6f5bb8d82301',
 N'Старе значення тихо перезапишеться',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('71d2e430-8342-4e75-8477-3d826f9c0600','3b8aa1e0-87d9-4c68-9484-6f5bb8d82301',
 N'Браузер проігнорує друге оголошення',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" ("Id","TestId","Title","Content","CreationDate","ModifiedDate")
VALUES ('8c490c3c-7083-4098-b5f6-9b75d2b13201','29d8c58a-f1b2-47b0-b746-1af6d2b9d301',
        N'var vs let vs const',
        N'### Ключові відмінності\n* **var** — підйом (hoisting), функціональна область видимості.\n* **let/const** — блочна область, відсутній повторний hoist.\n* **const** не дозволяє переназначення.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 2. JavaScript Data Types ─────────────── */
INSERT INTO "Tests" VALUES
('c795ea43-c8d1-4b41-a713-b2c8d78e6b02','JavaScript Data Types',
 N'Примітиви та обʼєкти',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('f0d9b4e6-8fad-4731-8cfe-611fa1b41f02','c795ea43-c8d1-4b41-a713-b2c8d78e6b02',
 N'Яке значення має вираз `typeof NaN`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('3d2cf749-262c-4acd-8df2-480daa3d1502','f0d9b4e6-8fad-4731-8cfe-611fa1b41f02','"number"',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('7d0d06fa-94d8-4b74-80a4-96b77db27402','f0d9b4e6-8fad-4731-8cfe-611fa1b41f02','"nan"',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('b18d1d3b-29cd-4210-8184-7cd12bce5602','f0d9b4e6-8fad-4731-8cfe-611fa1b41f02','"undefined"',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('49cea4b9-0cae-4358-bf5d-29bd1bbf7d02','c795ea43-c8d1-4b41-a713-b2c8d78e6b02',
 N'Примітиви та `typeof`',
 N'Опис усіх 8 примітивних типів, чому `typeof null === "object"` і чому `NaN` — це "number".',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 3. JavaScript Operators ─────────────── */
INSERT INTO "Tests" VALUES
('b0d0b31e-85ce-4b62-a1fe-543a8617d303',N'JavaScript Operators',
 N'Арифметичні, логічні, порівняння',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('e2ae3b90-2414-4fce-9a5e-7438b6bbc303','b0d0b31e-85ce-4b62-a1fe-543a8617d303',
 N'Яке значення поверне вираз `0 === false`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('f4f058d1-dc3e-460f-bf7a-fc83c88d6903','e2ae3b90-2414-4fce-9a5e-7438b6bbc303','false',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('1317c741-cca6-4a2a-9f61-e8bf44a16b03','e2ae3b90-2414-4fce-9a5e-7438b6bbc303','true',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('5d84d4a8-8278-4ae6-9a04-3b06d3f33303','e2ae3b90-2414-4fce-9a5e-7438b6bbc303','TypeError',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('b95780fe-1978-4a54-8782-5f064cf14e03','b0d0b31e-85ce-4b62-a1fe-543a8617d303',
 N'Оператори рівності',
 N'=== — строге порівняння без приведення типів; 0 і false різних типів, тому результат false.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* … ДАЛЬШЕ ТАКИМ ЖЕ ШАБЛОНОМ … */

/* ─────────────── 4. JavaScript Arrays ─────────────── */
INSERT INTO "Tests" VALUES
('ec6d8344-8888-4f1e-b7b5-1182b032f404','JavaScript Arrays',
 N'Методи масивів: push, map, filter, reduce',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('2c0be0c9-6c36-4a34-9c45-7891de6ff404','ec6d8344-8888-4f1e-b7b5-1182b032f404',
 N'Що повертає метод `Array.prototype.map`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('f5ef2f91-5c1b-4f86-9a66-29a1dfe97404','2c0be0c9-6c36-4a34-9c45-7891de6ff404',N'Новий масив однакової довжини',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('6ec5eb14-3cf0-4e65-94f4-cadf7c434004','2c0be0c9-6c36-4a34-9c45-7891de6ff404',N'Модифікований вихідний масив',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('b2a9d0fe-9017-4772-93d3-725f2aac7704','2c0be0c9-6c36-4a34-9c45-7891de6ff404',N'Число елементів',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('f2c0e55b-418d-4f5f-9cc6-93aa5b0a6a04','ec6d8344-8888-4f1e-b7b5-1182b032f404',
 N'map, filter, reduce',
 N'map — створює новий масив; filter — відфільтровує; reduce — акумулює значення.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 5. JavaScript Objects ─────────────── */
INSERT INTO "Tests" VALUES
('4dc06427-4dba-4e2b-9fa9-2b62c20a9c05',N'JavaScript Objects',
 N'Створення та маніпуляція обʼєктами',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('67c1e013-7b9f-46be-bcb2-b1e1b6e1d905','4dc06427-4dba-4e2b-9fa9-2b62c20a9c05',
 N'Що поверне `Object.keys({a:1,b:2}).length`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('4e238314-4f55-4e77-9c63-592b70506e05','67c1e013-7b9f-46be-bcb2-b1e1b6e1d905',N'2',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('cd275bae-bb83-4c6d-8dd0-4ba9d1b2b005','67c1e013-7b9f-46be-bcb2-b1e1b6e1d905',N'0',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('1f5b793a-760a-4d2e-98bb-dbe9f83a5105','67c1e013-7b9f-46be-bcb2-b1e1b6e1d905',N'undefined',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('0b4e5d50-d3b1-4df4-95f3-e45ddfc51805','4dc06427-4dba-4e2b-9fa9-2b62c20a9c05',
 N'Object.keys & Object.values',
 N'Пояснення перебору властивостей, enum/own keys та вкладених обʼєктів.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 6. JavaScript Functions ─────────────── */
INSERT INTO "Tests" VALUES
('e10f6b37-9b3c-4c48-9e77-70ad7a4c8406',N'JavaScript Functions',
 N'Оголошення, параметри, повернення значень',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('525d2745-f180-413a-b5b3-b5e09c0bd206','e10f6b37-9b3c-4c48-9e77-70ad7a4c8406',
 N'Яке значення `this` у звичайній функції в strict mode, якщо вона викликана як `func()`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('52f5e6c8-503e-4bc7-9471-5c9d50cb8306','525d2745-f180-413a-b5b3-b5e09c0bd206',N'undefined',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('636dec43-d909-44d6-84e6-f246c7d2e606','525d2745-f180-413a-b5b3-b5e09c0bd206',N'глобальний обʼєкт',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('cd255248-0c04-4e72-9962-7f5c3b3ce306','525d2745-f180-413a-b5b3-b5e09c0bd206',N'сам обʼєкт func',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('8c00b59e-d581-4505-b2e6-0e242e7dc106','e10f6b37-9b3c-4c48-9e77-70ad7a4c8406',
 N'Контекст this',
 N'Відмінності this у strict/non-strict, методи call/apply/bind.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 7. Arrow Functions ─────────────── */
INSERT INTO "Tests" VALUES
('9b0945c1-3060-4f59-9855-2a15e4755807','Arrow Functions',
 N'Синтаксис та відмінності від звичайних функцій',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('c4f10ea6-42ea-4ce1-9d10-9f8c4517f507','9b0945c1-3060-4f59-9855-2a15e4755807',
 N'Чому arrow-функції не можна використовувати як конструктори?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('7026b943-3bd6-4a89-88b5-7e7e4a42d107','c4f10ea6-42ea-4ce1-9d10-9f8c4517f507',
 N'У них немає власного `[[Construct]]` та `this`',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('590fe0c8-2d6f-46b7-8378-3abf3b5c4707','c4f10ea6-42ea-4ce1-9d10-9f8c4517f507',
 N'Вони автоматично повертають undefined',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('6fdef55e-505c-4fca-9b26-f4bd2a1d3b07','c4f10ea6-42ea-4ce1-9d10-9f8c4517f507',
 N'Неможливо передати аргументи',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('c9c2d3ec-1b93-4bb3-9183-aa83213db207','9b0945c1-3060-4f59-9855-2a15e4755807',
 N'Arrow-функції та `this`',
 N'Arrow не мають власних this/arguments, тому підходять для колбеків.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 8. Scope ─────────────── */
INSERT INTO "Tests" VALUES
('3bff0104-3a87-498f-b388-1cc1bd778408',N'JavaScript Scope',
 N'Глобальна, функціональна та блочна область видимості',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('e88c80f0-9611-4eb5-8c0c-5be5375bfb08','3bff0104-3a87-498f-b388-1cc1bd778408',
 N'Яке значення буде виведено? <br />
```js
var a = 1;
function foo() {
  console.log(a);
  var a = 2;
}
foo();
```',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('413c5a3b-90ad-4fdf-b12e-e647d9c7dc08','e88c80f0-9611-4eb5-8c0c-5be5375bfb08',N'undefined',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('51f2c165-d2e4-4c88-8b53-0df40e144b08','e88c80f0-9611-4eb5-8c0c-5be5375bfb08',N'1',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('d1b3594a-7e6d-4470-9e39-9c2ec19ccb08','e88c80f0-9611-4eb5-8c0c-5be5375bfb08',N'2',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('29d4f77f-4a4c-48a0-bdef-37b87b238c08','3bff0104-3a87-498f-b388-1cc1bd778408',
 N'Hoisting та область видимості',
 N'Пояснення підняття оголошень та тимчасової мертвої зони (TDZ).',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 9. Hoisting ─────────────── */
INSERT INTO "Tests" VALUES
('bead614e-0679-4d3e-baae-216fbf5b2d09',N'Hoisting',
 N'Підняття змінних і функцій',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('ba94fd4c-c9af-4a37-8a2d-b3963d880f09','bead614e-0679-4d3e-baae-216fbf5b2d09',
 N'Що буде результатом? <br /> 

```js 
console.log(foo());
function foo() { return 42; }
```',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('56e5b813-791d-4d51-85cc-11e3b8e8cd09','ba94fd4c-c9af-4a37-8a2d-b3963d880f09',N'42',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('6e3a0fbd-cac9-4a25-8cad-d13d4e4e3209','ba94fd4c-c9af-4a37-8a2d-b3963d880f09',N'TypeError',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('b3fdc792-32cb-4d00-961d-4275f2370709','ba94fd4c-c9af-4a37-8a2d-b3963d880f09',N'undefined',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('b99d2a66-2e9b-4e38-bfaf-2f280bd07909','bead614e-0679-4d3e-baae-216fbf5b2d09',
 N'Function Declaration vs Expression',
 N'Декларації піднімаються повністю, вирази — лише імʼя змінної.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 10. Closures ─────────────── */
INSERT INTO "Tests" VALUES
('5eaf61ad-0a3f-41f0-83cb-6d2ad7c8460a',N'Closures',
 N'Замикання та практичне використання',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('b1ad7e49-b692-4172-8dbc-41bd8a6c600a','5eaf61ad-0a3f-41f0-83cb-6d2ad7c8460a',
 N'Що таке замикання (closure) у JavaScript?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('3e6d0f37-e7d1-4db7-8a4d-e35fcff1f40a','b1ad7e49-b692-4172-8dbc-41bd8a6c600a',
 N'Функція, що зберігає доступ до лексичного оточення після свого створення',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('1a8da4e1-9293-4cd4-8ec4-0e190e6e1a0a','b1ad7e49-b692-4172-8dbc-41bd8a6c600a',
 N'Функція, яка викликає сама себе',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('e2da2104-43dd-4a65-8eb5-f0d3ec9cc30a','b1ad7e49-b692-4172-8dbc-41bd8a6c600a',
 N'Будь-яка анонімна функція',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('66d407e2-c4c9-4102-9b74-c03e01ba1f0a','5eaf61ad-0a3f-41f0-83cb-6d2ad7c8460a',
 N'Замикання на практиці',
 N'Приклади — лічильник, модульний патерн, приватні змінні.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 11. Promises ─────────────── */
INSERT INTO "Tests" VALUES
('6d19f0a4-3c7c-46d9-90bd-3ad657e2110b',N'JavaScript Promises',
 N'Створення та ланцюжки промісів',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('8a3e4d61-05df-4af4-a1a5-0d506b55220b','6d19f0a4-3c7c-46d9-90bd-3ad657e2110b',
 N'Що повертає метод `.then()`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('9c23d36f-83e6-4cc8-bd6d-fc36ce31b80b','8a3e4d61-05df-4af4-a1a5-0d506b55220b',
 N'Новий Promise',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('8149d61a-5b3f-481e-9a7e-4fbc8f3d0c0b','8a3e4d61-05df-4af4-a1a5-0d506b55220b',
 N'undefined',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('5a134c6f-b769-4f1c-890c-5e59f7dfeb0b','8a3e4d61-05df-4af4-a1a5-0d506b55220b',
 N'Той же самий Promise',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('92be5d65-bd0e-4d38-a1e2-4380fbc76d0b','6d19f0a4-3c7c-46d9-90bd-3ad657e2110b',
 N'Проміси та ланцюжки',
 N'Властивість thenable, мікротаски, обробка помилок через catch.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 12. Async/Await ─────────────── */
INSERT INTO "Tests" VALUES
('af499ad4-fc2e-4b7d-bf8c-5cfd8ed4120c',N'Async/Await',
 N'Синтаксичний цукор над промісами',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('c5be0b7e-a4c0-4cb9-b928-c90eb929730c','af499ad4-fc2e-4b7d-bf8c-5cfd8ed4120c',
 N'Що повертає async-функція без ключового слова return?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('107bf451-77f3-4273-aa85-22c6c3bfa20c','c5be0b7e-a4c0-4cb9-b928-c90eb929730c',N'Promise, що виконується з undefined',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('8dd3367d-82f7-41a8-8b82-513c6b77b30c','c5be0b7e-a4c0-4cb9-b928-c90eb929730c',N'undefined',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('9924d39d-a2f6-4dd8-9e56-7d6e42f0e40c','c5be0b7e-a4c0-4cb9-b928-c90eb929730c',N'null',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('8b3248e8-0c0f-49e9-b4e0-047f8dad770c','af499ad4-fc2e-4b7d-bf8c-5cfd8ed4120c',
 N'async/await під капотом',
 N'await призупиняє виконання всередині async-функції, але не блокує потік.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 13. Event Loop ─────────────── */
INSERT INTO "Tests" VALUES
('876f61f2-e8cd-457f-b7aa-7b15b9e0fd0d',N'Event Loop',
 N'Черга макро- та мікротасок',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('2d7dca90-1b02-4d21-b6d3-ec4dfb1b230d','876f61f2-e8cd-457f-b7aa-7b15b9e0fd0d',
 N'У якому порядку виконаються `setTimeout(()=>…), Promise.resolve().then(()=>…)`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('43b917b3-8cc8-4f00-8c4c-845a5bcace0d','2d7dca90-1b02-4d21-b6d3-ec4dfb1b230d',
 N'Спочатку then (мікротаска), потім setTimeout (макротаска)',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('2d96f3e4-5733-4df7-a4db-4c8f0b705f0d','2d7dca90-1b02-4d21-b6d3-ec4dfb1b230d',
 N'Спочатку setTimeout, потім then',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('b1e45428-ef74-4637-8552-6b04e9cd3a0d','2d7dca90-1b02-4d21-b6d3-ec4dfb1b230d',
 N'Виконаються одночасно',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('01b3c590-6b77-41fe-9e6b-4b3a9a018d0d','876f61f2-e8cd-457f-b7aa-7b15b9e0fd0d',
 N'Цикл подій та черги',
 N'Різниця між мікротасками (queueMicrotask, then) і макротасками (setTimeout).',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 14. Browser Events ─────────────── */
INSERT INTO "Tests" VALUES
('0aade45f-6b5e-4748-b2f1-1795672cc50e',N'Browser Events',
 N'addEventListener та обʼєкт події',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('f85f2a35-6832-4b22-8d2d-49f9d099e10e','0aade45f-6b5e-4748-b2f1-1795672cc50e',
 N'Що робить `event.preventDefault()`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('07c5975b-6512-456c-84e4-d1c69ac1640e','f85f2a35-6832-4b22-8d2d-49f9d099e10e',
 N'Скасовує дію за замовчуванням браузера',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('79f46c8e-93f3-4756-bfc1-12cfa2a5f20e','f85f2a35-6832-4b22-8d2d-49f9d099e10e',
 N'Зупиняє поширення події',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('433f11a8-3d94-4928-9d90-070269e3b40e','f85f2a35-6832-4b22-8d2d-49f9d099e10e',
 N'Видаляє слухач події',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('a4b706c0-3b90-4dcd-bf40-91ab2f47890e','0aade45f-6b5e-4748-b2f1-1795672cc50e',
 N'Події у браузері',
 N'Відмінності stopPropagation vs preventDefault, фаза захоплення і спливання.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 15. DOM Manipulation ─────────────── */
INSERT INTO "Tests" VALUES
('4dee1c4a-d60f-41c0-b0d1-5e2b6bbd970f','DOM Manipulation',
 N'Методи роботи з DOM',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('1f34bdb0-62d2-4a77-ac3e-b4638159220f','4dee1c4a-d60f-41c0-b0d1-5e2b6bbd970f',
 N'Що повертає `document.querySelectorAll()`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('bdb14075-5766-4f2d-b6a1-5b9b98b92f0f','1f34bdb0-62d2-4a77-ac3e-b4638159220f',N'NodeList',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('d5f1e7f0-7020-4b09-b5d7-1b46db019e0f','1f34bdb0-62d2-4a77-ac3e-b4638159220f',N'HTMLCollection',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('5c96aa0c-2a4e-4c16-b4e0-3f429e5a480f','1f34bdb0-62d2-4a77-ac3e-b4638159220f',N'Array',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('c48e84b5-9be1-4cdb-89ef-0d5b91c2130f','4dee1c4a-d60f-41c0-b0d1-5e2b6bbd970f',
 N'NodeList vs HTMLCollection',
 N'Властивості, перебір, статичні та live-колекції.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 16. Event Delegation ─────────────── */
INSERT INTO "Tests" VALUES
('9f2e1cc3-b8f1-4dda-9f63-6f4a6653e610',N'Event Delegation',
 N'Делегування подій',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('2f4d7f62-c99b-4752-8201-fd0697e20210','9f2e1cc3-b8f1-4dda-9f63-6f4a6653e610',
 N'Перевага делегування подій полягає в тому, що…',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('50082154-eaa4-4e8b-a9cb-09114d155d10','2f4d7f62-c99b-4752-8201-fd0697e20210',
 N'Можна обробляти багато елементів одним слухачем',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('de0459f3-69a0-4b86-a0ae-6702b662ff10','2f4d7f62-c99b-4752-8201-fd0697e20210',
 N'Події виконуються швидше',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('602ae2eb-5ccb-479f-8eeb-31c9c1f4c310','2f4d7f62-c99b-4752-8201-fd0697e20210',
 N'Скасовується bubbling',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('c8c31998-5c45-4d9d-a8f0-4cdb9be7c010','9f2e1cc3-b8f1-4dda-9f63-6f4a6653e610',
 N'Делегування — як це працює',
 N'Використання властивості event.target + bubbling для динамічних елементів.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 17. Classes ─────────────── */
INSERT INTO "Tests" VALUES
('25ac741f-e542-41f9-8b6e-8074f060c711','JavaScript Classes',
 N'Класи та спадкування',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('d576d3e6-0eab-40c0-9d5e-1a7b621b5411','25ac741f-e542-41f9-8b6e-8074f060c711',
 N'Який метод викликається автоматично при створенні екземпляра класу?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('84012e93-eebb-4d3d-b301-325de1e01111','d576d3e6-0eab-40c0-9d5e-1a7b621b5411',N'constructor',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('5e66c697-7ea8-4c80-8df2-2a0ad30de911','d576d3e6-0eab-40c0-9d5e-1a7b621b5411',N'init',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('235a1a8d-3761-4c69-a7d1-0b2eba5fbe11','d576d3e6-0eab-40c0-9d5e-1a7b621b5411',N'setup',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('e93d76f3-0f08-4238-b092-40deb841ae11','25ac741f-e542-41f9-8b6e-8074f060c711',
 N'ES6 класи',
 N'Синтаксис, super(), статичні методи та приватні поля #.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 18. Prototypes ─────────────── */
INSERT INTO "Tests" VALUES
('63480dbe-bd32-41d6-b882-3bfa19b6d812','Prototypes',
 N'Прототипне наслідування',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('b81e6d0c-4d69-48bd-bf3f-9f4ed1736a12','63480dbe-bd32-41d6-b882-3bfa19b6d812',
 N'Через яку властивість доступний прототип обʼєкта?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('b6765cca-5d01-4f9b-9f12-8eb952a62c12','b81e6d0c-4d69-48bd-bf3f-9f4ed1736a12',N'__proto__',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('62bf3d57-f8d3-470f-b6a2-53e2b7846012','b81e6d0c-4d69-48bd-bf3f-9f4ed1736a12',N'prototype',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('d6c53ac0-2b27-4ce2-b395-094ba5f68512','b81e6d0c-4d69-48bd-bf3f-9f4ed1736a12',N'constructor',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('39df6d60-2302-4dc0-8fd9-7aa9e7f73e12','63480dbe-bd32-41d6-b882-3bfa19b6d812',
 N'Ланцюжок прототипів',
 N'Object.create, Object.getPrototypeOf та налаштування прототипу.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 19. ES6 Modules ─────────────── */
INSERT INTO "Tests" VALUES
('8d98438c-330e-4231-8cdb-9ed1c058db13','ES6 Modules',
 N'import/export, статичний аналіз',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('a9c5b1aa-9af9-4c3e-bd91-142721c6e713','8d98438c-330e-4231-8cdb-9ed1c058db13',
 N'Який тип підключення модулів гарантує асинхронне завантаження у браузері?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('14bca18e-0e0b-4f1d-9fa8-4b5ba1b9a613','a9c5b1aa-9af9-4c3e-bd91-142721c6e713',
 N'```<script type="module">```',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('95a8df9b-daab-4bdd-ab9e-8e12c6756413','a9c5b1aa-9af9-4c3e-bd91-142721c6e713',
 N'```<script defer>```',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('6e81aa6a-9716-4f0f-97d5-0d2bfe2c6e13','a9c5b1aa-9af9-4c3e-bd91-142721c6e713',
 N'```<script async>```',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('0025f609-ef2d-4a2c-9fa5-2f45699efc13','8d98438c-330e-4231-8cdb-9ed1c058db13',
 N'Модульна система ES6',
 N'Відмінності default vs named export, політика same-origin.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 20. Error Handling ─────────────── */
INSERT INTO "Tests" VALUES
('d7e30101-acdd-4b24-9f49-e014e5d8a514',N'Error Handling',
 N'try/catch/finally та throw',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('f2c95d8e-ce29-4f9e-8e5d-50e03ff78214','d7e30101-acdd-4b24-9f49-e014e5d8a514',
 N'У якому випадку виконається блок finally?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('abdb46ef-6cd9-4f0c-9c46-2c6ec5cb3c14','f2c95d8e-ce29-4f9e-8e5d-50e03ff78214',
 N'Завжди, незалежно від помилки',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('25cb461e-c2dd-4499-8d46-a0aa0b78a214','f2c95d8e-ce29-4f9e-8e5d-50e03ff78214',
 N'Лише якщо помилка не зловлена',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('c3dceb30-fc6d-44c9-8bc2-c1c3ddf5f414','f2c95d8e-ce29-4f9e-8e5d-50e03ff78214',
 N'Тільки без помилок',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('ae064c4a-4df1-4dc6-b75d-63618c4c4314','d7e30101-acdd-4b24-9f49-e014e5d8a514',
 N'try / catch / finally',
 N'finally ідеально підходить для прибирання ресурсів: close, disconnect тощо.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 21. JSON ─────────────── */
INSERT INTO "Tests" VALUES
('c8e63bbb-7e9c-4f4f-88e1-98bf7acf2315','JSON',
 N'Серіалізація та парсинг',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('df9f5750-57a4-49bd-b588-0c169e413315','c8e63bbb-7e9c-4f4f-88e1-98bf7acf2315',
 N'Що зробить `JSON.parse("null")`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('90e7fbf5-2a72-4bb4-bf19-c5e3fbfab715','df9f5750-57a4-49bd-b588-0c169e413315',N'Поверне значення null',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('f6d5d3b6-7bfa-4525-8405-7ba1142f7f15','df9f5750-57a4-49bd-b588-0c169e413315',N'Викине SyntaxError',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('957d836b-97ba-49c3-ae1f-f567171f5b15','df9f5750-57a4-49bd-b588-0c169e413315',N'Поверне "null" (строку)',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('16d81332-e31f-45e7-9e12-726e4caf8a15','c8e63bbb-7e9c-4f4f-88e1-98bf7acf2315',
 N'JSON.parse & JSON.stringify',
 N'Друга-/третя-функція replacer та space, обмеження на циклічні посилання.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 22. Fetch API ─────────────── */
INSERT INTO "Tests" VALUES
('4fc92455-32e9-44ca-9284-514d851d4416',N'Fetch API',
 N'HTTP-запити через fetch',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('c80d9e1a-ef44-47ed-9f05-5c7e665fb616','4fc92455-32e9-44ca-9284-514d851d4416',
 N'Що повертає `fetch()` одразу після виклику?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('5950faa4-5ac9-4e46-ae2e-9f37fa418d16','c80d9e1a-ef44-47ed-9f05-5c7e665fb616',N'Promise<Response>',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('24433c8e-5979-4b8b-b02c-31701a704c16','c80d9e1a-ef44-47ed-9f05-5c7e665fb616',N'Обʼєкт Response',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('ae8bcedd-d4bf-4f1d-9e3e-37c293b72416','c80d9e1a-ef44-47ed-9f05-5c7e665fb616',N'ReadableStream',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('0c91e149-d5bb-472e-8ae9-7b6a4abd9c16','4fc92455-32e9-44ca-9284-514d851d4416',
 N'fetch: базовий синтаксис',
 N'Методи response.json(), status, headers та обробка помилок.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 23. Storage ─────────────── */
INSERT INTO "Tests" VALUES
('e2e7e2c3-77cf-4dd3-b0e5-986df2c9e817',N'Web Storage',
 N'localStorage та sessionStorage',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('58b80398-b78b-490a-9e1c-e9c1d37d3c17','e2e7e2c3-77cf-4dd3-b0e5-986df2c9e817',
 N'Яка максимальна орієнтовна ємність localStorage у більшості браузерів?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('247f30f9-28ec-4cd3-90a4-808d23f20217','58b80398-b78b-490a-9e1c-e9c1d37d3c17',N'≈ 5 МБ',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('26a32f72-f3d5-4ef1-833a-acc7c9239417','58b80398-b78b-490a-9e1c-e9c1d37d3c17',N'≈ 50 МБ',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('3d27d140-1f2b-47e5-a80b-ef5799f52217','58b80398-b78b-490a-9e1c-e9c1d37d3c17',N'Необмежено',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('89a74749-4ab5-4926-8e88-b4dd632fd017','e2e7e2c3-77cf-4dd3-b0e5-986df2c9e817',
 N'API Web Storage',
 N'setItem/getItem, подія storage та відмінності між local і session.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 24. Map & Set ─────────────── */
INSERT INTO "Tests" VALUES
('e615cb9e-40df-4c9e-a20e-6eab7cc93a18',N'Map & Set',
 N'ES6 колекції',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('e0d05547-5810-430e-b2e5-958f5dfbd218','e615cb9e-40df-4c9e-a20e-6eab7cc93a18',
 N'Чим ключі Map відрізняються від властивостей Object?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('f059b5d9-3178-4b7d-b9fc-8ed0c54d8a18','e0d05547-5810-430e-b2e5-958f5dfbd218',
 N'Можуть бути будь-яким значенням, включно з обʼєктами',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('765b592e-a5b5-4201-9276-be541fcc8e18','e0d05547-5810-430e-b2e5-958f5dfbd218',
 N'Завжди перетворюються на рядок',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('c4ba83aa-11e1-4a55-8c70-88da014f9118','e0d05547-5810-430e-b2e5-958f5dfbd218',
 N'Чутливі до регістру',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('7fa6370e-3f70-480f-a178-7108b1185428','e615cb9e-40df-4c9e-a20e-6eab7cc93a18',
 N'Map та Set',
 N'Методи size, has, forEach; слабкі колекції WeakMap/WeakSet.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 25. Type Coercion ─────────────── */
INSERT INTO "Tests" VALUES
('ead0e22f-6986-4e5f-9057-bcdce4a15219',N'Type Coercion',
 N'Неявне й явне приведення типів',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('d13a5d69-300b-427a-9fbf-2b17bfba1019','ead0e22f-6986-4e5f-9057-bcdce4a15219',
 N'Який результат `[] + 1`?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('2687a3d6-5f6e-4d94-9b66-6b908ad40219','d13a5d69-300b-427a-9fbf-2b17bfba1019',N'"1"',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('4e0863c9-4294-4d5f-955a-e0421da92419','d13a5d69-300b-427a-9fbf-2b17bfba1019',N'1',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('2e3027e6-5ff6-4ed2-8bfd-12d31423cb19','d13a5d69-300b-427a-9fbf-2b17bfba1019',N'NaN',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('543a4d58-5e4e-4f7d-8911-84d5e5415519','ead0e22f-6986-4e5f-9057-bcdce4a15219',
 N'Алгоритми абстрактних операцій ToString/ToNumber',
 N'Таблиця ручного приведення + приклади з MDN.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 26. Strict Mode ─────────────── */
INSERT INTO "Tests" VALUES
('de1b9f06-79db-4c98-93fb-a2d040cdfb1a',N'Strict Mode',
 N'"use strict" та обмеження',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('24667d50-205b-4e34-9e67-086d8d47941a','de1b9f06-79db-4c98-93fb-a2d040cdfb1a',
 N'Що станеться при присвоєнні значення неоголошеній змінній у strict mode?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('927080db-e1f5-46c1-9e9b-6d1cb920c71a','24667d50-205b-4e34-9e67-086d8d47941a',
 N'Буде викинуто ReferenceError',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('34582fb4-2921-4bd6-8fae-7bf7f32ad11a','24667d50-205b-4e34-9e67-086d8d47941a',
 N'Змінна створиться в глобальній області',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('72a97097-1157-44b9-8fb5-1bf6265d311a','24667d50-205b-4e34-9e67-086d8d47941a',
 N'Відбудеться тихе ігнорування',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('a9923def-43c9-4a07-9fb1-a26901cdef1a','de1b9f06-79db-4c98-93fb-a2d040cdfb1a',
 N'Strict Mode',
 N'Додаткові помилки: дубльовані параметри, заборона with, etc.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 27. Web Workers ─────────────── */
INSERT INTO "Tests" VALUES
('0e7c295f-1d5a-4e70-82b6-0a4d4e38aa1b',N'Web Workers',
 N'Паралельність у браузері',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('4b2d2c1e-3b85-4a6f-9563-4c04155c831b','0e7c295f-1d5a-4e70-82b6-0a4d4e38aa1b',
 N'Який механізм використовується для обміну даними з веб-воркером?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('9e362bd9-2fa1-47b9-a3d7-d9e5d763941b','4b2d2c1e-3b85-4a6f-9563-4c04155c831b',
 N'postMessage / onmessage',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('25eaef38-4cd9-4dc5-bd96-102b4e04fb1b','4b2d2c1e-3b85-4a6f-9563-4c04155c831b',
 N'SharedArrayBuffer',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('7c4ac86d-79fe-4a16-bea6-f202b9feec1b','4b2d2c1e-3b85-4a6f-9563-4c04155c831b',
 N'localStorage',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('a12ec7c1-ecdc-4f1d-8067-c1eb6c46921b','0e7c295f-1d5a-4e70-82b6-0a4d4e38aa1b',
 N'Веб-воркери',
 N'Створення через new Worker(), обробка повідомлень та обмеження доступу до DOM.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 28. WebSockets ─────────────── */
INSERT INTO "Tests" VALUES
('1a374fae-1c3d-40e9-95ff-7d04b5d2d31c',N'WebSockets',
 N'Двосторонній звʼязок у реальному часі',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('5c4fc687-6364-4a54-b4c4-5b1ec395551c','1a374fae-1c3d-40e9-95ff-7d04b5d2d31c',
 N'Який статус-код HTTP використовується при апгрейді до протоколу WebSocket?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('3ad4e360-f23f-48c4-8903-20028e20901c','5c4fc687-6364-4a54-b4c4-5b1ec395551c',N'101',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('63e225a6-4f74-40c8-9bd4-9224b1b1981c','5c4fc687-6364-4a54-b4c4-5b1ec395551c',N'200',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('1a7d0868-d5fc-4fed-9b96-6d2b5b6afb1c','5c4fc687-6364-4a54-b4c4-5b1ec395551c',N'302',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('d4478eaf-7442-4377-9e18-38ac45afad1c','1a374fae-1c3d-40e9-95ff-7d04b5d2d31c',
 N'Протокол WebSocket',
 N'Фрейми, ping/pong, події open, message, close, error.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 29. Service Workers ─────────────── */
INSERT INTO "Tests" VALUES
('b67fcb84-29e2-47ce-9ba2-fef0bc52431d',N'Service Workers',
 N'PWA, кешування, офлайн-режим',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('78f5d651-3399-4bbf-ae2f-1e5dbc5aa61d','b67fcb84-29e2-47ce-9ba2-fef0bc52431d',
 N'У якій події Service Worker зазвичай кешує статичні ресурси?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('de2b501e-532e-48c8-91d9-9b8a22f9011d','78f5d651-3399-4bbf-ae2f-1e5dbc5aa61d',N'install',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('5c57a8fd-7afb-456e-9ee7-4d7dfc193f1d','78f5d651-3399-4bbf-ae2f-1e5dbc5aa61d',N'activate',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('bcca2ef2-d50e-4b16-adc6-6b74b067231d','78f5d651-3399-4bbf-ae2f-1e5dbc5aa61d',N'fetch',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('3e4bdc9a-8d1f-4a3e-8d1d-9caa37e1071d','b67fcb84-29e2-47ce-9ba2-fef0bc52431d',
 N'Життєвий цикл Service Worker',
 N'install → activate → fetch; стратегії кешування (cache-first, network-first).',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/* ─────────────── 30. Garbage Collection ─────────────── */
INSERT INTO "Tests" VALUES
('72413a09-bf3e-4dc0-84f7-3be9fe2b603e',N'Garbage Collection',
 N'Звільнення памʼяті в JS',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Questions" VALUES
('d29f5f4d-5e18-4697-b45e-314288aa9c3e','72413a09-bf3e-4dc0-84f7-3be9fe2b603e',
 N'Який алгоритм збирача сміття використовується в сучасних JS-движках?',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "Answers" VALUES
('b986ff04-a27f-44e6-bb62-19e1fb3cc93e','d29f5f4d-5e18-4697-b45e-314288aa9c3e',
 N'Mark-and-Sweep з поколіннями',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('72728422-8ebb-47ae-8e07-f2e502bd0f3e','d29f5f4d-5e18-4697-b45e-314288aa9c3e',N'Reference Counting',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('712a66b9-87fb-47b7-9875-6374b1a6283e','d29f5f4d-5e18-4697-b45e-314288aa9c3e',N'Copy-on-write',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO "LearningMaterials" VALUES
('8bb12d39-6b3e-452a-9d38-50fcf361e33e','72413a09-bf3e-4dc0-84f7-3be9fe2b603e',
 N'Як працює GC у V8',
 N'Поколіннєва модель: new space, old space, цикломаркування та компактація.',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);