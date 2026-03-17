export const currency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

export const paginate = <T>(items: T[], page = 1, pageSize = 9) => {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    totalPages: Math.ceil(items.length / pageSize)
  };
};
