# Чернорусские истории — mobile prototype

Это отдельное Expo / React Native приложение в папке `mobile-app`. Оно не заменяет существующий сайт.

## Что уже есть
- стартовый экран в мрачной атмосфере Черноруси;
- три открываемые записи дневника;
- интерактивный макет радиоприёмника.

## Следующий шаг: получить APK в облаке
1. Установить Node.js на компьютере (если работаешь только с телефоном — используй облачную среду).
2. В папке `mobile-app` выполнить `npm install`.
3. Создать Expo аккаунт и установить EAS CLI: `npm install -g eas-cli`.
4. Выполнить `eas login`, затем `eas build:configure`.
5. Для тестовой APK: `eas build --platform android --profile preview`.

Параметр projectId в app.json заменится при настройке EAS. Для Google Play нужен production AAB, а не preview APK.
