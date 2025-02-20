// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// interface ServiceStore {
//   option?: string;
//   branch?: string;
//   date?: Date;
//   time?: string;

//   setOption: (option: string | undefined) => void;
//   setBranch: (branch: string | undefined) => void;
//   setDate: (date: Date | undefined) => void;
//   setTime: (time: string | undefined) => void;

//   clear: () => void;
// }

// export const useService = create(
//   persist<ServiceStore>(
//     (set) => ({
//       option: undefined,
//       branch: undefined,
//       date: undefined,
//       time: undefined,

//       setOption: (option: string | undefined) => set({ option }),
//       setBranch: (branch: string | undefined) => set({ branch }),
//       setDate: (date: Date | undefined) => set({ date }),
//       setTime: (time: string | undefined) => set({ time }),

//       clear: () =>
//         set({
//           option: undefined,
//           branch: undefined,
//           date: undefined,
//           time: undefined,
//         }),
//     }),
//     {
//       name: "pss",
//       storage: createJSONStorage(() => localStorage),
//     },
//   ),
// );

import { create } from "zustand";

interface ServiceStore {
  option?: string;
  branch?: string;
  date?: Date;
  time?: string;
  branchTitle?: string;

  setOption: (option: string | undefined) => void;
  setBranch: (branch: string | undefined) => void;
  setDate: (date: Date | undefined) => void;
  setTime: (time: string | undefined) => void;

  setBranchTitle: (branch: string | undefined) => void;

  clear: () => void;
}

export const useService = create<ServiceStore>((set) => ({
  option: undefined,
  branch: undefined,
  date: undefined,
  time: undefined,
  branchTitle: undefined,

  setOption: (option: string | undefined) => set({ option }),
  setBranch: (branch: string | undefined) => set({ branch }),
  setDate: (date: Date | undefined) => set({ date }),
  setTime: (time: string | undefined) => set({ time }),

  setBranchTitle: (title: string | undefined) => set({ branchTitle: title }),

  clear: () =>
    set({
      option: undefined,
      branch: undefined,
      date: undefined,
      time: undefined,
    }),
}));
