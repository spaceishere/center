export const Price = ({
  amount,
  className,
  currencyCode = "MNT",
}: {
  amount: string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => (
  <span suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(amount))}`}
  </span>
);
