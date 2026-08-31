const MAX_RETRIES = 5;

export function shouldRetry(operation) {
  return operation.retryCount < MAX_RETRIES;
}

export function getRetryDelay(retryCount) {
  const delays = [
    5000,

    30000,

    120000,

    600000,

    1800000,
  ];

  return delays[retryCount] ?? null;
}
