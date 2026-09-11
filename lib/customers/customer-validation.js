export function validateCustomerInput({
  name,
  phone,
  email,
  openingBalance = 0,
}) {
  if (!name || !name.trim()) {
    throw new Error("Customer name is required");
  }

  if (Number(openingBalance) < 0) {
    throw new Error("Opening balance cannot be negative");
  }

  if (email && !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  return true;
}
