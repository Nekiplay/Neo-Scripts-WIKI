import fs from 'node:fs';
import path from 'node:path';

// Базовые директории источника и назначения
const baseSrc = path.resolve('26.1.2/docs');
const baseDest = 'C:/xampp/htdocs/wiki/26.1.2';

// Список задач для копирования:
// from - имя папки внутри docs/
// to   - путь, куда её положить внутри C:/xampp/htdocs/wiki/
const copyTasks = [
  { from: '.gitbook/assets', to: 'assets' },
  { from: 'datatypes', to: 'assets/datatypes' },
  
  // Сюда вы можете добавлять любые другие папки по аналогии:
  // { from: 'имя_папки_в_docs', to: 'assets/имя_папки_в_wiki' },
];

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`Предупреждение: Папка источника ${from} не найдена.`);
    return;
  }
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const srcElement = path.join(from, element);
    const destElement = path.join(to, element);
    
    if (fs.lstatSync(srcElement).isDirectory()) {
      copyFolderSync(srcElement, destElement);
    } else {
      fs.copyFileSync(srcElement, destElement);
    }
  });
}

// Запуск копирования для каждой задачи
copyTasks.forEach(task => {
  const fullSrc = path.join(baseSrc, task.from);
  const fullDest = path.join(baseDest, task.to);
  
  try {
    copyFolderSync(fullSrc, fullDest);
    console.log(`Успешно: Папка "${task.from}" скопирована в "${task.to}"`);
  } catch (err) {
    console.error(`Ошибка при копировании папки "${task.from}":`, err);
  }
});