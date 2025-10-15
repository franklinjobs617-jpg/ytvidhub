document.addEventListener("DOMContentLoaded", () => {
  // --- Authentication Elements ---
  const loginButton = document.getElementById("login-button");
  const mobileLoginButton = document.getElementById("login-button-mobile");
  const loginModalContainer = document.getElementById("login-modal-container");
  const modalCloseButton = document.getElementById("modal-close-button");
  const googleLoginButton = document.getElementById("google-login");

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
    userAvatarDesktop.src = user.avatar;
    userNameDesktop.textContent = user.name;
    userAvatarMobile.src = user.avatar;
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
    const userString = localStorage.getItem("loggedInUser");
    if (userString) {
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
    const mockUser = {
      name: "Alex Doe",
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
    };
    localStorage.setItem("loggedInUser", JSON.stringify(mockUser));
    updateUIForLoggedInUser(mockUser);
    closeModal();
  });

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
