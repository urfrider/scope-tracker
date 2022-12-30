import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "adminTracker",
    storage: localStorage,
  });

export const isAdmin = atom({
    key:"isAdmin",
    default: false,
    effects_UNSTABLE: [persistAtom],
})