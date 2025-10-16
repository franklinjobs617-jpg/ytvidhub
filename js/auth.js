document.addEventListener("DOMContentLoaded", () => {
  // --- Authentication Elements ---
  const loginButton = document.getElementById("login-button");
  const mobileLoginButton = document.getElementById("login-button-mobile");
  const loginModalContainer = document.getElementById("login-modal-container");
  const modalCloseButton = document.getElementById("modal-close-button");
  const googleLoginButton = document.getElementById("google-login");

  // **CRITICAL FIX:** BaseUrl MUST match the 'origin' of the message from the backend.
  // Your backend sends the message from "https://api.ytvidhub.com".
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
    if (!user || !user.picture || !user.name) return; // Safety check
    loginButton.classList.add("hidden");
    mobileLoginButton.classList.add("hidden");
    userProfileDesktop.classList.remove("hidden");
    userProfileMobile.classList.remove("hidden");
    userAvatarDesktop.src = user.picture;
    userNameDesktop.textContent = user.name;
    userAvatarMobile.src = user.picture;
    userNameMobileDropdown.textContent = user.name;
  };

  const updateUIForLoggedOutUser = () => {
    loginButton.classList.remove("hidden");
    mobileLoginButton.classList.remove("hidden");
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
    // **FIXED**: Remove BOTH user and token to log out completely.
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("auth_token");
    updateUIForLoggedOutUser();
  };

  // --- Initial Check on Page Load ---
  const checkLoginStatus = () => {
    // **FIXED**: Use the CORRECT keys to get items from localStorage.
    const token = localStorage.getItem("auth_token");
    const userString = localStorage.getItem("loggedInUser");

    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        updateUIForLoggedInUser(user);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        // Clean up corrupted data
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
    // This security check will now PASS because BaseUrl is correct.
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

    // Cleanup listener once a valid message is received
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

      // **FIXED**: Use the CORRECT keys to set items in localStorage.
      localStorage.setItem("auth_token", jwtToken);
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      updateUIForLoggedInUser(user);
      closeModal(); // Use the proper function to close the modal.
    } catch (error) {
      console.error("Error parsing auth response from backend:", error);
      closeModal();
    }
  }

  if (loginButton) loginButton.addEventListener("click", handleLoginClick);
  if (mobileLoginButton)
    mobileLoginButton.addEventListener("click", handleLoginClick);
  if (logoutButtonDesktop)
    logoutButtonDesktop.addEventListener("click", handleLogout);
  if (logoutButtonMobile)
    logoutButtonMobile.addEventListener("click", handleLogout);
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

      // Add the listener for the message from the popup/backend
      window.removeEventListener("message", handleAuthMessage); // Ensure no duplicates
      window.addEventListener("message", handleAuthMessage, false);
    });

  // Dropdown toggles
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

  // --- Run on Load ---
  checkLoginStatus();
});
