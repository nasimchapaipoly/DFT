const BN_DIGITS=['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

function toBn(n){
  return String(n).replace(/[0-9]/g,d=>BN_DIGITS[d]);
}
