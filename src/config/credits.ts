export const CREDIT_COSTS = {
  download: 1,
  summary: 2,
  studyCards: 1,
} as const;

export const CREDIT_LABELS = {
  download: `${CREDIT_COSTS.download} credit / video`,
  summary: `${CREDIT_COSTS.summary} credits / video`,
} as const;
