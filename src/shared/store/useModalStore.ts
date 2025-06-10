import { create } from "zustand";

interface ModalState {
	activeModal: string | null;
	params: any | null;
	openModal: (name: string, params?: any) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	activeModal: null,
	params: null,
	openModal: (name, params = null) =>
		set((state) =>
			state.activeModal !== name ? { activeModal: name, params } : state,
		),
	closeModal: () => set({ activeModal: null, params: null }),
}));
