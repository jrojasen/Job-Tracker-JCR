import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("salary validation", () => {
  test("accepts a prospect with no salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a blank salary string", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a plain numeric salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "85000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a salary with dollar sign and commas", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "$120,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a salary with decimal places", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "75000.50",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("rejects a non-numeric salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "lots of money",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Please enter a valid salary amount");
  });

  test("rejects a negative salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "-5000",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Please enter a valid salary amount");
  });

  test("rejects an unreasonably large salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "99999999999",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Please enter a valid salary amount");
  });
});

describe("follow-up date validation", () => {
  test("accepts a prospect with no follow-up date", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a blank follow-up date string", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      followUpDate: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a valid future date", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      followUpDate: "2099-12-31",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a valid past date", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      followUpDate: "2020-01-15",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("rejects a non-date string", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      followUpDate: "not-a-date",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Please enter a valid follow-up date");
  });

  test("rejects a malformed date", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      followUpDate: "2024-99-99",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Please enter a valid follow-up date");
  });
});
