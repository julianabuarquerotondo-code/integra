import { describe, expect, it, vi } from "vitest";
import { generatePublicCode, isValidPublicCodeFormat } from "@/lib/utils/public-code";

describe("generatePublicCode", () => {
  it("gera um código no formato INT-XXXXXX sem caracteres ambíguos", async () => {
    const exists = vi.fn().mockResolvedValue(false);
    const code = await generatePublicCode(exists);
    expect(isValidPublicCodeFormat(code)).toBe(true);
    expect(code).toMatch(/^INT-[A-Z2-9]{6}$/);
    expect(code.replace(/^INT-/, "")).not.toMatch(/[O0I1]/);
  });

  it("tenta novamente em caso de colisão", async () => {
    const exists = vi
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    const code = await generatePublicCode(exists);
    expect(exists).toHaveBeenCalledTimes(3);
    expect(isValidPublicCodeFormat(code)).toBe(true);
  });

  it("lança erro após esgotar tentativas", async () => {
    const exists = vi.fn().mockResolvedValue(true);
    await expect(generatePublicCode(exists, 3)).rejects.toThrow();
    expect(exists).toHaveBeenCalledTimes(3);
  });
});
