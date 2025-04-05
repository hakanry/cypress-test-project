import { errorMessages } from "../../src/components/Register";

describe("Kayıt Sayfası", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000/");
  });
  describe("Olumsuz Testler", () => {
    it("Ad girişi yanlış mı?", () => {
      cy.get('[data-cy="input-ad"]').type("Ha");
      cy.contains(errorMessages.ad);
    });
    it("Soyad girişi yanlış mu?", () => {
      cy.get('[data-cy="input-soyad"]').type("Ya");
      cy.contains(errorMessages.soyad);
    });
    it("Email girişi yanlış mu?", () => {
      cy.get('[data-cy="input-email"]').type("hakan@gg");
      cy.contains(errorMessages.email);
    });
    it("Şifre girişi yanlış mu?", () => {
      cy.get('[data-cy="input-password"]').type("Ha12");
      cy.contains(errorMessages.password);
    });
    it("Checkbox işaretli değil mi?", () => {
      cy.get('[data-cy="checkbox"]').should("not.checked");
    });
    it("İnputlar yanlışken buton disabled mı?", () => {
      cy.get('[data-cy="buton-submit"]').should("be.disabled");
    });
  });
  describe("Olumlu Testler", () => {
    it("Ad girişi doğru mu?", () => {
      cy.get('[data-cy="input-ad"]').type("Hakan");
    });
    it("Soyad girişi doğru mu?", () => {
      cy.get('[data-cy="input-soyad"]').type("Yalçın");
    });
    it("Email girişi doğru mu?", () => {
      cy.get('[data-cy="input-email"]').type("hakanry@wit.com");
    });
    it("Şifre girişi doğru mu?", () => {
      cy.get('[data-cy="input-password"]').type("Hakan123*!");
    });
    it("Checkbox işaretlenebiliyor mu?", () => {
      cy.get('[data-cy="checkbox"]').check();
      cy.get('[data-cy="checkbox"]').should("be.checked");
    });
    it("İnputlar doğruyken buton enabled mı?", () => {
      cy.get('[data-cy="input-ad"]').type("Hakan");
      cy.get('[data-cy="input-soyad"]').type("Yalçın");
      cy.get('[data-cy="input-email"]').type("hakanry@wit.com");
      cy.get('[data-cy="input-password"]').type("Hakan123*!");
      cy.get('[data-cy="checkbox"]').check();
      cy.get('[data-cy="buton-submit"]').should("be.enabled");
    });
    it("Buton submit olunca ID görünüyor mu?", () => {
      cy.get('[data-cy="input-ad"]').type("Hakan");
      cy.get('[data-cy="input-soyad"]').type("Yalçın");
      cy.get('[data-cy="input-email"]').type("hakanry@wit.com");
      cy.get('[data-cy="input-password"]').type("Hakan123*!");
      cy.get('[data-cy="checkbox"]').check();
      cy.get('[data-cy="buton-submit"]').click();
      cy.get('[data-cy="id-message"]').should("be.visible");
    });
  });
});
