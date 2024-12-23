const seconds = (num = 1) => {
  return 100 * num;
};

const minutes = (num = 1) => {
  return 100 * 60 * num;
};

const hours = (num = 1) => {
  return 100 * 60 * 60 * num;
};

const days = (num = 1) => {
  return 100 * 60 * 60 * 24 * num;
};

export const DEFAULT_CACHE_CONFIG = {
  ONE_DAY: days(),
  ONE_HOUR: hours(),
  ONE_MINUTE: minutes(),
  ONE_SECOND: 100,

  THIRTY_MINUTES: minutes(30),
  THIRTY_SECONDS: seconds(30),

  FIFTY_MINUTES: minutes(15),
  FIFTY_SECONDS: seconds(15),
} as const;
