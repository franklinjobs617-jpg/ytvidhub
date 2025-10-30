document.addEventListener("DOMContentLoaded", () => {
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
  // --- Authentication Elements ---
  const loginButton = document.getElementById("login-button");
  const mobileLoginButton = document.getElementById("login-button-mobile");
  const loginModalContainer = document.getElementById("login-modal-container");
  const modalCloseButton = document.getElementById("modal-close-button");
  const googleLoginButton = document.getElementById("google-login");
  const purchaseButtons = document.querySelectorAll(".purchase-button");
  const creditsNumber = document.querySelector("#credits");
  const credits_mobile = document.querySelector("#credits-mobile");
  const BaseUrl = "https://api.ytvidhub.com";
  const GOOGLE_CLIENT_ID =
    "943760400801-n0e8jdoqrm375sq6gk39pj8oampe6ci9.apps.googleusercontent.com";
  const BACKEND_REDIRECT_URI = "https://api.ytvidhub.com/prod-api/g/callback";
  // --- Desktop Profile Elements ---
  const userProfileDesktop = document.getElementById("user-profile-desktop");
  const userAvatarDesktop = document.getElementById("user-avatar-desktop");
  const userNameDesktop = document.getElementById("user-name-desktop");
  const userMenuButton = document.getElementById("user-menu-button");
  const userDropdownMenu = document.getElementById("user-dropdown-menu");
  const logoutButtonDesktop = document.getElementById("logout-button-desktop");

  // --- Mobile Profile Elements ---
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

  // --- Modal Logic ---
  const openModal = () => {
    if (loginModalContainer) {
      loginModalContainer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    if (loginModalContainer) {
      loginModalContainer.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  // --- UI Update Logic ---
  const updateUIForLoggedInUser = (user) => {
    if (!user || !user.picture || !user.name) return;
    if (loginButton) loginButton.classList.add("hidden");
    if (mobileLoginButton) mobileLoginButton.classList.add("hidden");
    if (userProfileDesktop) userProfileDesktop.classList.remove("hidden");
    if (userProfileMobile) userProfileMobile.classList.remove("hidden");
    if (userAvatarDesktop) userAvatarDesktop.src = user.picture;
    if (userNameDesktop) userNameDesktop.textContent = user.name;
    if (userAvatarMobile) userAvatarMobile.src = user.picture;

    if (creditsNumber) creditsNumber.innerHTML = user.credits;
    if (credits_mobile) credits_mobile.innerHTML = user.credits;
    if (userNameMobileDropdown) userNameMobileDropdown.textContent = user.name;
  };

  const updateUIForLoggedOutUser = () => {
    if (loginButton) loginButton.classList.remove("hidden");
    if (mobileLoginButton) mobileLoginButton.classList.remove("hidden");
    if (userProfileDesktop) userProfileDesktop.classList.add("hidden");
    if (userProfileMobile) userProfileMobile.classList.add("hidden");
    if (userDropdownMenu) userDropdownMenu.classList.add("hidden");
    if (userDropdownMenuMobile) userDropdownMenuMobile.classList.add("hidden");
  };

  // --- Event Handlers ---
  const handleLoginClick = (event) => {
    event.preventDefault();
    openModal();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("auth_token");
    updateUIForLoggedOutUser();
  };

  // --- Initial Check on Page Load ---
  const checkLoginStatus = () => {
    const token = localStorage.getItem("auth_token");
    const userString = localStorage.getItem("loggedInUser");
    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        console.log(user);
        updateUIForLoggedInUser(user);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("auth_token");
        updateUIForLoggedOutUser();
      }
    } else {
      updateUIForLoggedOutUser();
    }
  };

  // --- Message Handler from Popup ---
  function handleAuthMessage(event) {
    if (event.origin !== BaseUrl) {
      console.warn(`Message from unexpected origin ignored: ${event.origin}`);
      return;
    }
    if (!event.data || typeof event.data.token !== "string") {
      console.error(
        "Invalid or missing data in message from backend:",
        event.data
      );
      closeModal();
      return;
    }
    window.removeEventListener("message", handleAuthMessage);
    try {
      const parsedData = JSON.parse(event.data.token);
      const user = parsedData.user;
      const jwtToken = parsedData.token;
      if (!jwtToken || !user) {
        console.error("Parsed data from backend is missing user or token.");
        closeModal();
        return;
      }
      localStorage.setItem("auth_token", jwtToken);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      updateUIForLoggedInUser(user);
      closeModal();
    } catch (error) {
      console.error("Error parsing auth response from backend:", error);
      closeModal();
    }
  }

  // --- Attach All Event Listeners ---

  // Login buttons
  if (loginButton) loginButton.addEventListener("click", handleLoginClick);
  if (mobileLoginButton)
    mobileLoginButton.addEventListener("click", handleLoginClick);

  // Logout buttons
  if (logoutButtonDesktop)
    logoutButtonDesktop.addEventListener("click", handleLogout);
  if (logoutButtonMobile)
    logoutButtonMobile.addEventListener("click", handleLogout);

  // Modal close functionality
  if (modalCloseButton) modalCloseButton.addEventListener("click", closeModal);
  if (loginModalContainer)
    loginModalContainer.addEventListener("click", (event) => {
      if (event.target === loginModalContainer) closeModal();
    });
  document.addEventListener("keydown", (event) => {
    if (
      loginModalContainer &&
      !loginModalContainer.classList.contains("hidden") &&
      event.key === "Escape"
    ) {
      closeModal();
    }
  });

  // Google Login button in Modal
  if (googleLoginButton)
    googleLoginButton.addEventListener("click", (event) => {
      event.preventDefault();
      const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const dateString = new Date().toDateString();
      const params = {
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: BACKEND_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        prompt: "select_account",
        state: `${dateString}_youtube`,
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
      window.removeEventListener("message", handleAuthMessage);
      window.addEventListener("message", handleAuthMessage, false);
    });

  // User profile dropdown toggles
  if (userMenuButton)
    userMenuButton.addEventListener("click", () =>
      userDropdownMenu.classList.toggle("hidden")
    );
  if (userMenuButtonMobile)
    userMenuButtonMobile.addEventListener("click", () =>
      userDropdownMenuMobile.classList.toggle("hidden")
    );

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    if (userProfileDesktop && !userProfileDesktop.contains(event.target)) {
      userDropdownMenu.classList.add("hidden");
    }
    if (userProfileMobile && !userProfileMobile.contains(event.target)) {
      userDropdownMenuMobile.classList.add("hidden");
    }
  });

  /**
   * Handles the purchase flow when a user clicks a purchase button.
   * 1. Checks if the user is logged in. If not, opens the login modal.
   * 2. If logged in, sets a loading state on the button.
   * 3. Calls the backend to create a PayPal order.
   * 4. Redirects the user to the PayPal checkout URL.
   * 5. Restores the button state if anything goes wrong.
   */
  async function handlePurchase(event) {
    event.preventDefault();

    const isLoggedIn = !!localStorage.getItem("auth_token");

    if (!isLoggedIn) {
      openModal(); // Use the existing function to open the login modal
      return; // Stop the function here
    }

    // If we reach here, the user is logged in.
    const button = event.currentTarget;
    const originalButtonText = button.innerHTML;

    try {
      // Step 2: Set loading state
      button.disabled = true;
      button.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Processing...`;

      const productId = button.dataset.productId;
      const userInfoStr = localStorage.getItem("loggedInUser");
      const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;

      if (!userInfo || !userInfo.googleUserId) {
        throw new Error("User session is invalid. Please log in again.");
      }

      // Step 3: Call backend API
      const response = await fetch(
        "https://api.ytvidhub.com/prod-api/paypal/createOrder", // Using your consistent API domain
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include Authorization header if your backend requires it
            // "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
          },
          body: JSON.stringify({
            googleUserId: userInfo.googleUserId,
            type: productId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `API Error: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data && data.data) {
        window.location.href = data.data; // Redirect the current tab to PayPal
      } else {
        throw new Error("Checkout URL not found in API response.");
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      button.disabled = false;
      button.innerHTML = originalButtonText;
    }
  }

  // Attach the handlePurchase listener to all purchase buttons
  if (purchaseButtons.length > 0) {
    purchaseButtons.forEach((button) => {
      button.addEventListener("click", handlePurchase);
    });
  }

  async function updateUser() {
    let token = localStorage.getItem("auth_token");
    try {
      const response = await fetch(
        "https://api.ytvidhub.com/prod-api/g/getUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) return;
      const data = await response.json();
      console.log(data);
      if (data.data) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.data)); // Sync local storage
        updateUIForLoggedInUser(data.data);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }

  updateUser();

  // --- Run on Load ---
  checkLoginStatus();

  // Get the button
  const backToTopButton = document.getElementById("back-to-top-btn");

  // When the user scrolls down 300px from the top of the document, show the button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // When the user clicks on the button, scroll to the top of the document smoothly
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
const backToTopBtn = document.getElementById("back-to-top-btn");
const contactBtn = document.getElementById("contact-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add("show");
    contactBtn.classList.add("show"); // 你也可以一直显示
  } else {
    backToTopBtn.classList.remove("show");
    contactBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

contactBtn.addEventListener("click", () => {
  window.location.href = "https://ytvidhub.com/feedback.html";
});
