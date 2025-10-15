import { useState } from "react";

export type PlayerFormData = {
  firstName: string;
  lastName: string;
  hand: string;
  dateOfBirth: string;
  ioc: string;
  height: string;
  elo: string;
  eloHard: string;
  eloGrass: string;
  eloCarpet: string;
  eloClay: string;
};

const INITIAL_FORM_DATA: PlayerFormData = {
  firstName: "",
  lastName: "",
  hand: "R",
  dateOfBirth: "",
  ioc: "",
  height: "",
  elo: "",
  eloHard: "",
  eloGrass: "",
  eloCarpet: "",
  eloClay: "",
};

export const usePlayerForm = (initialData?: Partial<PlayerFormData>) => {
  const [formData, setFormData] = useState<PlayerFormData>({
    ...INITIAL_FORM_DATA,
    ...initialData,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMessage("First name and last name are required");
      return false;
    }

    if (!formData.dateOfBirth) {
      setErrorMessage("Date of birth is required");
      return false;
    }

    if (!formData.ioc.trim()) {
      setErrorMessage("Country code (IOC) is required");
      return false;
    }

    return true;
  };

  const preparePlayerData = () => {
    return {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      hand: formData.hand,
      dateOfBirth: new Date(formData.dateOfBirth),
      ioc: formData.ioc.trim().toUpperCase(),
      height: Number(formData.height),
      elo: Number(formData.elo) || 1500,
      eloHard: Number(formData.eloHard) || 1500,
      eloGrass: Number(formData.eloGrass) || 1500,
      eloCarpet: Number(formData.eloCarpet) || 1500,
      eloClay: Number(formData.eloClay) || 1500,
    };
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrorMessage("");
  };

  return {
    formData,
    errorMessage,
    handleChange,
    validateForm,
    preparePlayerData,
    resetForm,
    setErrorMessage,
  };
};
