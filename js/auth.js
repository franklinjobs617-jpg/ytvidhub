document.addEventListener("DOMContentLoaded", () => {
  // --- Get all required elements from the DOM ---
  const loginButton = document.getElementById("login-button");
  const mobileLoginButton = document.getElementById("mobile-login-button");
  const loginModalContainer = document.getElementById("login-modal-container");
  const loginModalContent = document.getElementById("login-modal-content");
  const modalCloseButton = document.getElementById("modal-close-button");
  const GoolgeLogin = document.getElementById("google-login");

  const openModal = () => {
    if (loginModalContainer) {
      loginModalContainer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  };

  //google登录

  GoolgeLogin.addEventListener("click", (event) => {
    event.preventDefault();
  });

  const closeModal = () => {
    if (loginModalContainer) {
      loginModalContainer.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    openModal();
  };

  if (loginButton) {
    loginButton.addEventListener("click", handleLoginClick);
  }
  if (mobileLoginButton) {
    mobileLoginButton.addEventListener("click", handleLoginClick);
  }

  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", closeModal);
  }

  if (loginModalContainer) {
    loginModalContainer.addEventListener("click", (event) => {
      if (event.target === loginModalContainer) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (
      !loginModalContainer.classList.contains("hidden") &&
      event.key === "Escape"
    ) {
      closeModal();
    }
  });
});
