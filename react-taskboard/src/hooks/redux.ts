import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index.ts";
import { useDispatch } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
