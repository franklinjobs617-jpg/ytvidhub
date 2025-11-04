document.addEventListener("DOMContentLoaded", () => {
  // --- Clarity Analytics ---
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "treknw6bn0");

  // --- Global Variables & Constants ---
  const BaseUrl = "https://api.ytvidhub.com";
  const GOOGLE_CLIENT_ID =
    "943760400801-n0e8jdoqrm375sq6gk39pj8oampe6ci9.apps.googleusercontent.com";
  const BACKEND_REDIRECT_URI = "https://api.ytvidhub.com/prod-api/g/callback";
  let selectedProductId = null; // Stores the ID of the plan the user wants to buy

  // --- Element Selectors ---
  // Authentication
  const loginButton = document.getElementById("login-button");
  const mobileLoginButton = document.getElementById("login-button-mobile");
  const loginModalContainer = document.getElementById("login-modal-container");
  const modalCloseButton = document.getElementById("modal-close-button");
  const googleLoginButton = document.getElementById("google-login");
  const purchaseButtons = document.querySelectorAll(".purchase-button");

  // User Profile & Credits
  const creditsNumber = document.querySelector("#credits");
  const credits_mobile = document.querySelector("#credits-mobile");
  const userProfileDesktop = document.getElementById("user-profile-desktop");
  const userAvatarDesktop = document.getElementById("user-avatar-desktop");
  const userNameDesktop = document.getElementById("user-name-desktop");
  const userMenuButton = document.getElementById("user-menu-button");
  const userDropdownMenu = document.getElementById("user-dropdown-menu");
  const logoutButtonDesktop = document.getElementById("logout-button-desktop");
  const userProfileMobile = document.getElementById("user-profile-mobile");
  const userAvatarMobile = document.getElementById("user-avatar-mobile");
  const userNameMobileDropdown = document.getElementById(
    "user-name-mobile-dropdown"
  );
  const userMenuButtonMobile = document.getElementById(
    "user-menu-button-mobile"
  );
  const userDropdownMenuMobile = document.getElementById(
    "user-dropdown-menu-mobile"
  );
  const logoutButtonMobile = document.getElementById("logout-button-mobile");

  // Payment Modal
  const paymentModalContainer = document.getElementById(
    "payment-choice-modal-container"
  );
  const paymentModalCloseButton = document.getElementById(
    "payment-modal-close-button"
  );
  const stripeButton = document.getElementById("pay-with-stripe-btn");
  const paypalButton = document.getElementById("pay-with-paypal-btn");

  // --- Modal Functions ---
  const openLoginModal = () => {
    if (loginModalContainer) {
      loginModalContainer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  };

  const closeLoginModal = () => {
    if (loginModalContainer) {
      loginModalContainer.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  const showPaymentModal = () => {
    if (paymentModalContainer) {
      paymentModalContainer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  };

  const hidePaymentModal = () => {
    if (paymentModalContainer) {
      paymentModalContainer.classList.add("hidden");
      // Only reset body overflow if the login modal is also closed
      if (loginModalContainer.classList.contains("hidden")) {
        document.body.style.overflow = "";
      }
    }
  };

  // --- UI Update Functions ---
  const updateUIForLoggedInUser = (user) => {
    if (!user || !user.picture || !user.name) return;
    loginButton?.classList.add("hidden");
    mobileLoginButton?.classList.add("hidden");
    userProfileDesktop?.classList.remove("hidden");
    userProfileMobile?.classList.remove("hidden");
    if (userAvatarDesktop) userAvatarDesktop.src = user.picture;
    if (userNameDesktop) userNameDesktop.textContent = user.name;
    if (userAvatarMobile) userAvatarMobile.src = user.picture;
    if (creditsNumber) creditsNumber.innerHTML = user.credits;
    if (credits_mobile) credits_mobile.innerHTML = user.credits;
    if (userNameMobileDropdown) userNameMobileDropdown.textContent = user.name;
  };

  const updateUIForLoggedOutUser = () => {
    loginButton?.classList.remove("hidden");
    mobileLoginButton?.classList.remove("hidden");
    userProfileDesktop?.classList.add("hidden");
    userProfileMobile?.classList.add("hidden");
    userDropdownMenu?.classList.add("hidden");
    userDropdownMenuMobile?.classList.add("hidden");
  };

  // --- Core Logic Functions ---
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("auth_token");
    updateUIForLoggedOutUser();
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem("auth_token");
    const userString = localStorage.getItem("loggedInUser");
    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        updateUIForLoggedInUser(user);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        handleLogout(new Event("logout")); // Simulate logout event
      }
    } else {
      updateUIForLoggedOutUser();
    }
  };

  async function updateUser() {
    let token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const response = await fetch(`${BaseUrl}/prod-api/g/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) return;
      const data = await response.json();
      if (data.data) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.data));
        updateUIForLoggedInUser(data.data);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }

  function handleAuthMessage(event) {
    if (event.origin !== BaseUrl) return;
    if (!event.data || typeof event.data.token !== "string") {
      console.error("Invalid message from backend:", event.data);
      return closeLoginModal();
    }
    window.removeEventListener("message", handleAuthMessage);
    try {
      const parsedData = JSON.parse(event.data.token);
      const { user, token: jwtToken } = parsedData;
      if (!jwtToken || !user) throw new Error("Missing user or token.");
      localStorage.setItem("auth_token", jwtToken);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      updateUIForLoggedInUser(user);
      closeLoginModal();
    } catch (error) {
      console.error("Error parsing auth response:", error);
      closeLoginModal();
    }
  }

  // --- Purchase Flow ---
  function handlePurchase(event) {
    event.preventDefault();
    const isLoggedIn = !!localStorage.getItem("auth_token");
    if (!isLoggedIn) {
      return openLoginModal();
    }
    selectedProductId = event.currentTarget.dataset.productId;
    showPaymentModal();
  }

  async function handlePayPalPayment() {
    if (!selectedProductId) return alert("Please select a plan first.");

    const userInfoStr = localStorage.getItem("loggedInUser");
    const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
    if (!userInfo || !userInfo.googleUserId) {
      hidePaymentModal();
      openLoginModal();
      return alert("Your session is invalid. Please log in again.");
    }

    const originalButtonText = paypalButton.innerHTML;

    try {
      // Disable both buttons to prevent multiple clicks
      paypalButton.disabled = true;
      stripeButton.disabled = true;
      paypalButton.innerHTML = `Processing...`;

      const response = await fetch(`${BaseUrl}/prod-api/paypal/createOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleUserId: userInfo.googleUserId,
          type: selectedProductId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `API Error: ${response.statusText}`
        );
      }

      const data = await response.json();
      if (data && data.data) {
        window.location.href = data.data; // Redirect to PayPal
      } else {
        throw new Error("Checkout URL not found in API response.");
      }
    } catch (error) {
      console.error("PayPal Purchase failed:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      // Re-enable buttons and restore text, regardless of success or failure
      paypalButton.disabled = false;
      stripeButton.disabled = false;
      paypalButton.innerHTML = originalButtonText;
    }
  }

  async function handleStripePayment() {
    if (!selectedProductId) return alert("Please select a plan first.");

    const userInfoStr = localStorage.getItem("loggedInUser");
    const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
    if (!userInfo || !userInfo.googleUserId) {
      hidePaymentModal();
      openLoginModal();
      return alert("Your session is invalid. Please log in again.");
    }

    const originalButtonText = stripeButton.innerHTML;

    try {
      // Disable both buttons to prevent multiple clicks
      paypalButton.disabled = true;
      stripeButton.disabled = true;
      stripeButton.innerHTML = `Processing...`;

      const response = await fetch(`${BaseUrl}/prod-api/stripe/getPayUrl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleUserId: userInfo.googleUserId,
          type: selectedProductId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `API Error: ${response.statusText}`
        );
      }

      const data = await response.json();
      if (data && data.data) {
        window.location.href = data.data; // Redirect to PayPal
      } else {
        throw new Error("Checkout URL not found in API response.");
      }
    } catch (error) {
      console.error("PayPal Purchase failed:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      // Re-enable buttons and restore text, regardless of success or failure
      paypalButton.disabled = false;
      stripeButton.disabled = false;
      stripeButton.innerHTML = originalButtonText;
    }
  }

  // --- Attach Event Listeners ---
  loginButton?.addEventListener("click", openLoginModal);
  mobileLoginButton?.addEventListener("click", openLoginModal);

  logoutButtonDesktop?.addEventListener("click", handleLogout);
  logoutButtonMobile?.addEventListener("click", handleLogout);

  modalCloseButton?.addEventListener("click", closeLoginModal);
  loginModalContainer?.addEventListener("click", (e) => {
    if (e.target === loginModalContainer) closeLoginModal();
  });

  googleLoginButton?.addEventListener("click", (e) => {
    e.preventDefault();
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: BACKEND_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      prompt: "select_account",
      state: `${new Date().toDateString()}_youtube`,
    };
    const finalAuthUrl = `${googleAuthUrl}?${new URLSearchParams(params)}`;
    const width = 600,
      height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      finalAuthUrl,
      "GoogleLogin",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    window.addEventListener("message", handleAuthMessage, { once: true });
  });

  userMenuButton?.addEventListener("click", () =>
    userDropdownMenu?.classList.toggle("hidden")
  );
  userMenuButtonMobile?.addEventListener("click", () =>
    userDropdownMenuMobile?.classList.toggle("hidden")
  );

  purchaseButtons.forEach((button) =>
    button.addEventListener("click", handlePurchase)
  );

  paypalButton?.addEventListener("click", handlePayPalPayment);
  stripeButton?.addEventListener("click", handleStripePayment);

  paymentModalCloseButton?.addEventListener("click", hidePaymentModal);
  paymentModalContainer?.addEventListener("click", (e) => {
    if (e.target === paymentModalContainer) hidePaymentModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLoginModal();
      hidePaymentModal();
    }
  });

  document.addEventListener("click", (event) => {
    if (userProfileDesktop && !userProfileDesktop.contains(event.target)) {
      userDropdownMenu?.classList.add("hidden");
    }
    if (userProfileMobile && !userProfileMobile.contains(event.target)) {
      userDropdownMenuMobile?.classList.add("hidden");
    }
  });

  // --- Back to Top & Contact Buttons ---
  const backToTopBtn = document.getElementById("back-to-top-btn");
  const contactBtn = document.getElementById("contact-btn");

  const handleScrollButtons = () => {
    if (window.scrollY > 200) {
      backToTopBtn?.classList.add("show");
      contactBtn?.classList.add("show");
    } else {
      backToTopBtn?.classList.remove("show");
      contactBtn?.classList.remove("show");
    }
  };

  window.addEventListener("scroll", handleScrollButtons);
  backToTopBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  contactBtn?.addEventListener(
    "click",
    () => (window.location.href = "https://ytvidhub.com/feedback.html")
  );

  checkLoginStatus();
  updateUser();
});
