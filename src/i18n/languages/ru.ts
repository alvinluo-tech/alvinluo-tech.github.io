import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ru: Translation = {
  [Key.home]: "Главная",
  [Key.about]: "О нас",
  [Key.archive]: "Архив",
  [Key.search]: "Поиск",
  [Key.other]: "Прочее",

  [Key.tags]: "Теги",
  [Key.categories]: "Категории",
  [Key.recentPosts]: "Последние посты",
  [Key.postList]: "Список постов",
  [Key.tableOfContents]: "Содержание",

  // Объявление
  [Key.announcement]: "Объявление",
  [Key.announcementClose]: "Закрыть",

  [Key.comments]: "Комментарии",
  [Key.commentSection]: "Комментарии",
  [Key.commentSubtitle]: "Поделитесь своими мыслями и обсудите с остальными",
  [Key.commentNotConfigured]: "Система комментариев не настроена",
  [Key.friends]: "Ссылки",
  [Key.untitled]: "Без названия",
  [Key.uncategorized]: "Без категории",
  [Key.noTags]: "Нет тегов",

  [Key.wordCount]: "слово",
  [Key.wordsCount]: "слова",
  [Key.minuteCount]: "минута",
  [Key.minutesCount]: "минуты",
  [Key.postCount]: "пост",
  [Key.postsCount]: "постов",

  [Key.themeColor]: "Цвет темы",

  [Key.lightMode]: "Светлая",
  [Key.darkMode]: "Тёмная",
  [Key.systemMode]: "Система",

  [Key.more]: "Ещё",

  [Key.author]: "Автор",
  [Key.publishedAt]: "Опубликовано",
  [Key.license]: "Лицензия",
  [Key.anime]: "Аниме",

  // Страница аниме
  [Key.animeTitle]: "Мой список аниме",
  [Key.animeSubtitle]: "Запись моего аниме путешествия",
  [Key.animeList]: "Список аниме",
  [Key.animeTotal]: "Всего",
  [Key.animeWatching]: "Смотрю",
  [Key.animeCompleted]: "Завершено",
  [Key.animeAvgRating]: "Средний рейтинг",
  [Key.animeStatusWatching]: "Смотрю",
  [Key.animeStatusCompleted]: "Завершено",
  [Key.animeStatusPlanned]: "Запланировано",
  [Key.animeStudio]: "Студия",
  [Key.animeEmpty]: "Нет данных об аниме",
  [Key.animeEmptyBangumi]:
    "Пожалуйста, проверьте конфигурацию Bangumi или подключение к сети",
    
  // Статус аниме
  [Key.animeStatusAll]: "Все",
  [Key.animeStatusWish]: "Хочу",
  [Key.animeStatusDone]: "Просмотрено",
  [Key.animeStatusDoing]: "Смотрю",
  [Key.animeStatusOnhold]: "Отложено",
  [Key.animeStatusDropped]: "Брошено",
  
  // Текст страницы аниме
  [Key.animeLoading]: "Загрузка данных об аниме...",
  [Key.animeLoadingDescription]: "Пожалуйста, подождите, загружаем вашу коллекцию из Bangumi",
  [Key.animeError]: "Ошибка загрузки данных",
  [Key.animeErrorDescription]: "Не удается подключиться к Bangumi API, пожалуйста, проверьте подключение к сети или попробуйте позже",
  [Key.animeRetry]: "Повторить",
  [Key.animeEmptyData]: "Нет данных",
  [Key.animeEmptyDescription]: "Аниме в этой категории не найдено",
  [Key.animeEmptySuggestion]: "Попробуйте переключиться на другие категории",
  [Key.animeConfigDescription]: "Пожалуйста, установите ваш ID пользователя Bangumi в src/config/siteConfig.ts",
  [Key.animeRefreshNote]: "Из-за некоторых ограничений может потребоваться обновить страницу один раз для загрузки данных об аниме, пока нет хорошего решения",
  
  // Информация об аниме
  [Key.animeYear]: "Год",
  [Key.animeEpisodes]: "Серий",
  [Key.animeRank]: "Рейтинг",
  [Key.animeUnknown]: "Неизвестно",
  [Key.animeLoadFailed]: "Ошибка загрузки",

  // Пагинация
  [Key.paginationFirst]: "Первая",
  [Key.paginationPrev]: "Предыдущая",
  [Key.paginationNext]: "Следующая",
  [Key.paginationLast]: "Последняя",
  [Key.paginationPage]: "Страница",
  [Key.paginationOf]: "из",
  [Key.paginationTotal]: ", всего",
  [Key.paginationRecords]: " записей",

  // 404 Страница
  [Key.notFound]: "404",
  [Key.notFoundTitle]: "Страница не найдена",
  [Key.notFoundDescription]:
    "Извините, страница, которую вы посетили, не существует или была перемещена.",
  [Key.backToHome]: "Вернуться на главную",

  // Плеер музыки
  [Key.playlist]: "Плейлист",


	// RSS Страница
	[Key.rss]: "RSS лента",
	[Key.rssDescription]: "Подпишитесь, чтобы получать последние обновления",
	[Key.rssSubtitle]:
		"Подписаться через RSS, чтобы сразу получать последние статьи и обновления",
	[Key.rssLink]: "RSS ссылка",
	[Key.rssCopyToReader]: "Скопировать ссылку в ваш RSS читатель",
	[Key.rssCopyLink]: "Скопировать ссылку",
	[Key.rssLatestPosts]: "Последние посты",
	[Key.rssWhatIsRSS]: "Что такое RSS?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) — стандартный формат для публикации часто обновляемого контента. С RSS вы можете:",
	[Key.rssBenefit1]:
		"Получать последний контент сайта вовремя без ручного посещения",
	[Key.rssBenefit2]: "Управлять подписками на несколько сайтов в одном месте",
	[Key.rssBenefit3]: "Не пропускать важные обновления и статьи",
	[Key.rssBenefit4]: "Наслаждаться чистым чтением без рекламы",
	[Key.rssHowToUse]:
		"Рекомендуется использовать Feedly, Inoreader или другие RSS читатели для подписки на этот сайт.",
	[Key.rssCopied]: "RSS ссылка скопирована в буфер обмена!",
	[Key.rssCopyFailed]: "Ошибка копирования, пожалуйста, скопируйте ссылку вручную",



  // Последнее изменение
  [Key.lastModifiedPrefix]: "Последнее обновление: ",
  [Key.lastModifiedOutdated]: "Некоторый контент может быть устаревшим",
  [Key.lastModifiedDaysAgo]: "{days} дней назад",
  [Key.year]: "год",
  [Key.month]: "месяц",
  [Key.day]: "день",
  [Key.hour]: "час",
  [Key.minute]: "минута",
  [Key.second]: "секунда",

  // Статистика просмотров
  [Key.pageViews]: "Просмотры",
  [Key.pageViewsLoading]: "Загрузка...",
  [Key.pageViewsError]: "Статистика недоступна",

  // Закреплено
  [Key.pinned]: "Закреплено",

  // Режим обоев
  [Key.wallpaperMode]: "Режим обоев",
  [Key.wallpaperBannerMode]: "Баннер обои",
  [Key.wallpaperOverlayMode]: "Обои на весь экран",
  [Key.wallpaperNoneMode]: "Однотонный фон",
};

