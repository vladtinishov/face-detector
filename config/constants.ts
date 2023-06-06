const miunte = 60;
const hour = 60 * miunte;

export const LANG_KEYS = ['ru', 'en', 'es', 'pt'];
export enum Lang {
  ru = 'ru',
  en = 'en',
  es = 'es',
  pt = 'pt',
}

export const PAYMENT_URL = 'https://gnzs.ru/payment';
export const CLOSE_SELF_PAGE_URL = 'https://cdn.gnzs.ru/publilc-widgets/self-close.html';
export const GOOGLE_APP_REDIRECT_URI = 'https://core-api.gnzs.ru/google/oauth/redirect';
export const AMO_OAUTH2_TOKEN_CLEARANSE = 60 * miunte * 2; // кол-во минут, за какое время до конца токена обновляем его данные через refresh_token

export const GNZS_AMO_ADMIN_PANEL_WIDGET_SECRET = 'RLAVnZOUed4GOVvAsinJp97TMV7io5v4FwANFuF9fZijwzhJDLt0fbgFjWTjTAOE'; // секретный ключ виджета Админ-панели, установленного в аккаунте gnzs.amocrm.ru

export const GNZS_CRONOS_PLATFORM_WIDGET_SECRET = 'lZ1c0vjTK59OkTOwzWOimNPIX5Tu2kpumtlkHmQCRhFLJcDDxqNJwaE6olUCEvFY';
export const GNZS_CRONOS_PLATFORM_WIDGET_ID = 59;

export const DIR_HOME = (mode: string) => `/develop/public-proxy/files/public/${mode}/gnzs-platform`;
export const FK_URL = (mode: string) => `https://files.gnzs.ru/${mode}/gnzs-platform`;

export const CACHING_EXP = {
  FRONTEND: {
    ACCOUNT_DATA: 60 * 12, // (мин) кэшируем хэш по данным аккаунта
    WIDGET_STATUS_NOTIFICATION: 60 * 6, // (мин) кэшируем показ уведомлений, что виджет не оплачен или заканчивается демо
    NOTIFICATIONS: 10, // (мин) кэшируем проверку уведомлений
  },

  BACKEND: {
    // кэширование данных по аккаунту
    ACCOUNT_DATA: {
      key: (accountId: number) => `CORE_ACCOUNT_DATA_${accountId}`,
      ttl: miunte * 15,
    },
    WIDGETS_DATA: {
      key: () => `CORE_WIDGETS_DATA`,
      ttl: hour * 24 * 7,
    },
    // настроки виджета
    WIDGET_SETTINGS: {
      key: (amoAccountId: number, widgetId: number) => `CORE_WIDGET_SETTINGS_${amoAccountId}_${widgetId}`,
      ttl: 24 * hour,
    },
    // кэширование информации (с описанием и данными до какого активен) по активации виджета
    WIDGET_ACTIVATION: {
      key: (amoAccountId: number, widgetId: number, lang: string) =>
        `CORE_WIDGET_STATUS_${amoAccountId}_${widgetId}_${lang.toUpperCase()}`,
      ttl: 12 * hour,
    },
    // кэширование статуса активности виджета в формате true/false
    WIDGET_ACTIVITY_STATUS: {
      key: (amoAccountId: number, widgetId: number) => `CORE_WIDGET_ACTIVITY_STATUS_${amoAccountId}_${widgetId}`,
      ttl: 6 * hour,
    },
    // кэширование данных по токену виджета/кастомной интеграции
    AMO_WIDGET_TOKEN: {
      key: (amoAccountId: number, widgetId: number, isCustom: boolean) =>
        isCustom
          ? `CORE_AMO_INTEGRATION_TOKEN_${amoAccountId}_${widgetId}`
          : `CORE_AMO_WIDGET_TOKEN_${amoAccountId}_${widgetId}`,
    },
    // кэширование токена для страницы оплаты виджета для аккаунта
    PAYMENT_URL_JWT: {
      key: (amoAccountId: number, widgetId: number) => `CORE_PAYMENT_URL_JWT_${amoAccountId}_${widgetId}`,
      ttl: 24 * hour,
    },
  },
};
