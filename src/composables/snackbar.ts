import { onBeforeUnmount, reactive, ref } from "vue";

interface IUseSnackbar {
  notify: (message: string, type?: SnackbarType) => void;
  notifyError: (message: string) => void;
  notifySuccess: (message: string) => void;
  notifyWarning: (message: string) => void;
  snackbar: ISnackbar;
}

interface ISnackbar {
  text: string;
  type?: SnackbarType;
  visible: boolean;
}

type SnackbarType = "success" | "error" | "warning";

const snackbarStore = reactive<ISnackbar>({
  text: "",
  type: undefined,
  visible: false,
});

const SNACKBAR_DURATION = 4000;

/**
 * Snackbar notification utility
 */
const useSnackbar = (): IUseSnackbar => {
  const snackbarTimeout = ref<number | undefined>();

  onBeforeUnmount(() => {
    clearTimeout(snackbarTimeout.value);
  });

  const notify = (message: string, type?: SnackbarType) => {
    // NOTE: Delay must be established before changing visibility!
    const closeDelay = snackbarStore.visible ? 250 : 10;

    snackbarStore.visible = false;

    // NOTE: Wait until previous snackbar has closed to avoid flickering/jumps!
    setTimeout(() => {
      snackbarStore.text = message;
      snackbarStore.type = type;
      snackbarStore.visible = true;
    }, closeDelay);

    clearTimeout(snackbarTimeout.value);
    snackbarTimeout.value = window.setTimeout(() => {
      snackbarStore.visible = false;
    }, SNACKBAR_DURATION);
  };

  const notifyError = (message: string) => notify(message, "error");
  const notifySuccess = (message: string) => notify(message, "success");
  const notifyWarning = (message: string) => notify(message, "warning");

  return {
    notify,
    notifyError,
    notifySuccess,
    notifyWarning,
    snackbar: snackbarStore,
  };
};

export { useSnackbar };
