export function normalizeFeatureKey(featureKey) {
  if (typeof featureKey !== "string") {
    return "";
  }

  return featureKey.trim().toUpperCase();
}

export function tenantHasFeature(context, featureKey) {
  const normalizedKey = normalizeFeatureKey(featureKey);

  if (!normalizedKey) {
    return false;
  }

  return context.features.some(
    (feature) =>
      normalizeFeatureKey(feature.key) === normalizedKey &&
      feature.enabled === true,
  );
}

export function getEnabledFeatureKeys(context) {
  return context.features
    .filter((feature) => feature.enabled === true)
    .map((feature) => normalizeFeatureKey(feature.key));
}
