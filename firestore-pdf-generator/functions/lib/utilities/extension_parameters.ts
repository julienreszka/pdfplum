export type ExtensionParameters = {
  ADJUST_HEIGHT_TO_FIT: "yes" | "no";
  CHROMIUM_PDF_OPTIONS: string;
  FIRESTORE_COLLECTION: string;
  NETWORK_IDLE_TIME: string;
  OUTPUT_STORAGE_BUCKET?: string;
  RETURN_PDF_IN_RESPONSE: string;
  SHOULD_MAKE_PDF_PUBLIC: string;
  SHOULD_WAIT_FOR_IS_READY: "yes" | "no";
  TEMPLATE_PATH: string;
};

const {
  ADJUST_HEIGHT_TO_FIT,
  CHROMIUM_PDF_OPTIONS,
  FIRESTORE_COLLECTION,
  NETWORK_IDLE_TIME,
  OUTPUT_STORAGE_BUCKET,
  RETURN_PDF_IN_RESPONSE,
  SHOULD_MAKE_PDF_PUBLIC,
  SHOULD_WAIT_FOR_IS_READY,
  TEMPLATE_PATH,
} = process.env as ExtensionParameters;

export const extensionParameters: ExtensionParameters = {
  ADJUST_HEIGHT_TO_FIT,
  CHROMIUM_PDF_OPTIONS,
  FIRESTORE_COLLECTION,
  NETWORK_IDLE_TIME,
  OUTPUT_STORAGE_BUCKET,
  RETURN_PDF_IN_RESPONSE,
  SHOULD_MAKE_PDF_PUBLIC,
  SHOULD_WAIT_FOR_IS_READY,
  TEMPLATE_PATH,
};
