const tinyDate = (ISOString: string) => {
  const date = new Date(ISOString);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });

  if (year === new Date().toLocaleDateString("en-US", { year: "numeric" })) {
    return `${date.getDate()} ${month.toLocaleLowerCase()}`;
  } else {
    return `${date.getDate()} ${month.toLocaleLowerCase()}, ${year}`;
  }
};

export default tinyDate;
