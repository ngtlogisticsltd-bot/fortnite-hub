export const reaperConfig = {
  globalEnabled: true,
  environment: process.env.NODE_ENV || 'development',
  requireApprovalForHighRisk: true,
  logLevel: 'debug',
  safeOrderPhases: [
    'FETCH_DATA',
    'VALIDATE_CONTENT',
    'CHECK_COMPLIANCE',
    'PREPARE_PAYLOAD',
    'LOG_RESULT'
  ],
  legal: {
    enforcePublicAPIsOnly: true,
    blockRestrictedScraping: true,
    blockCopyrightedMediaDownloads: true,
    requireDisclaimer: true
  }
};
