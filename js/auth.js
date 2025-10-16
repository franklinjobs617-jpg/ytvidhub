document.addEventListener("DOMContentLoaded", () => {
  // --- Authentication Elements ---
  const loginButton = document.getElementById("login-button");
  const mobileLoginButton = document.getElementById("login-button-mobile");
  const loginModalContainer = document.getElementById("login-modal-container");
  const modalCloseButton = document.getElementById("modal-close-button");
  const googleLoginButton = document.getElementById("google-login");
  const BaseUrl = "https://ytvidhub.com";
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
    // Hide all login buttons
    loginButton.classList.add("hidden");
    mobileLoginButton.classList.add("hidden");

    // Show all profile sections
    userProfileDesktop.classList.remove("hidden");
    userProfileMobile.classList.remove("hidden");

    // Populate user data
    userAvatarDesktop.src = user.picture;
    userNameDesktop.textContent = user.name;
    userAvatarMobile.src = user.picture;
    userNameMobileDropdown.textContent = user.name;
  };

  const updateUIForLoggedOutUser = () => {
    // Show all login buttons
    loginButton.classList.remove("hidden");
    mobileLoginButton.classList.remove("hidden");

    // Hide all profile sections and their dropdowns
    userProfileDesktop.classList.add("hidden");
    userProfileMobile.classList.add("hidden");
    userDropdownMenu.classList.add("hidden");
    userDropdownMenuMobile.classList.add("hidden");
  };

  // --- Event Handlers ---
  const handleLoginClick = (event) => {
    event.preventDefault();
    openModal();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedInUser");
    updateUIForLoggedOutUser();
  };

  // --- Initial Check on Page Load ---
  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    const userString = localStorage.getItem("user");
    if (token&&userString) {
      try {
        const user = JSON.parse(userString);
        updateUIForLoggedInUser(user);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        localStorage.removeItem("loggedInUser");
        updateUIForLoggedOutUser();
      }
    } else {
      updateUIForLoggedOutUser();
    }
  };

  // --- Attach Event Listeners ---

  // Login buttons
  [loginButton, mobileLoginButton].forEach((btn) =>
    btn.addEventListener("click", handleLoginClick)
  );

  // Logout buttons
  [logoutButtonDesktop, logoutButtonMobile].forEach((btn) =>
    btn.addEventListener("click", handleLogout)
  );

  // Modal close functionality
  modalCloseButton.addEventListener("click", closeModal);
  loginModalContainer.addEventListener("click", (event) => {
    if (event.target === loginModalContainer) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (
      !loginModalContainer.classList.contains("hidden") &&
      event.key === "Escape"
    ) {
      closeModal();
    }
  });

  // Simulated Google Login
  googleLoginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const dateString = new Date().toDateString()
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
    const popup = window.open(
      finalAuthUrl,
      "GoogleLogin",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    window.removeEventListener("message", handleAuthMessage);
    window.addEventListener("message", handleAuthMessage);
    const checkPopupClosed = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener("message", handleAuthMessage);
      }
    }, 500);

  });

  function handleAuthMessage(event) {
    console.log(event)
    if (event.origin !== BaseUrl || !event.data || !event.data.token) return;
    loginModal.classList.add("hidden");
    window.removeEventListener("message", handleAuthMessage);
    try {
      const { user, token: jwtToken } = JSON.parse(event.data.token);
      if (!jwtToken || !user) return;
      localStorage.setItem("auth_token", jwtToken);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      updateUIForLoggedInUser(user);
      closeModal();
    } catch (error) {
      console.error("Error parsing auth response:", error);
      closeModal();
    }
  }
  // Desktop dropdown toggle
  userMenuButton.addEventListener("click", () => {
    userDropdownMenu.classList.toggle("hidden");
  });

  // Mobile dropdown toggle
  userMenuButtonMobile.addEventListener("click", () => {
    userDropdownMenuMobile.classList.toggle("hidden");
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    // Desktop
    if (!userProfileDesktop.contains(event.target)) {
      userDropdownMenu.classList.add("hidden");
    }
    // Mobile
    if (!userProfileMobile.contains(event.target)) {
      userDropdownMenuMobile.classList.add("hidden");
    }
  });

  // --- Run on Load ---
  checkLoginStatus();
});
