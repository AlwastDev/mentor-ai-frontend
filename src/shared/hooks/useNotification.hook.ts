"use client";
import { useMemo } from "react";
import { useSnackbar } from "notistack";
import type { SnackbarMessage, OptionsObject, VariantType } from "notistack";

const HIDE_DURATION = 5000;

export const useNotification = () => {
	const { enqueueSnackbar } = useSnackbar();

	const message = useMemo(() => {
		const messenger = function (
			text: SnackbarMessage,
			variant: VariantType,
			config: OptionsObject = {},
		) {
			enqueueSnackbar(text, {
				variant,
				autoHideDuration: HIDE_DURATION,
				...config,
			});
		};

		messenger.default = (text: SnackbarMessage, options?: OptionsObject) =>
			messenger(text, "default", options);
		messenger.success = (text: SnackbarMessage, options?: OptionsObject) =>
			messenger(text, "success", options);
		messenger.error = (text: SnackbarMessage, options?: OptionsObject) =>
			messenger(text, "error", options);
		messenger.info = (text: SnackbarMessage, options?: OptionsObject) =>
			messenger(text, "info", options);
		messenger.warning = (text: SnackbarMessage, options?: OptionsObject) =>
			messenger(text, "warning", options);
		messenger.warn = messenger.warning;

		return messenger;
	}, [enqueueSnackbar]);

	return message;
};
