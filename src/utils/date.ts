// Converts DD/MM/YYYY string -> YYYY-MM-DD string (for input value)
export const formatToYYYYMMDD = (
  dateStringDDMMYYYY: string | undefined | null
): string => {
  if (!dateStringDDMMYYYY) return "";

  const parts = dateStringDDMMYYYY.split("/");
  if (parts.length === 3) {
    const day = parts[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2];

    if (year && year.length === 4 && day && month) {
      return `${year}-${month}-${day}`;
    }
  }

  return "";
};

export const formatToDDMMYYYY = (
  dateStringYYYYMMDD: string | undefined | null
): string => {
  if (!dateStringYYYYMMDD) return "";

  const parts = dateStringYYYYMMDD.split("-");
  if (parts.length === 3) {
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    if (year && year.length === 4 && day && month) {
      return `${day}/${month}/${year}`;
    }
  }
  return "";
};

export const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString + "T00:00:00"));
  } catch {
    return dateString;
  }
};
