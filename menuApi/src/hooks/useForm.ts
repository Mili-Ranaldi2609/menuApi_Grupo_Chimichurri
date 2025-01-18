import { ChangeEvent, useState } from "react";

type FormState<T> = {
  formState: T;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setFormState: React.Dispatch<React.SetStateAction<T>>;
};

export const useForm = <T extends Record<string, any>>(
  initialForm: T
): FormState<T> => {
  const [formState, setFormState] = useState<T>(initialForm);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormState((prevState) => ({
        ...prevState,
        [parent]: {
          ...(prevState[parent] || {}),
          [child]: value,
        },
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return {
    formState,
    onInputChange,
    setFormState,
  };
};