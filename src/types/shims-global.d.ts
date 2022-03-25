// Components
import { SwitchInput, TextInput } from "@components/form";
import { ActionBar } from "@components/layout";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ActionBar: typeof ActionBar;
    SwitchInput: typeof SwitchInput;
    TextInput: typeof TextInput;
  }
}
